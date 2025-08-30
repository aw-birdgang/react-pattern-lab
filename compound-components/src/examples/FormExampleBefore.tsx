import React from 'react';
import { BeforeForm as Form } from '../components';

const FormExampleBefore: React.FC = () => {
  // Form 필드 데이터
  const formFields = [
    { name: 'name', label: '이름', type: 'text' as const, required: true, placeholder: '이름을 입력하세요' },
    { name: 'email', label: '이메일', type: 'email' as const, required: true, placeholder: '이메일을 입력하세요' },
    { name: 'message', label: '메시지', type: 'textarea' as const, required: false, placeholder: '메시지를 입력하세요' }
  ];

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
    alert('폼이 제출되었습니다! 콘솔을 확인하세요.');
  };

  return (
    <div className="before">
      <h3>❌ Compound Components 패턴 사용 전</h3>
      <p>필드 배열로 정의하여 유연성이 떨어집니다.</p>
      <Form 
        fields={formFields} 
        onSubmit={handleFormSubmit}
        submitText="제출하기"
      />
    </div>
  );
};

export default FormExampleBefore;
