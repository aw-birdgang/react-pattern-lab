import React, { useState } from 'react';
import { Counter } from '../../components/before';

const CounterExample: React.FC = () => {
  // 모든 상태가 최상위 컴포넌트에서 관리됨 (props drilling 발생)
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
    <div className="example">
      <h2>Counter Example (Before - Centralized State)</h2>
      <p>
        이 예제에서는 카운터의 상태가 부모 컴포넌트에서 관리되고, 
        props를 통해 자식 컴포넌트로 전달됩니다.
      </p>
      <Counter
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
      />
    </div>
  );
};

export default CounterExample;
