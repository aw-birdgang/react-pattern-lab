import React from 'react';
import { FormFieldProps } from './types';

export function FormField({ 
  name, 
  label, 
  type = 'text', 
  placeholder, 
  required = false,
  validation,
  initialValue = '',
  value,
  error,
  touched,
  onChange,
  onFocus,
  onBlur
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(name, e.target.value);
  };

  const handleFocus = () => {
    onFocus(name);
  };

  const handleBlur = () => {
    onBlur(name);
  };

  const showError = touched && error;

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#333'
      }}>
        {label}
        {required && <span style={{ color: '#dc3545', marginLeft: '4px' }}>*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px',
            border: `1px solid ${showError ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px',
            fontSize: '16px',
            fontFamily: 'inherit',
            resize: 'vertical',
            minHeight: '100px',
            boxSizing: 'border-box'
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px',
            border: `1px solid ${showError ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
      )}
      
      {showError && (
        <div style={{
          color: '#dc3545',
          fontSize: '14px',
          marginTop: '4px'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
