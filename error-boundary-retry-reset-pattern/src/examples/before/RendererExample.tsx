import React, { useState } from 'react';
import { BuggyRenderer } from '../../components/before';

const RendererExample: React.FC = () => {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [crashType, setCrashType] = useState<'render' | 'calculation' | 'null-access'>('render');

  return (
    <div className="example-container">
      <h2>Renderer Example (No Error Boundary)</h2>
      <p>
        This example shows what happens when a rendering error occurs without an Error Boundary.
        The entire app will crash when the renderer encounters an error.
      </p>
      
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={shouldCrash}
            onChange={(e) => setShouldCrash(e.target.checked)}
          />
          Enable Crash
        </label>
        <label>
          Crash Type:
          <select
            value={crashType}
            onChange={(e) => setCrashType(e.target.value as any)}
          >
            <option value="render">Render Error</option>
            <option value="calculation">Calculation Error</option>
            <option value="null-access">Null Access Error</option>
          </select>
        </label>
      </div>

      <div className="component-container">
        <BuggyRenderer 
          shouldCrash={shouldCrash} 
          crashType={crashType} 
        />
      </div>

      <div className="warning-box">
        <h4>⚠️ Warning</h4>
        <p>
          When crash is enabled and you interact with the component, 
          the entire application will crash and show a blank screen or error page.
        </p>
      </div>
    </div>
  );
};

export default RendererExample;
