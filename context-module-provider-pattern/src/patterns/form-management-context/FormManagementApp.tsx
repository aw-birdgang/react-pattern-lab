import React, { useState } from 'react';
import { FormProvider, useForm } from './FormContext';
import { FormField } from './FormField';

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

function RegistrationForm() {
  const { form, handleSubmit, resetForm } = useForm();
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  const onSubmit = (values: Record<string, string>) => {
    console.log('Form submitted:', values);
    setSubmittedData(values);
    // 실제로는 API 호출 등을 여기서 수행
    setTimeout(() => {
      alert('Registration successful!');
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
          📝 Form Management Context
        </h1>
        <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
          이 예제는 Context Module Pattern을 사용하여 복잡한 폼 상태를 관리하는 방법을 보여줍니다.
          전역 상태 관리를 통해 폼의 모든 필드와 유효성 검사를 효율적으로 처리합니다.
        </p>
        
        <div style={{
          backgroundColor: '#e7f3ff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #b3d9ff'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#0056b3' }}>Form Context Module의 특징</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>중앙화된 폼 상태:</strong> 모든 폼 필드의 상태를 한 곳에서 관리</li>
            <li><strong>실시간 유효성 검사:</strong> 입력 시 즉시 유효성 검사 수행</li>
            <li><strong>타입 안전성:</strong> TypeScript로 모든 폼 상태와 액션 타입 정의</li>
            <li><strong>재사용 가능한 필드:</strong> FormField 컴포넌트로 일관된 UI</li>
            <li><strong>복잡한 상태 로직:</strong> useReducer로 복잡한 폼 로직 관리</li>
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
      <form onSubmit={handleSubmit(onSubmit)} style={{
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
        />
        
        <FormField
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required
        />
        
        <FormField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          required
          validation={validations.email}
        />
        
        <FormField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          validation={validations.password}
        />
        
        <FormField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
          validation={(value) => validations.confirmPassword(value, form.fields.password?.value || '')}
        />
        
        <FormField
          name="bio"
          label="Bio"
          type="textarea"
          placeholder="Tell us about yourself..."
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
            onClick={resetForm}
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
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Context Module 구조</h3>
        <pre style={{
          backgroundColor: '#2d3748',
          color: '#e2e8f0',
          padding: '16px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
{`// 1. 폼 상태 타입 정의
interface FormState {
  fields: Record<string, FormField>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// 2. 액션 타입
type FormAction = 
  | { type: 'SET_FIELD_VALUE'; payload: { name: string; value: string } }
  | { type: 'BLUR_FIELD'; payload: { name: string } }
  | { type: 'RESET_FORM' };

// 3. Context 생성
const FormContext = createContext<FormContextType | undefined>(undefined);

// 4. Provider 컴포넌트
export function FormProvider({ children }) {
  const [form, dispatch] = useReducer(formReducer, initialState);
  // ... 복잡한 폼 로직
}

// 5. Custom Hook
export function useForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error('useForm must be used within FormProvider');
  return context;
}

// 6. 폼 필드 컴포넌트
function FormField({ name, label, validation }) {
  const { getFieldValue, setFieldValue, getFieldError } = useForm();
  // ... 필드 로직
}`}
        </pre>
      </div>
    </div>
  );
}

export function FormManagementApp() {
  return (
    <FormProvider>
      <RegistrationForm />
    </FormProvider>
  );
}
