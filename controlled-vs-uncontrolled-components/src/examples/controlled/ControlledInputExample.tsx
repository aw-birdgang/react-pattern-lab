import React, { useState } from 'react';
import ControlledInput from '../../patterns/controlled/ControlledInput';

const ControlledInputExample: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleBlur = () => {
    console.log('Input lost focus, current value:', inputValue);
  };

  return (
    <div className="example-container">
      <h2>Controlled Input Example</h2>
      <div className="description">
        <h3>특징:</h3>
        <ul>
          <li>부모 컴포넌트의 상태로 값을 관리</li>
          <li>모든 키 입력마다 실시간으로 값이 업데이트됨</li>
          <li>실시간 유효성 검사 가능</li>
          <li>부모 컴포넌트에서 값을 완전히 제어 가능</li>
          <li>예측 가능한 동작</li>
        </ul>
      </div>
      
      <ControlledInput 
        label="Name" 
        value={inputValue}
        placeholder="Enter your name"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      
      <div className="display-section">
        <h4>Current Value (real-time):</h4>
        <p>{inputValue || 'No value yet'}</p>
        <p>Character count: {inputValue.length}</p>
      </div>
    </div>
  );
};

export default ControlledInputExample;
