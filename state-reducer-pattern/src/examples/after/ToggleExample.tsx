import React from 'react';
import Toggle from '../../components/after/Toggle';

// Custom reducer that prevents toggling off after 3 toggles
const limitedToggleReducer = (state: any, action: any) => {
  if (action.type === 'TOGGLE' && state.toggleCount >= 3) {
    return state; // Prevent further toggles
  }
  
  switch (action.type) {
    case 'TOGGLE':
      return { 
        on: !state.on, 
        toggleCount: (state.toggleCount || 0) + 1 
      };
    case 'RESET':
      return { 
        on: action.payload ?? false, 
        toggleCount: 0 
      };
    default:
      return state;
  }
};

// Custom reducer that adds a delay before allowing toggle
const delayedToggleReducer = (state: any, action: any) => {
  if (action.type === 'TOGGLE' && state.lastToggleTime) {
    const now = Date.now();
    if (now - state.lastToggleTime < 1000) { // 1 second delay
      return state; // Prevent rapid toggling
    }
  }
  
  switch (action.type) {
    case 'TOGGLE':
      return { 
        on: !state.on, 
        lastToggleTime: Date.now() 
      };
    case 'RESET':
      return { 
        on: action.payload ?? false, 
        lastToggleTime: null 
      };
    default:
      return state;
  }
};

// Custom reducer that only allows toggling during certain hours
const timeRestrictedToggleReducer = (state: any, action: any) => {
  if (action.type === 'TOGGLE') {
    const hour = new Date().getHours();
    if (hour < 9 || hour > 17) { // Only allow between 9 AM and 5 PM
      return state; // Prevent toggling outside business hours
    }
  }
  
  switch (action.type) {
    case 'TOGGLE':
      return { on: !state.on };
    case 'RESET':
      return { on: action.payload ?? false };
    default:
      return state;
  }
};

const ToggleExample: React.FC = () => {
  const handleToggle = (on: boolean) => {
    console.log('Toggle state changed:', on);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Toggle Examples (With State Reducer Pattern)</h2>
      
      {/* Limited Toggle */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Limited Toggle (Max 3 toggles)</h3>
        <p>This toggle can only be toggled 3 times, then it becomes locked.</p>
        
        <Toggle 
          onToggle={handleToggle} 
          initialOn={false}
          stateReducer={limitedToggleReducer}
        >
          {({ on, toggle, reset, getTogglerProps }) => (
            <div>
              <button {...getTogglerProps()}>
                {on ? 'ON' : 'OFF'}
              </button>
              <button onClick={reset} style={{ marginLeft: '10px' }}>
                Reset
              </button>
              <p>Current state: {on ? 'ON' : 'OFF'}</p>
            </div>
          )}
        </Toggle>
      </div>

      {/* Delayed Toggle */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Delayed Toggle (1 second delay)</h3>
        <p>This toggle has a 1-second cooldown between toggles.</p>
        
        <Toggle 
          onToggle={handleToggle} 
          initialOn={false}
          stateReducer={delayedToggleReducer}
        >
          {({ on, toggle, reset, getTogglerProps }) => (
            <div>
              <button {...getTogglerProps()}>
                {on ? 'ON' : 'OFF'}
              </button>
              <button onClick={reset} style={{ marginLeft: '10px' }}>
                Reset
              </button>
              <p>Current state: {on ? 'ON' : 'OFF'}</p>
            </div>
          )}
        </Toggle>
      </div>

      {/* Time Restricted Toggle */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Time Restricted Toggle (9 AM - 5 PM only)</h3>
        <p>This toggle only works during business hours (9 AM - 5 PM).</p>
        
        <Toggle 
          onToggle={handleToggle} 
          initialOn={false}
          stateReducer={timeRestrictedToggleReducer}
        >
          {({ on, toggle, reset, getTogglerProps }) => (
            <div>
              <button {...getTogglerProps()}>
                {on ? 'ON' : 'OFF'}
              </button>
              <button onClick={reset} style={{ marginLeft: '10px' }}>
                Reset
              </button>
              <p>Current state: {on ? 'ON' : 'OFF'}</p>
              <p>Current time: {new Date().toLocaleTimeString()}</p>
            </div>
          )}
        </Toggle>
      </div>
    </div>
  );
};

export default ToggleExample;
