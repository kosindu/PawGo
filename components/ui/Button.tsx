import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '',
  ...props 
}) => {
  
  const baseStyles = "font-display font-bold uppercase tracking-wide transition-all active:translate-y-1 active:border-b-0 focus:outline-none flex items-center justify-center gap-2";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs border-b-[3px] rounded-xl h-10",
    md: "px-6 py-3 text-sm border-b-4 rounded-2xl h-12",
    lg: "px-8 py-4 text-lg border-b-[5px] rounded-[1.8rem] h-16",
  };

  const variants = {
    primary: "bg-pawgo-green text-white border-pawgo-greenDark hover:bg-green-500",
    secondary: "bg-pawgo-blue text-white border-pawgo-blueDark hover:bg-blue-400",
    danger: "bg-pawgo-red text-white border-pawgo-redDark hover:bg-red-500",
    ghost: "bg-transparent text-gray-500 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border-b-0 active:translate-y-0",
    outline: "bg-white dark:bg-gray-800 text-gray-500 border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};