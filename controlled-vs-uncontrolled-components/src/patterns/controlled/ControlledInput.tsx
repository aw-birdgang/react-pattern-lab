import React from 'react';

interface InputProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  value, 
  type = 'text', 
  placeholder = '', 
  onChange,
  onBlur 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className="input-container">
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <small>Value is controlled by parent component</small>
    </div>
  );
};

export default Input;
