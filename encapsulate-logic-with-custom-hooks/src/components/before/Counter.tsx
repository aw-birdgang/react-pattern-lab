import React, { useState, useCallback } from 'react';

interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  // 각 컴포넌트마다 중복되는 로직
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return (
    <div className="counter">
      <h3>Counter (Before - Custom Hook 없음)</h3>
      <div className="counter-display">
        <span>Count: {count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
      <div className="counter-info">
        <p>❌ 로직이 컴포넌트 내부에 중복되어 있음</p>
        <p>❌ 재사용이 어려움</p>
        <p>❌ 테스트하기 어려움</p>
      </div>
    </div>
  );
};

export default Counter;
