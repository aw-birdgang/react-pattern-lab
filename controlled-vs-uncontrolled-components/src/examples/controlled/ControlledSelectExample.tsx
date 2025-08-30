import React, { useState } from 'react';
import ControlledSelect from '../../patterns/controlled/ControlledSelect';

const ControlledSelectExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  const resetSelection = () => {
    setSelectedValue('');
  };

  const selectReact = () => {
    setSelectedValue('react');
  };

  return (
    <div className="example-container">
      <h2>Controlled Select Example</h2>
      <div className="description">
        <h3>특징:</h3>
        <ul>
          <li>부모 컴포넌트의 상태로 선택된 값을 관리</li>
          <li>프로그래밍적으로 선택을 변경할 수 있음</li>
          <li>실시간으로 선택 상태를 추적 가능</li>
          <li>부모 컴포넌트에서 완전히 제어 가능</li>
          <li>예측 가능한 동작</li>
        </ul>
      </div>
      
      <ControlledSelect 
        label="Framework" 
        value={selectedValue}
        options={options}
        onChange={handleChange}
      />
      
      <div className="control-buttons">
        <button onClick={resetSelection}>Reset Selection</button>
        <button onClick={selectReact}>Select React</button>
      </div>
      
      <div className="display-section">
        <h4>Selected Value:</h4>
        <p>{selectedValue || 'No selection yet'}</p>
      </div>
    </div>
  );
};

export default ControlledSelectExample;
