import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Form: React.FC = () => {
  // 상태가 컴포넌트 내부에 지역화됨
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // 폼 제출 후 초기화
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="form">
      <h3>Contact Form (After - Co-located State)</h3>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleFormDataChange('name', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFormDataChange('email', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleFormDataChange('message', e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
