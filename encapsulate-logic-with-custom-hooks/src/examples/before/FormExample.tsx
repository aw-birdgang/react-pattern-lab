import React from 'react';
import FormBefore from '../../components/before/Form';

const FormExample: React.FC = () => {
  return (
    <div className="example-container">
      <h2>Form 예제 (Before)</h2>
      <p>Custom Hook을 사용하지 않은 원본 구현</p>
      
      <div className="example-section">
        <FormBefore />
      </div>

      <div className="code-section">
        <h4>Before: Custom Hook 없음</h4>
        <pre>
{`// 복잡한 폼 로직이 컴포넌트 내부에 중복
const [values, setValues] = useState(initialValues);
const [errors, setErrors] = useState({});
const [touched, setTouched] = useState({});

const validate = (valuesToValidate) => {
  const newErrors = {};
  if (!valuesToValidate.name) newErrors.name = '이름은 필수입니다';
  // ... 더 많은 유효성 검사 로직
  return newErrors;
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setValues(prev => ({ ...prev, [name]: value }));
  // ... 에러 처리 로직
};

const handleBlur = (e) => {
  const { name } = e.target;
  setTouched(prev => ({ ...prev, [name]: true }));
  // ... 유효성 검사 로직
};

// 문제점:
// ❌ 복잡한 폼 로직이 컴포넌트 내부에 중복
// ❌ 유효성 검사 로직이 컴포넌트와 결합
// ❌ 다른 폼에서 재사용하기 어려움
// ❌ 코드가 매우 길고 복잡함`}
        </pre>
      </div>
    </div>
  );
};

export default FormExample;
