import React from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormProps {
  formData: FormData;
  onFormDataChange: (field: keyof FormData, value: string) => void;
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ 
  formData, 
  onFormDataChange, 
  onSubmit 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form">
      <h3>Contact Form (Before - Centralized State)</h3>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => onFormDataChange('name', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFormDataChange('email', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => onFormDataChange('message', e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
