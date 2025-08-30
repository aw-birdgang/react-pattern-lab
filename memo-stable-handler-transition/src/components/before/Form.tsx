import React, { useState } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// 최적화 전: 매번 새로운 onChange 함수가 생성됨
const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, placeholder }) => {
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
};

interface FormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  console.log('Form 렌더링됨');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, message });
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', padding: '20px' }}>
      <h3>폼 (최적화 전)</h3>
      <p>각 필드가 매번 리렌더링됩니다</p>
      
      <FormField
        label="이름"
        value={name}
        onChange={setName}
        placeholder="이름을 입력하세요"
      />
      
      <FormField
        label="이메일"
        value={email}
        onChange={setEmail}
        placeholder="이메일을 입력하세요"
      />
      
      <FormField
        label="메시지"
        value={message}
        onChange={setMessage}
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
