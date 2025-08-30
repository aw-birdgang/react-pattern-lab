import React, { useState } from 'react';

const Counter: React.FC = () => {
  // 상태가 컴포넌트 내부에 지역화됨
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h3>Counter (After - Co-located State)</h3>
      <div className="counter-display">
        <span>Count: {count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
