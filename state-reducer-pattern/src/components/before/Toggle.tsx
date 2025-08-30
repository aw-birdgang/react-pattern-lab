import React, { useState, useCallback } from 'react';

interface ToggleState {
  on: boolean;
}

interface ToggleAction {
  type: 'TOGGLE' | 'RESET';
  payload?: boolean;
}

interface ToggleValue {
  on: boolean;
  toggle: () => void;
  reset: () => void;
  getTogglerProps: () => {
    onClick: () => void;
    'aria-pressed': boolean;
  };
}

interface ToggleProps {
  onToggle?: (on: boolean) => void;
  initialOn?: boolean;
  children?: ((value: ToggleValue) => React.ReactNode) | React.ReactNode;
}

const toggleReducer = (state: ToggleState, action: ToggleAction): ToggleState => {
  switch (action.type) {
    case 'TOGGLE':
      return { on: !state.on };
    case 'RESET':
      return { on: action.payload ?? false };
    default:
      return state;
  }
};

const Toggle: React.FC<ToggleProps> = ({ 
  onToggle, 
  initialOn = false, 
  children 
}) => {
  const [state, setState] = useState<ToggleState>({ on: initialOn });

  const dispatch = useCallback((action: ToggleAction) => {
    const newState = toggleReducer(state, action);
    setState(newState);
    onToggle?.(newState.on);
  }, [state, onToggle]);

  const toggle = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET', payload: initialOn });
  }, [dispatch, initialOn]);

  const getTogglerProps = useCallback(() => ({
    onClick: toggle,
    'aria-pressed': state.on,
  }), [toggle, state.on]);

  const value: ToggleValue = {
    on: state.on,
    toggle,
    reset,
    getTogglerProps,
  };

  return (
    <div>
      {typeof children === 'function' ? children(value) : children}
    </div>
  );
};

export default Toggle;
