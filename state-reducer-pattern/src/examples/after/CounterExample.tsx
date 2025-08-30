import React from 'react';
import Counter from '../../components/after/Counter';

// Custom reducer that increments by 2 instead of 1
const doubleIncrementReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 2 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload ?? 0 };
    default:
      return state;
  }
};

// Custom reducer that prevents odd numbers
const evenOnlyReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      const nextCount = state.count + 1;
      return { count: nextCount % 2 === 0 ? nextCount : nextCount + 1 };
    case 'DECREMENT':
      const prevCount = state.count - 1;
      return { count: prevCount % 2 === 0 ? prevCount : prevCount - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      const setCount = action.payload ?? 0;
      return { count: setCount % 2 === 0 ? setCount : setCount + 1 };
    default:
      return state;
  }
};

// Custom reducer that adds logging and prevents negative numbers
const loggingReducer = (state: any, action: any) => {
  console.log(`Counter action: ${action.type}`, { currentState: state, action });
  
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      const newCount = state.count - 1;
      return { count: newCount < 0 ? 0 : newCount }; // Prevent negative
    case 'RESET':
      return { count: 0 };
    case 'SET':
      const setCount = action.payload ?? 0;
      return { count: setCount < 0 ? 0 : setCount }; // Prevent negative
    default:
      return state;
  }
};

// Custom reducer that implements a step counter with history
const stepCounterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return { 
        count: state.count + 1,
        stepCount: (state.stepCount || 0) + 1,
        history: [...(state.history || []), state.count]
      };
    case 'DECREMENT':
      return { 
        count: state.count - 1,
        stepCount: (state.stepCount || 0) + 1,
        history: [...(state.history || []), state.count]
      };
    case 'RESET':
      return { 
        count: 0,
        stepCount: 0,
        history: []
      };
    case 'SET':
      return { 
        count: action.payload ?? 0,
        stepCount: (state.stepCount || 0) + 1,
        history: [...(state.history || []), state.count]
      };
    default:
      return state;
  }
};

const CounterExample: React.FC = () => {
  const handleCountChange = (count: number) => {
    console.log('Count changed:', count);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Counter Examples (With State Reducer Pattern)</h2>
      
      {/* Double Increment Counter */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Double Increment Counter</h3>
        <p>This counter increments by 2 instead of 1.</p>
        
        <Counter 
          initialCount={0} 
          maxCount={20} 
          minCount={0} 
          onCountChange={handleCountChange}
          stateReducer={doubleIncrementReducer}
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
            </div>
          )}
        </Counter>
      </div>

      {/* Even Only Counter */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Even Only Counter</h3>
        <p>This counter only allows even numbers.</p>
        
        <Counter 
          initialCount={0} 
          maxCount={20} 
          minCount={0} 
          onCountChange={handleCountChange}
          stateReducer={evenOnlyReducer}
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
              <p>Count: {count} (Even only)</p>
            </div>
          )}
        </Counter>
      </div>

      {/* Logging Counter */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Logging Counter (No Negative)</h3>
        <p>This counter logs all actions and prevents negative numbers.</p>
        
        <Counter 
          initialCount={0} 
          maxCount={20} 
          minCount={0} 
          onCountChange={handleCountChange}
          stateReducer={loggingReducer}
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
              <p>Count: {count} (Check console for logs)</p>
            </div>
          )}
        </Counter>
      </div>

      {/* Step Counter with History */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Step Counter with History</h3>
        <p>This counter tracks the number of steps and maintains a history.</p>
        
        <Counter 
          initialCount={0} 
          maxCount={20} 
          minCount={0} 
          onCountChange={handleCountChange}
          stateReducer={stepCounterReducer}
        >
          {({ count, increment, decrement, reset, isAtMax, isAtMin }: any) => (
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
              <p>Steps taken: {count.stepCount || 0}</p>
              <p>History: [{count.history?.slice(-5).join(', ') || 'None'}]</p>
            </div>
          )}
        </Counter>
      </div>
    </div>
  );
};

export default CounterExample;
