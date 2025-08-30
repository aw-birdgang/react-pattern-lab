import React from 'react';
import { useForm } from '../../hooks/useForm';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Form: React.FC = () => {
  // 유효성 검사 스키마
  const validationSchema = (values: FormData) => {
    const errors: Partial<FormData> = {};
    if (!values.name) errors.name = '이름은 필수입니다';
    if (!values.email) {
      errors.email = '이메일은 필수입니다';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = '유효한 이메일을 입력해주세요';
    }
    if (!values.message) errors.message = '메시지는 필수입니다';
    return errors;
  };

  // Custom Hook으로 폼 로직 캡슐화
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm<FormData>(
    { name: '', email: '', message: '' },
    validationSchema
  );

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e);
    if (Object.keys(errors).length === 0) {
      alert('폼이 성공적으로 제출되었습니다!');
      resetForm();
    }
  };

  return (
    <div className="form">
      <h3>Form (After - Custom Hook 사용)</h3>
      <form onSubmit={onSubmit}>
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
        <p>✅ 폼 로직이 Custom Hook으로 캡슐화됨</p>
        <p>✅ 유효성 검사 로직이 분리되어 재사용 가능</p>
        <p>✅ 다른 폼에서도 쉽게 사용 가능</p>
        <p>✅ 컴포넌트 코드가 간결해짐</p>
      </div>
    </div>
  );
};

export default Form;
