import React, { useRef } from 'react';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  type = 'text', 
  placeholder = '', 
  onValueChange 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (onValueChange && inputRef.current) {
      onValueChange(inputRef.current.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onValueChange && inputRef.current) {
      onValueChange(inputRef.current.value);
    }
  };

  return (
    <div className="input-container">
      <label>{label}:</label>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        defaultValue=""
      />
      <small>Press Enter or blur to trigger value change</small>
    </div>
  );
};

export default Input;
