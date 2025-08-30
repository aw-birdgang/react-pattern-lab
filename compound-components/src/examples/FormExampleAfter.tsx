import React from 'react';
import { CompoundForm } from '../components';

const FormExampleAfter: React.FC = () => {
  const handleFormSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
    alert('폼이 제출되었습니다! 콘솔을 확인하세요.');
  };

  return (
    <div className="after">
      <h3>✅ Compound Components 패턴 사용 후</h3>
      <p>JSX로 자유롭게 폼 구조를 정의할 수 있습니다.</p>
      <CompoundForm onSubmit={handleFormSubmit}>
        <CompoundForm.Field 
          name="name" 
          label="이름" 
          required 
          placeholder="이름을 입력하세요"
        />
        <CompoundForm.Field 
          name="email" 
          label="이메일" 
          type="email" 
          required 
          placeholder="이메일을 입력하세요"
        />
        <CompoundForm.TextArea 
          name="message" 
          label="메시지" 
          placeholder="메시지를 입력하세요"
          rows={4}
        />
        <CompoundForm.Submit>
          제출하기
        </CompoundForm.Submit>
      </CompoundForm>
    </div>
  );
};

export default FormExampleAfter;
