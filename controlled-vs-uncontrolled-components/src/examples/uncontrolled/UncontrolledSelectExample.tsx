import React, { useState } from 'react';
import UncontrolledSelect from '../../patterns/uncontrolled/UncontrolledSelect';

const UncontrolledSelectExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const handleSelectionChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="example-container">
      <h2>Uncontrolled Select Example</h2>
      <div className="description">
        <h3>특징:</h3>
        <ul>
          <li>ref를 통해 DOM에서 직접 선택된 값을 가져옴</li>
          <li>onChange 이벤트 발생 시에만 값이 업데이트됨</li>
          <li>부모 컴포넌트에서 선택을 제어할 수 없음</li>
          <li>프로그래밍적으로 선택을 변경하기 어려움</li>
        </ul>
      </div>
      
      <UncontrolledSelect 
        label="Framework" 
        options={options}
        onSelectionChange={handleSelectionChange}
      />
      
      <div className="display-section">
        <h4>Selected Value:</h4>
        <p>{selectedValue || 'No selection yet'}</p>
      </div>
    </div>
  );
};

export default UncontrolledSelectExample;
