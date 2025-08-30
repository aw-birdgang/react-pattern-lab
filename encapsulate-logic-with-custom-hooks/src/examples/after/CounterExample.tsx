import React from 'react';
import CounterAfter from '../../components/after/Counter';

const CounterExample: React.FC = () => {
  return (
    <div className="example-container">
      <h2>Counter 예제 (After)</h2>
      <p>Custom Hook을 사용한 개선된 구현</p>
      
      <div className="example-section">
        <CounterAfter initialValue={5} />
      </div>

      <div className="code-section">
        <h4>After: Custom Hook 사용</h4>
        <pre>
{`// Custom Hook으로 로직 캡슐화
const { count, increment, decrement, reset } = useCounter(initialValue);

// useCounter Hook 내부
export const useCounter = (initialValue: number = 0) => {
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
  
  return { count, increment, decrement, reset };
};

// 장점:
// ✅ 로직이 Custom Hook으로 캡슐화됨
// ✅ 다른 컴포넌트에서도 쉽게 재사용 가능
// ✅ 테스트하기 쉬움
// ✅ 관심사 분리로 코드 가독성 향상`}
        </pre>
      </div>
    </div>
  );
};

export default CounterExample;
