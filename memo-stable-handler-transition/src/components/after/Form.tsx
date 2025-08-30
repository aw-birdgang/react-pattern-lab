import React, { useState, memo, useCallback } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// 최적화 후: React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
const FormField = memo<FormFieldProps>(({ label, value, onChange, placeholder }) => {
  console.log(`FormField ${label} 렌더링됨`);
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
        {label}:
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
    </div>
  );
});

FormField.displayName = 'FormField';

interface FormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  console.log('Form 렌더링됨');
  
  // useCallback으로 핸들러 안정화
  const handleNameChange = useCallback((value: string) => {
    setName(value);
  }, []);
  
  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);
  
  const handleMessageChange = useCallback((value: string) => {
    setMessage(value);
  }, []);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, message });
  }, [name, email, message, onSubmit]);
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', padding: '20px' }}>
      <h3>폼 (최적화 후)</h3>
      <p>useCallback으로 핸들러 안정화하여 불필요한 리렌더링을 방지합니다</p>
      
      <FormField
        label="이름"
        value={name}
        onChange={handleNameChange}
        placeholder="이름을 입력하세요"
      />
      
      <FormField
        label="이메일"
        value={email}
        onChange={handleEmailChange}
        placeholder="이메일을 입력하세요"
      />
      
      <FormField
        label="메시지"
        value={message}
        onChange={handleMessageChange}
        placeholder="메시지를 입력하세요"
      />
      
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        제출
      </button>
    </form>
  );
};

export default Form;
