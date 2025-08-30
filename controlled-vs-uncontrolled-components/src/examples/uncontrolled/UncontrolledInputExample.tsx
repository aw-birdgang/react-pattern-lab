import React, { useState } from 'react';
import UncontrolledInput from '../../patterns/uncontrolled/UncontrolledInput';

const UncontrolledInputExample: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('');

  const handleValueChange = (value: string) => {
    setDisplayValue(value);
  };

  return (
    <div className="example-container">
      <h2>Uncontrolled Input Example</h2>
      <div className="description">
        <h3>특징:</h3>
        <ul>
          <li>ref를 통해 DOM에서 직접 값을 가져옴</li>
          <li>onBlur나 Enter 키 입력 시에만 값이 업데이트됨</li>
          <li>실시간 상태 추적이 불가능</li>
          <li>부모 컴포넌트에서 값을 제어할 수 없음</li>
        </ul>
      </div>
      
      <UncontrolledInput 
        label="Name" 
        placeholder="Enter your name"
        onValueChange={handleValueChange}
      />
      
      <div className="display-section">
        <h4>Current Value (updated on blur/enter):</h4>
        <p>{displayValue || 'No value yet'}</p>
      </div>
    </div>
  );
};

export default UncontrolledInputExample;
