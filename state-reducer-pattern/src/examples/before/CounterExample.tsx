import React from 'react';
import Counter from '../../components/before/Counter';

const CounterExample: React.FC = () => {
  const handleCountChange = (count: number) => {
    console.log('Count changed:', count);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Counter Example (Before State Reducer Pattern)</h3>
      <p>This counter has hardcoded behavior - it increments/decrements by 1.</p>
      
      <Counter 
        initialCount={0} 
        maxCount={10} 
        minCount={0} 
        onCountChange={handleCountChange}
      >
        {({ count, increment, decrement, reset, isAtMax, isAtMin }) => (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <button onClick={decrement} disabled={isAtMin}>
                -
              </button>
              <span style={{ margin: '0 15px', fontSize: '18px' }}>
                {count}
              </span>
              <button onClick={increment} disabled={isAtMax}>
                +
              </button>
            </div>
            <button onClick={reset} style={{ marginRight: '10px' }}>
              Reset
            </button>
            <p>Count: {count}</p>
            {isAtMax && <p style={{ color: 'red' }}>Maximum reached!</p>}
            {isAtMin && <p style={{ color: 'red' }}>Minimum reached!</p>}
          </div>
        )}
      </Counter>
    </div>
  );
};

export default CounterExample;
