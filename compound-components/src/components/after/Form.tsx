import React, { createContext, useContext, ReactNode, useState } from 'react';

/**
 * Compound Components 패턴을 사용한 Form 컴포넌트
 * 
 * 장점:
 * - JSX로 자유롭게 폼 구조 정의 가능
 * - 각 필드를 독립적으로 커스터마이징 가능
 * - 복잡한 폼 검증 로직을 유연하게 구현 가능
 * - Context API를 통한 상태 공유
 * - 재사용 가능한 폼 컴포넌트들
 */

// Context 정의
interface FormContextType {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (name: string, value: string) => void;
  validateField: (name: string, required?: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Context 사용을 위한 Hook
const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form');
  }
  return context;
};

// 메인 Form 컴포넌트
interface FormProps {
  onSubmit: (data: Record<string, string>) => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // 에러 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateField = (name: string, required?: boolean) => {
    if (required && !formData[name]) {
      setErrors(prev => ({ ...prev, [name]: '이 필드는 필수입니다.' }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // 모든 필드 검증
    Object.keys(formData).forEach(name => {
      if (!formData[name]) {
        newErrors[name] = '이 필드는 필수입니다.';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <FormContext.Provider value={{ formData, errors, handleChange, validateField }}>
      <form onSubmit={handleSubmit} className="form">
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Form.Field 컴포넌트
interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  placeholder?: string;
  children?: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ 
  name, 
  label, 
  type = 'text', 
  required = false,
  placeholder,
  children 
}) => {
  const { formData, errors, handleChange, validateField } = useFormContext();
  const value = formData[name] || '';
  const error = errors[name];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value);
  };

  const handleBlur = () => {
    validateField(name, required);
  };

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={error ? 'error' : ''}
        />
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

// Form.TextArea 컴포넌트
interface FormTextAreaProps {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ 
  name, 
  label, 
  required = false,
  placeholder,
  rows = 4
}) => {
  const { formData, errors, handleChange, validateField } = useFormContext();
  const value = formData[name] || '';
  const error = errors[name];

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(name, e.target.value);
  };

  const handleBlur = () => {
    validateField(name, required);
  };

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleTextAreaChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

// Form.Submit 컴포넌트
interface FormSubmitProps {
  children: ReactNode;
}

const FormSubmit: React.FC<FormSubmitProps> = ({ children }) => {
  return (
    <button type="submit" className="submit-button">
      {children}
    </button>
  );
};

// Compound Components를 하나의 객체로 내보내기
const CompoundForm = Object.assign(Form, {
  Field: FormField,
  TextArea: FormTextArea,
  Submit: FormSubmit,
});

export default CompoundForm;
