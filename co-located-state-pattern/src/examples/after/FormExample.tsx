import React from 'react';
import { Form } from '../../components/after';

const FormExample: React.FC = () => {
  return (
    <div className="example">
      <h2>Form Example (After - Co-located State)</h2>
      <p>
        이 예제에서는 폼 데이터의 상태가 컴포넌트 내부에서 관리됩니다.
        폼 제출 로직도 컴포넌트 내부에 캡슐화되어 있습니다.
      </p>
      <Form />
    </div>
  );
};

export default FormExample;
