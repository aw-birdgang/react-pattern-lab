import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface TouchedFields {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

const Form: React.FC = () => {
  // 복잡한 폼 로직이 컴포넌트 내부에 중복
  const [values, setValues] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  const validate = (valuesToValidate: FormData) => {
    const newErrors: Partial<FormData> = {};
    if (!valuesToValidate.name) newErrors.name = '이름은 필수입니다';
    if (!valuesToValidate.email) {
      newErrors.email = '이메일은 필수입니다';
    } else if (!/\S+@\S+\.\S+/.test(valuesToValidate.email)) {
      newErrors.email = '유효한 이메일을 입력해주세요';
    }
    if (!valuesToValidate.message) newErrors.message = '메시지는 필수입니다';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const newValues = { ...values, [name]: e.target.value };
    const newErrors = validate(newValues);
    setErrors(prev => ({
      ...prev,
      [name]: newErrors[name as keyof FormData] || ''
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof TouchedFields] = true;
      return acc;
    }, {} as TouchedFields);
    setTouched(allTouched);

    if (Object.keys(newErrors).length === 0) {
      alert('폼이 성공적으로 제출되었습니다!');
      setValues({ name: '', email: '', message: '' });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="form">
      <h3>Form (Before - Custom Hook 없음)</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.name && errors.name ? 'error' : ''}
          />
          {touched.name && errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'error' : ''}
          />
          {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">메시지:</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.message && errors.message ? 'error' : ''}
          />
          {touched.message && errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <button type="submit">제출</button>
      </form>
      <div className="form-info">
        <p>❌ 복잡한 폼 로직이 컴포넌트 내부에 중복</p>
        <p>❌ 유효성 검사 로직이 컴포넌트와 결합</p>
        <p>❌ 다른 폼에서 재사용하기 어려움</p>
      </div>
    </div>
  );
};

export default Form;
