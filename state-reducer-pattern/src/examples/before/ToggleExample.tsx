import React from 'react';
import Toggle from '../../components/before/Toggle';

const ToggleExample: React.FC = () => {
  const handleToggle = (on: boolean) => {
    console.log('Toggle state changed:', on);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Toggle Example (Before State Reducer Pattern)</h3>
      <p>This toggle has hardcoded behavior - it can only toggle on/off normally.</p>
      
      <Toggle onToggle={handleToggle} initialOn={false}>
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
  );
};

export default ToggleExample;
