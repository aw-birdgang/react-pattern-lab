import React from 'react';
import CounterBefore from '../../components/before/Counter';

const CounterExample: React.FC = () => {
  return (
    <div className="example-container">
      <h2>Counter 예제 (Before)</h2>
      <p>Custom Hook을 사용하지 않은 원본 구현</p>
      
      <div className="example-section">
        <CounterBefore initialValue={5} />
      </div>

      <div className="code-section">
        <h4>Before: Custom Hook 없음</h4>
        <pre>
{`// 각 컴포넌트마다 중복되는 로직
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

// 문제점:
// ❌ 로직이 컴포넌트 내부에 중복되어 있음
// ❌ 재사용이 어려움
// ❌ 테스트하기 어려움
// ❌ 코드가 복잡하고 길어짐`}
        </pre>
      </div>
    </div>
  );
};

export default CounterExample;
