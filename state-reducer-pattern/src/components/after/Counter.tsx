import React, { useState, useCallback } from 'react';

interface CounterState {
  count: number;
}

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT' | 'RESET' | 'SET';
  payload?: number;
}

interface CounterValue {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
  isAtMax: boolean;
  isAtMin: boolean;
}

interface CounterProps {
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
  onCountChange?: (count: number) => void;
  stateReducer?: (state: CounterState, action: CounterAction) => CounterState;
  children?: ((value: CounterValue) => React.ReactNode) | React.ReactNode;
}

const defaultCounterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
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

const Counter: React.FC<CounterProps> = ({ 
  initialCount = 0, 
  maxCount, 
  minCount, 
  onCountChange, 
  stateReducer = defaultCounterReducer,
  children 
}) => {
  const [state, setState] = useState<CounterState>({ count: initialCount });

  const dispatch = useCallback((action: CounterAction) => {
    const newState = stateReducer(state, action);
    
    // Apply constraints
    let finalCount = newState.count;
    if (maxCount !== undefined && finalCount > maxCount) {
      finalCount = maxCount;
    }
    if (minCount !== undefined && finalCount < minCount) {
      finalCount = minCount;
    }
    
    const constrainedState = { count: finalCount };
    setState(constrainedState);
    onCountChange?.(constrainedState.count);
  }, [state, stateReducer, maxCount, minCount, onCountChange]);

  const increment = useCallback(() => {
    dispatch({ type: 'INCREMENT' });
  }, [dispatch]);

  const decrement = useCallback(() => {
    dispatch({ type: 'DECREMENT' });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const setCount = useCallback((count: number) => {
    dispatch({ type: 'SET', payload: count });
  }, [dispatch]);

  const value: CounterValue = {
    count: state.count,
    increment,
    decrement,
    reset,
    setCount,
    isAtMax: maxCount !== undefined && state.count >= maxCount,
    isAtMin: minCount !== undefined && state.count <= minCount,
  };

  return (
    <div>
      {typeof children === 'function' ? children(value) : children}
    </div>
  );
};

export default Counter;
