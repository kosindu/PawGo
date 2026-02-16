
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse, Modality, LiveServerMessage } from "@google/genai";
import { User, Dog, LanguageCode } from '../types';
import { Mascot } from '../components/Mascot';
import { IconChevronLeft, IconSend, IconSparkles, IconX, IconPlus, IconMic, IconMicOff, IconPlay } from '../components/Icons';
import { LANGUAGES } from '../constants';
import { t } from '../utils/translations';

interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

interface AIChatViewProps {
  user: User;
  dogs: Dog[];
  language: LanguageCode;
  onBack: () => void;
}

// Audio Utilities for Live API
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ user, dogs, language, onBack }) => {
  // Generate initial welcome message based on language
  const getWelcomeMessage = () => {
    const dogNames = dogs.map(d => d.name).join(', ');
    let welcomeText = t(language, 'ai_welcome');
    welcomeText = welcomeText.replace('{name}', user.name).replace('{dogs}', dogNames);
    return welcomeText;
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: getWelcomeMessage() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{data: string, mimeType: string} | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<{user: string, model: string}>({user: '', model: ''});
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Live Session Refs
  const liveSessionPromise = useRef<Promise<any> | null>(null);
  const audioContexts = useRef<{input: AudioContext, output: AudioContext} | null>(null);
  const liveSources = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTime = useRef(0);

  // Determine full language name for the system prompt
  const currentLangName = LANGUAGES.find(l => l.code === language)?.name || 'English';

  // Generate a detailed profile of the user's dogs for the AI's context
  const packContext = dogs.map(d => (
    `- ${d.name}: A ${d.age}-year-old ${d.breed} weighing ${d.weight}kg. Current activity streak: ${d.streak} days.`
  )).join('\n');

  const fullSystemPrompt = `
    You are PawGo, a world-class dog health, training, and activity expert. 
    You are an integrated part of the PawGo app, designed with a friendly, professional, and playful Scandinavian aesthetic.
    
    USER INFORMATION:
    - Name: ${user.name}
    - Preferred Language: ${currentLangName} (Code: ${language})
    
    THE PACK (User's Dogs):
    ${packContext}

    YOUR INSTRUCTIONS:
    1. IMPORTANT: You must strictly respond in ${currentLangName}.
    2. Always prioritize the specific needs of the dogs in the pack listed above.
    3. Refer to the dogs by their names whenever possible. 
    4. Use your knowledge of their breeds to give tailored advice (e.g., heat sensitivity for Frenchies, joint care for larger breeds like Golden Retrievers).
    5. If the user uploads an image, assume it might be one of their dogs and use the pack details to provide context.
    6. Be encouraging about their streaks and active lifestyle.
    7. Maintain a helpful, concierge-like tone. Keep responses concise but information-dense.
    8. For health queries, provide breed-specific context but always include a disclaimer to consult a veterinarian for serious issues.
    9. Use emojis sparingly but effectively to keep the tone light 🐾.
  `;

  // Initial setup effect - primarily for welcome message state consistency
  useEffect(() => {
    // Update the greeting if it's the only message (not chatting yet)
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'model') {
        return [{ role: 'model', text: getWelcomeMessage() }];
      }
      return prev;
    });
  }, [user.name, dogs, language]);

  // Cleanup effect to ensure Live Mode resources are released when component unmounts
  useEffect(() => {
    return () => {
      stopLiveMode();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setSelectedImage({ data: base64, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isTyping) return;

    const userMsgText = inputText.trim();
    const userMsgImg = selectedImage;
    
    setInputText('');
    setSelectedImage(null);
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMsgText || "Look at this image of my paw!", 
      image: userMsgImg ? `data:${userMsgImg.mimeType};base64,${userMsgImg.data}` : undefined 
    }]);
    setIsTyping(true);

    try {
      // Create new instance here to pick up potentially updated API keys
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const contents: any = { parts: [] };
      if (userMsgText) contents.parts.push({ text: userMsgText });
      if (userMsgImg) contents.parts.push({ inlineData: { data: userMsgImg.data, mimeType: userMsgImg.mimeType } });

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: fullSystemPrompt
        }
      });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of result) {
        fullText += (chunk as GenerateContentResponse).text || "";
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: fullText };
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I lost my scent! Could you try asking that again? 🐶" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startLiveMode = async () => {
    setIsLiveMode(true);
    setLiveTranscript({ user: '', model: '' });

    try {
      // Try to get 16kHz context, but handle if browser forces native rate
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Ensure context is resumed (browsers often suspend it until interaction)
      await outputCtx.resume();
      await inputCtx.resume();
      
      audioContexts.current = { input: inputCtx, output: outputCtx };
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create new instance here to pick up potentially updated API keys
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      liveSessionPromise.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const sourceRate = inputCtx.sampleRate;
              const targetRate = 16000;
              let pcmData;

              // If browser forced a different sample rate (common on mobile/some OS), 
              // downsample manually to 16kHz to prevent voice pitch distortion (deep/fast voice).
              if (sourceRate !== targetRate) {
                const ratio = sourceRate / targetRate;
                const newLength = Math.ceil(inputData.length / ratio);
                pcmData = new Int16Array(newLength);
                
                for (let i = 0; i < newLength; i++) {
                  const inputIndex = Math.floor(i * ratio);
                  // Clamp and convert
                  let s = Math.max(-1, Math.min(1, inputData[inputIndex]));
                  s = s < 0 ? s * 0x8000 : s * 0x7FFF;
                  pcmData[i] = s;
                }
              } else {
                // Native 16kHz - direct conversion
                pcmData = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                  let s = Math.max(-1, Math.min(1, inputData[i]));
                  s = s < 0 ? s * 0x8000 : s * 0x7FFF;
                  pcmData[i] = s;
                }
              }
              
              const pcmBlob = { data: encode(new Uint8Array(pcmData.buffer)), mimeType: 'audio/pcm;rate=16000' };
              liveSessionPromise.current?.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.outputTranscription) {
              setLiveTranscript(prev => ({ ...prev, model: prev.model + msg.serverContent!.outputTranscription!.text }));
            } else if (msg.serverContent?.inputTranscription) {
              setLiveTranscript(prev => ({ ...prev, user: prev.user + msg.serverContent!.inputTranscription!.text }));
            }

            if (msg.serverContent?.turnComplete) {
              setLiveTranscript({ user: '', model: '' });
            }

            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContexts.current) {
              const { output } = audioContexts.current;
              nextStartTime.current = Math.max(nextStartTime.current, output.currentTime);
              // Gemini audio output is 24kHz
              const audioBuffer = await decodeAudioData(decode(base64Audio), output, 24000, 1);
              const source = output.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(output.destination);
              source.addEventListener('ended', () => liveSources.current.delete(source));
              source.start(nextStartTime.current);
              nextStartTime.current += audioBuffer.duration;
              liveSources.current.add(source);
            }

            if (msg.serverContent?.interrupted) {
              liveSources.current.forEach(s => s.stop());
              liveSources.current.clear();
              nextStartTime.current = 0;
            }
          },
          onerror: (e) => console.error("Live Error", e),
          onclose: () => stopLiveMode(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: fullSystemPrompt,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        }
      });
    } catch (err) {
      console.error("Live failed", err);
      stopLiveMode(); // Ensure cleanup on failure
    }
  };

  const stopLiveMode = () => {
    // Only attempt to close if it exists
    if (liveSessionPromise.current) {
      liveSessionPromise.current.then(session => session.close()).catch(() => {});
      liveSessionPromise.current = null;
    }
    
    if (audioContexts.current) {
      audioContexts.current.input.close();
      audioContexts.current.output.close();
      audioContexts.current = null;
    }
    
    liveSources.current.forEach(s => s.stop());
    liveSources.current.clear();
    setIsLiveMode(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950 animate-pop">
      <header className="p-6 pt-safe-top mt-4 flex items-center gap-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b-2 border-gray-100 dark:border-gray-800 flex-shrink-0 z-10 shadow-sm rounded-b-[2rem]">
        <button onClick={onBack} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full active:scale-90 transition-transform">
          <IconChevronLeft size={22} className="text-black dark:text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md overflow-hidden p-1 border-b-2 border-orange-700">
             <Mascot mood="happy" />
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-xl text-black dark:text-white leading-none">PawGo AI</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-pawgo-green mt-1">Pack Specialist</p>
          </div>
        </div>
        <button 
          onClick={startLiveMode}
          className="ml-auto p-3.5 bg-pawgo-blue text-white rounded-full shadow-lg shadow-pawgo-blue/20 active:scale-90 transition-all border-b-4 border-pawgo-blueDark hover:translate-y-[-2px]"
        >
          <IconMic size={24} />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-pop`}>
            <div className={`
              max-w-[85%] p-5 rounded-[2rem] text-sm font-bold leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-pawgo-blue text-white rounded-tr-none border-b-4 border-pawgo-blueDark' 
                : 'bg-white dark:bg-gray-800 text-black dark:text-gray-200 rounded-tl-none border-b-4 border-gray-100 dark:border-gray-700'}
            `}>
              {msg.image && (
                <img src={msg.image} className="w-full h-auto rounded-2xl mb-3 border-2 border-white/20" alt="Uploaded paw" />
              )}
              {msg.text || (msg.role === 'model' && isTyping && <div className="flex gap-1 py-1"><div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div><div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div></div>)}
            </div>
          </div>
        ))}
      </div>

      <footer className="p-6 pb-safe-bottom bg-white dark:bg-gray-900 border-t-2 border-gray-100 dark:border-gray-800 flex-shrink-0 rounded-t-[2.5rem] shadow-[0_-5px_30px_rgba(0,0,0,0.03)]">
        {selectedImage && (
          <div className="relative w-24 h-24 mb-4 animate-pop group mx-auto">
            <img src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} className="w-full h-full object-cover rounded-2xl border-4 border-pawgo-blue" alt="Preview" />
            <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md">
              <IconX size={16} />
            </button>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex gap-3 items-center mb-2">
          <input 
            type="file" accept="image/*" className="hidden" ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-400 w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <IconPlus size={24} />
          </button>
          {/* Using text-base prevents iOS zooming on input focus */}
          <input 
            type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
            placeholder={t(language, 'askPlaceholder').replace('{name}', dogs[0]?.name || 'your pack')}
            className="flex-1 bg-gray-100/50 dark:bg-gray-800/50 border-2 border-gray-100 dark:border-gray-700 rounded-[2rem] px-6 py-3.5 font-bold text-base text-black dark:text-white focus:outline-none focus:border-pawgo-blue/50 focus:bg-white dark:focus:bg-gray-800 transition-all placeholder-gray-400"
          />
          <button 
            type="submit" disabled={(!inputText.trim() && !selectedImage) || isTyping}
            className="bg-pawgo-green text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-90 disabled:opacity-50 transition-all border-b-4 border-pawgo-greenDark hover:translate-y-[-2px]"
          >
            <IconSend size={24} />
          </button>
        </form>
      </footer>

      {/* Gemini Live Mode UI */}
      {isLiveMode && (
        <div className="fixed inset-0 bg-pawgo-blueDark z-[150] flex flex-col items-center justify-between p-10 pt-safe-top pb-safe-bottom text-white animate-pop">
           <div className="w-full flex justify-end">
              <button onClick={stopLiveMode} className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                 <IconX size={32} />
              </button>
           </div>

           <div className="flex flex-col items-center gap-12">
              <div className="relative">
                 <div className="absolute inset-0 bg-white/10 rounded-full animate-ping scale-150 opacity-20" style={{ animationDuration: '3s' }}></div>
                 <div className="absolute inset-0 bg-white/20 rounded-full animate-ping scale-125 opacity-40" style={{ animationDuration: '2s' }}></div>
                 <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl border-4 border-white/20 shadow-2xl relative z-10 overflow-hidden p-6">
                    <Mascot mood="happy" />
                 </div>
              </div>
              <div className="text-center space-y-4">
                 <h2 className="text-4xl font-display font-bold">{t(language, 'voiceAssist')}</h2>
                 <p className="text-lg font-black uppercase tracking-widest opacity-70">{t(language, 'listening')}</p>
              </div>
           </div>

           <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-[2.5rem] p-8 border border-white/20 min-h-[160px] flex flex-col justify-center">
              {liveTranscript.user ? (
                <p className="text-sm font-bold italic text-white/60 mb-2">You: {liveTranscript.user}</p>
              ) : null}
              {liveTranscript.model ? (
                <p className="text-xl font-display font-bold animate-pop">PawGo: {liveTranscript.model}</p>
              ) : (
                <div className="flex gap-2">
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
           </div>

           <div className="pb-10">
              <button 
                onClick={stopLiveMode}
                className="bg-white text-pawgo-blueDark w-24 h-24 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all border-b-8 border-gray-200 hover:scale-105"
              >
                 <IconMicOff size={40} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
};
