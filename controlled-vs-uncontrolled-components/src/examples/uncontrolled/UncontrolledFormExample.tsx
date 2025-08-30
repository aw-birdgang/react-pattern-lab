import React from 'react';
import UncontrolledForm from '../../patterns/uncontrolled/UncontrolledForm';

const UncontrolledFormExample: React.FC = () => {
  return (
    <div className="example-container">
      <h2>Uncontrolled Form Example</h2>
      <div className="description">
        <h3>특징:</h3>
        <ul>
          <li>useRef를 사용하여 DOM 요소에 직접 접근</li>
          <li>폼 데이터가 React 상태로 관리되지 않음</li>
          <li>제출 시에만 값을 가져옴</li>
          <li>실시간 유효성 검사나 상태 추적이 어려움</li>
        </ul>
      </div>
      <UncontrolledForm />
    </div>
  );
};

export default UncontrolledFormExample;
