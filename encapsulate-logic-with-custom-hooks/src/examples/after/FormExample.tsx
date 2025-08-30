import React from 'react';
import FormAfter from '../../components/after/Form';

const FormExample: React.FC = () => {
  return (
    <div className="example-container">
      <h2>Form 예제 (After)</h2>
      <p>Custom Hook을 사용한 개선된 구현</p>
      
      <div className="example-section">
        <FormAfter />
      </div>

      <div className="code-section">
        <h4>After: Custom Hook 사용</h4>
        <pre>
{`// Custom Hook으로 폼 로직 캡슐화
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  resetForm
} = useForm(initialValues, validationSchema);

// useForm Hook 내부
export const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = useCallback((e) => {
    // ... 변경 처리 로직
  }, []);
  
  const handleBlur = useCallback((e) => {
    // ... 블러 처리 로직
  }, []);
  
  return { values, errors, touched, handleChange, handleBlur };
};

// 장점:
// ✅ 폼 로직이 Custom Hook으로 캡슐화됨
// ✅ 유효성 검사 로직이 분리되어 재사용 가능
// ✅ 다른 폼에서도 쉽게 사용 가능
// ✅ 컴포넌트 코드가 간결해짐`}
        </pre>
      </div>
    </div>
  );
};

export default FormExample;
