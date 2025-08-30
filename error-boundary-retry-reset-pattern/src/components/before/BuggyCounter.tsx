import React, { useState } from 'react';

interface BuggyCounterProps {
  initialValue?: number;
  errorThreshold?: number;
}

const BuggyCounter: React.FC<BuggyCounterProps> = ({ 
  initialValue = 0, 
  errorThreshold = 5 
}) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newCount = count + 1;
    
    // 특정 값에 도달하면 에러 발생 (Error Boundary 없이)
    if (newCount === errorThreshold) {
      setCount(newCount); // 상태를 먼저 업데이트
      return;
    }
    
    setCount(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    
    // 음수가 되면 에러 발생 (Error Boundary 없이)
    if (newCount < 0) {
      throw new Error('Counter cannot be negative!');
    }
    
    setCount(newCount);
  };

  const reset = () => {
    setCount(initialValue);
  };

  const triggerError = () => {
    // 즉시 에러를 발생시키는 함수
    setCount(10); // 에러 임계값으로 설정하여 렌더링 에러 발생
  };

  // 특정 값에 도달하면 렌더링 중 에러 발생
  if (count === errorThreshold) {
    throw new Error(`Counter reached error threshold: ${errorThreshold}`);
  }

  return (
    <div className="buggy-counter">
      <h3>Buggy Counter (No Error Boundary)</h3>
      <p>Count: {count}</p>
      <p className="warning">
        ⚠️ This counter will crash the app when it reaches {errorThreshold} or goes below 0
      </p>
      <div className="counter-actions">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
        <button onClick={triggerError} className="error-button">Trigger Error</button>
      </div>
    </div>
  );
};

export default BuggyCounter;
