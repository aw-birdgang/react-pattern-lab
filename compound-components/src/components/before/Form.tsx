import React, { useState } from 'react';

/**
 * 일반적인 Form 컴포넌트 (Compound Components 패턴 적용 전)
 * 
 * 문제점:
 * - 필드 배열로 정의하여 유연성이 떨어짐
 * - 복잡한 폼 구조를 표현하기 어려움
 * - 각 필드의 커스터마이징이 제한적
 * - 폼 검증 로직이 컴포넌트 내부에 하드코딩됨
 */
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea';
  required?: boolean;
  placeholder?: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitText?: string;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitText = '제출' }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label}은(는) 필수입니다.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, placeholder } = field;
    const value = formData[name] || '';
    const error = errors[name];

    if (type === 'textarea') {
      return (
        <div key={name} className="form-field">
          <label htmlFor={name}>{label}</label>
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            placeholder={placeholder}
            className={error ? 'error' : ''}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
      );
    }

    return (
      <div key={name} className="form-field">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          placeholder={placeholder}
          className={error ? 'error' : ''}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {fields.map(renderField)}
      <button type="submit" className="submit-button">
        {submitText}
      </button>
    </form>
  );
};

export default Form;
