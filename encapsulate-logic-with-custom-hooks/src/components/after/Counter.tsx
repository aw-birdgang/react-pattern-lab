import React from 'react';
import { useCounter } from '../../hooks/useCounter';

interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  // Custom Hook으로 로직 캡슐화
  const { count, increment, decrement, reset } = useCounter(initialValue);

  return (
    <div className="counter">
      <h3>Counter (After - Custom Hook 사용)</h3>
      <div className="counter-display">
        <span>Count: {count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
      <div className="counter-info">
        <p>✅ 로직이 Custom Hook으로 캡슐화됨</p>
        <p>✅ 다른 컴포넌트에서도 쉽게 재사용 가능</p>
        <p>✅ 테스트하기 쉬움</p>
        <p>✅ 관심사 분리로 코드 가독성 향상</p>
      </div>
    </div>
  );
};

export default Counter;
