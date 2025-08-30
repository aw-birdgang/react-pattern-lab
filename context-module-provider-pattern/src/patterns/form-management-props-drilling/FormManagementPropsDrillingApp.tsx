import React, { useState, useCallback } from 'react';
import { FormField } from './FormField';
import { FormState, FormField as FormFieldType } from './types';

// 유효성 검사 함수들
const validations = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return undefined;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return undefined;
  },
  
  password: (value: string) => {
    if (!value) return undefined;
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
    return undefined;
  },
  
  confirmPassword: (value: string, password: string) => {
    if (!value) return undefined;
    if (value !== password) return 'Passwords do not match';
    return undefined;
  }
};

export function FormManagementPropsDrillingApp() {
  const [form, setForm] = useState<FormState>({
    fields: {
      firstName: { name: 'firstName', value: '', touched: false, required: true },
      lastName: { name: 'lastName', value: '', touched: false, required: true },
      email: { name: 'email', value: '', touched: false, required: true, validation: validations.email },
      password: { name: 'password', value: '', touched: false, required: true, validation: validations.password },
      confirmPassword: { name: 'confirmPassword', value: '', touched: false, required: true },
      bio: { name: 'bio', value: '', touched: false }
    },
    isValid: true,
    isDirty: false,
    isSubmitting: false,
    submitCount: 0,
  });

  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  const updateField = useCallback((name: string, updates: Partial<FormFieldType>) => {
    setForm(prevForm => {
      const updatedFields = {
        ...prevForm.fields,
        [name]: { ...prevForm.fields[name], ...updates }
      };

      // 전체 폼 유효성 검사
      const isValid = Object.values(updatedFields).every(field => !field.error);
      const isDirty = Object.values(updatedFields).some(field => field.value !== '');

      return {
        ...prevForm,
        fields: updatedFields,
        isValid,
        isDirty,
      };
    });
  }, []);

  const onFieldChange = useCallback((name: string, value: string) => {
    const field = form.fields[name];
    const error = field.validation ? field.validation(value) : undefined;
    
    updateField(name, { value, error });
  }, [form.fields, updateField]);

  const onFieldFocus = useCallback((name: string) => {
    updateField(name, { touched: true });
  }, [updateField]);

  const onFieldBlur = useCallback((name: string) => {
    const field = form.fields[name];
    const error = field.validation ? field.validation(field.value) : undefined;
    
    updateField(name, { touched: true, error });
  }, [form.fields, updateField]);

  const validateForm = useCallback((): boolean => {
    const errors: string[] = [];
    
    Object.values(form.fields).forEach(field => {
      if (field.required && !field.value.trim()) {
        errors.push(`${field.name} is required`);
      } else if (field.validation) {
        const error = field.validation(field.value);
        if (error) {
          errors.push(error);
        }
      }
    });

    // confirmPassword 특별 검사
    if (form.fields.confirmPassword.value && form.fields.password.value) {
      const confirmError = validations.confirmPassword(
        form.fields.confirmPassword.value, 
        form.fields.password.value
      );
      if (confirmError) {
        updateField('confirmPassword', { error: confirmError });
        errors.push(confirmError);
      }
    }
    
    return errors.length === 0;
  }, [form.fields, updateField]);

  const onSubmit = useCallback((values: Record<string, string>) => {
    console.log('Form submitted:', values);
    setSubmittedData(values);
    // 실제로는 API 호출 등을 여기서 수행
    setTimeout(() => {
      alert('Registration successful!');
    }, 1000);
  }, []);

  const onReset = useCallback(() => {
    setForm(prevForm => ({
      ...prevForm,
      fields: Object.keys(prevForm.fields).reduce((acc, name) => {
        const field = prevForm.fields[name];
        acc[name] = {
          ...field,
          value: '',
          error: undefined,
          touched: false,
        };
        return acc;
      }, {} as Record<string, FormFieldType>),
      isValid: true,
      isDirty: false,
      isSubmitting: false,
    }));
    setSubmittedData(null);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // 모든 필드를 touched로 설정
    Object.keys(form.fields).forEach(name => {
      onFieldFocus(name);
    });
    
    if (validateForm()) {
      setForm(prev => ({ ...prev, isSubmitting: true, submitCount: prev.submitCount + 1 }));
      
      const values = Object.keys(form.fields).reduce((acc, name) => {
        acc[name] = form.fields[name].value;
        return acc;
      }, {} as Record<string, string>);
      
      onSubmit(values);
      setForm(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [form.fields, validateForm, onFieldFocus, onSubmit]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
          📝 Form Management (Props Drilling)
        </h1>
        <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
          이 예제는 Props Drilling 방식을 사용하여 폼 상태를 관리하는 방법을 보여줍니다.
          모든 상태와 함수들을 props로 전달해야 하는 번거로움을 보여줍니다.
        </p>
        
        <div style={{
          backgroundColor: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#856404' }}>Props Drilling의 문제점</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>복잡한 Props 전달:</strong> 폼 상태와 함수들을 모든 필드에 전달</li>
            <li><strong>컴포넌트 간 강한 결합:</strong> 부모 컴포넌트가 모든 폼 로직을 관리</li>
            <li><strong>재사용성 저하:</strong> 다른 폼에서 사용하려면 동일한 props 구조 필요</li>
            <li><strong>유지보수 어려움:</strong> 폼 로직 변경 시 여러 컴포넌트 수정 필요</li>
            <li><strong>코드 복잡성:</strong> props가 많아질수록 컴포넌트 인터페이스 복잡</li>
          </ul>
        </div>
      </div>

      {/* Form Status */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#333' }}>Form Status</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <div>
            <strong>Valid:</strong> {form.isValid ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <strong>Dirty:</strong> {form.isDirty ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <strong>Submitting:</strong> {form.isSubmitting ? '⏳ Yes' : '❌ No'}
          </div>
          <div>
            <strong>Submit Count:</strong> {form.submitCount}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
          User Registration
        </h2>
        
        <FormField
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          required
          value={form.fields.firstName.value}
          error={form.fields.firstName.error}
          touched={form.fields.firstName.touched}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        />
        
        <FormField
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required
          value={form.fields.lastName.value}
          error={form.fields.lastName.error}
          touched={form.fields.lastName.touched}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        />
        
        <FormField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          required
          validation={validations.email}
          value={form.fields.email.value}
          error={form.fields.email.error}
          touched={form.fields.email.touched}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        />
        
        <FormField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          validation={validations.password}
          value={form.fields.password.value}
          error={form.fields.password.error}
          touched={form.fields.password.touched}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        />
        
        <FormField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
          validation={(value) => validations.confirmPassword(value, form.fields.password.value)}
          value={form.fields.confirmPassword.value}
          error={form.fields.confirmPassword.error}
          touched={form.fields.confirmPassword.touched}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        />
        
        <FormField
          name="bio"
          label="Bio"
          type="textarea"
          placeholder="Tell us about yourself..."
          value={form.fields.bio.value}
          error={form.fields.bio.error}
          touched={form.fields.bio.touched}
          onChange={onFieldChange}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        />
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            type="submit"
            disabled={!form.isValid || form.isSubmitting}
            style={{
              flex: 1,
              padding: '12px 24px',
              backgroundColor: form.isValid && !form.isSubmitting ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: form.isValid && !form.isSubmitting ? 'pointer' : 'not-allowed',
              opacity: form.isValid && !form.isSubmitting ? 1 : 0.6
            }}
          >
            {form.isSubmitting ? 'Submitting...' : 'Register'}
          </button>
          
          <button
            type="button"
            onClick={onReset}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Submitted Data Display */}
      {submittedData && (
        <div style={{
          backgroundColor: '#d4edda',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '24px',
          border: '1px solid #c3e6cb'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#155724' }}>Submitted Data</h3>
          <pre style={{
            backgroundColor: '#f8f9fa',
            padding: '16px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '14px',
            lineHeight: '1.4'
          }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}

      {/* Code Example */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '24px',
        borderRadius: '8px',
        marginTop: '40px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Props Drilling 구조</h3>
        <pre style={{
          backgroundColor: '#2d3748',
          color: '#e2e8f0',
          padding: '16px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
{`// 부모 컴포넌트에서 모든 폼 상태 관리
const [form, setForm] = useState<FormState>({...});

// 복잡한 폼 로직을 부모에서 관리
const onFieldChange = (name: string, value: string) => {
  const field = form.fields[name];
  const error = field.validation ? field.validation(value) : undefined;
  updateField(name, { value, error });
};

// 자식 컴포넌트에 모든 상태와 함수들을 props로 전달
<FormField
  name="email"
  label="Email Address"
  type="email"
  required
  validation={validations.email}
  value={form.fields.email.value}
  error={form.fields.email.error}
  touched={form.fields.email.touched}
  onChange={onFieldChange}
  onFocus={onFieldFocus}
  onBlur={onFieldBlur}
/>`}
        </pre>
      </div>
    </div>
  );
}
