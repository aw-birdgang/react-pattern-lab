import React from 'react';
import { Counter } from '../../components/after';

const CounterExample: React.FC = () => {
  return (
    <div className="example">
      <h2>Counter Example (After - Co-located State)</h2>
      <p>
        이 예제에서는 카운터의 상태가 컴포넌트 내부에서 관리됩니다.
        props drilling이 없고, 컴포넌트가 자체적으로 상태를 관리합니다.
      </p>
      <Counter />
    </div>
  );
};

export default CounterExample;
