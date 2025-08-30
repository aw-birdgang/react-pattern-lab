import React, { useEffect } from 'react';
import { useForm } from './FormContext';

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
  initialValue?: string;
}

export function FormField({ 
  name, 
  label, 
  type = 'text', 
  placeholder, 
  required = false,
  validation,
  initialValue = ''
}: FormFieldProps) {
  const { 
    getFieldValue, 
    getFieldError, 
    getFieldTouched, 
    setFieldValue, 
    touchField, 
    blurField,
    initializeField 
  } = useForm();

  useEffect(() => {
    initializeField(name, { initialValue, required, validation });
  }, [name, initialValue, required, validation, initializeField]);

  const value = getFieldValue(name);
  const error = getFieldError(name);
  const touched = getFieldTouched(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFieldValue(name, e.target.value);
  };

  const handleFocus = () => {
    touchField(name);
  };

  const handleBlur = () => {
    blurField(name);
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
