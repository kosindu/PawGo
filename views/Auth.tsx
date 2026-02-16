
import React, { useState } from 'react';
import { db } from '../utils/db';
import { User } from '../types';
import { Button } from '../components/ui/Button';
import { Mascot } from '../components/Mascot';
import { IconGoogle, IconCheck } from '../components/Icons';
import { WalkBackgroundSVG } from '../components/WalkBackgroundSVG';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const AuthView: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  // New state for verification screen
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        if (!name || !email || !password) {
          setError('Please fill in all fields');
          setIsLoading(false);
          return;
        }
        const result = await db.register(name, email, password);
        if (result.error) {
          setError(result.error);
        } else if (result.requiresVerification) {
          setPendingVerificationEmail(email);
        } else if (result.user) {
          onLogin(result.user);
        }
      } else {
        if (!email || !password) {
          setError('Please enter email and password');
          setIsLoading(false);
          return;
        }
        const result = await db.login(email, password);
        if (result.requiresVerification) {
          setPendingVerificationEmail(email);
        } else if (result.error) {
          setError(result.error);
        } else if (result.user) {
          onLogin(result.user);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!pendingVerificationEmail || !password) return;
    setResendStatus('Sending...');
    const result = await db.resendVerification(pendingVerificationEmail, password);
    if (result.success) {
      setResendStatus('Email resent! Check your inbox.');
    } else {
      setResendStatus(result.error || 'Failed to resend.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      const result = await db.loginWithGoogle();
      if (result.user) {
        onLogin(result.user);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="h-full relative w-full overflow-hidden bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
         {/* Gradient base */}
         <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
         
         {/* Subtle pattern overlay using the SVG */}
         <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none scale-150 origin-top">
            <WalkBackgroundSVG className="w-full h-full object-cover" />
         </div>

         {/* Floating Blobs */}
         <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pawgo-green/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-pawgo-blue/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-6 animate-pop">
        
        {/* Glass Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/40 dark:border-gray-700/40">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-sky-200 dark:bg-sky-900 rounded-full shadow-lg flex items-center justify-center p-3 border-4 border-white/50 dark:border-gray-600 overflow-hidden relative">
               <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
               <Mascot mood="happy" variant="icon" />
            </div>
            <h1 className="text-3xl font-display font-bold text-black dark:text-white mb-1">PawGo</h1>
            <p className="text-gray-500 dark:text-gray-400 font-black uppercase text-[10px] tracking-widest opacity-70">
              {pendingVerificationEmail 
                ? 'Check your inbox' 
                : isRegistering ? 'Join the Family' : 'Welcome Back!'}
            </p>
          </div>

          {pendingVerificationEmail ? (
            <div className="text-center animate-pop">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 mb-6">
                <p className="text-gray-700 dark:text-gray-300 font-bold text-sm leading-relaxed">
                  We have sent you a verification email to <span className="text-pawgo-blue">{pendingVerificationEmail}</span>. Please verify it and log in.
                </p>
                {resendStatus && (
                  <p className="mt-2 text-xs font-bold text-pawgo-green">{resendStatus}</p>
                )}
                {password && !resendStatus && (
                  <button 
                    onClick={handleResendVerification}
                    className="mt-3 text-xs font-bold text-pawgo-blue hover:underline uppercase tracking-wide"
                  >
                    Resend Verification Email
                  </button>
                )}
              </div>
              <Button 
                onClick={() => {
                  setPendingVerificationEmail(null);
                  setIsRegistering(false); // Switch to login view
                  setError('');
                  setResendStatus('');
                }} 
                fullWidth 
                size="lg" 
                className="rounded-2xl h-14 font-black"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {isRegistering && (
                  <div className="space-y-1">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="What should we call you?"
                      className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 font-bold text-black dark:text-white focus:outline-none focus:border-pawgo-green focus:ring-2 focus:ring-pawgo-green/20 transition-all placeholder-gray-400 text-sm"
                    />
                  </div>
                )}
                
                <div className="space-y-1">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 font-bold text-black dark:text-white focus:outline-none focus:border-pawgo-green focus:ring-2 focus:ring-pawgo-green/20 transition-all placeholder-gray-400 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 font-bold text-black dark:text-white focus:outline-none focus:border-pawgo-green focus:ring-2 focus:ring-pawgo-green/20 transition-all placeholder-gray-400 text-sm"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 p-3 rounded-xl text-xs font-bold text-center border border-red-100 dark:border-red-900/50 flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                      {error}
                    </div>
                    {error.includes("already in use") && (
                       <button onClick={() => { setIsRegistering(false); setError(''); }} className="text-pawgo-blue hover:underline uppercase tracking-wide text-[10px]">Switch to Log In</button>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  fullWidth 
                  disabled={isLoading || isGoogleLoading}
                  className="rounded-2xl h-14 font-black text-base mt-2 shadow-lg shadow-pawgo-green/20"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    isRegistering ? 'Sign Up' : 'Log In'
                  )}
                </Button>
              </form>

              <div className="flex items-center gap-4 my-6">
                 <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                 <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">OR</span>
                 <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 rounded-2xl p-3.5 flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                 {isGoogleLoading ? (
                   <span className="animate-pulse text-sm font-bold text-gray-500">Connecting...</span>
                 ) : (
                   <>
                     <IconGoogle size={20} />
                     <span className="font-bold text-sm text-gray-700 dark:text-white">Continue with Google</span>
                   </>
                 )}
              </button>

              <div className="text-center mt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                  }}
                  className="text-gray-500 dark:text-gray-400 hover:text-pawgo-blue text-xs font-black uppercase tracking-widest transition-colors p-2"
                >
                  {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
