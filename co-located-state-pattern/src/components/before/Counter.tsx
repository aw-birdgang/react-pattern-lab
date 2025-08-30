import React from 'react';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

const Counter: React.FC<CounterProps> = ({ 
  count, 
  onIncrement, 
  onDecrement, 
  onReset 
}) => {
  return (
    <div className="counter">
      <h3>Counter (Before - Centralized State)</h3>
      <div className="counter-display">
        <span>Count: {count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
