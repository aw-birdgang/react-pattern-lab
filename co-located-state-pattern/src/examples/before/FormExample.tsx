import React, { useState } from 'react';
import { Form } from '../../components/before';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const FormExample: React.FC = () => {
  // 모든 상태가 최상위 컴포넌트에서 관리됨 (props drilling 발생)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleFormDataChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // 폼 제출 후 초기화
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="example">
      <h2>Form Example (Before - Centralized State)</h2>
      <p>
        이 예제에서는 폼 데이터의 상태가 부모 컴포넌트에서 관리되고, 
        상태 변경 함수들이 props를 통해 전달됩니다.
      </p>
      <Form
        formData={formData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormExample;
