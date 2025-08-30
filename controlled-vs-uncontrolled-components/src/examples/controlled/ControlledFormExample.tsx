import React from 'react';
import ControlledForm from '../../patterns/controlled/ControlledForm';

const ControlledFormExample: React.FC = () => {
  return (
    <div className="example-container">
      <h2>Controlled Form Example</h2>
      <div className="description">
        <h3>특징:</h3>
        <ul>
          <li>useState를 사용하여 폼 데이터를 상태로 관리</li>
          <li>모든 입력 변경사항이 실시간으로 추적됨</li>
          <li>실시간 유효성 검사 가능</li>
          <li>상태 변화를 실시간으로 확인 가능</li>
          <li>더 예측 가능하고 디버깅하기 쉬운 코드</li>
        </ul>
      </div>
      <ControlledForm />
    </div>
  );
};

export default ControlledFormExample;
