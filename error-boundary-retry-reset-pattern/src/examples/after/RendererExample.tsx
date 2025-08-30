import React, { useState } from 'react';
import { ErrorBoundary, BuggyRenderer } from '../../components/after';

const RendererExample: React.FC = () => {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [crashType, setCrashType] = useState<'render' | 'calculation' | 'null-access'>('render');
  const [key, setKey] = useState(0);

  const handleError = (error: Error, errorInfo: any) => {
    console.log('Error caught in RendererExample:', error, errorInfo);
  };

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="example-container">
      <h2>Renderer Example (With Error Boundary)</h2>
      <p>
        This example shows how Error Boundary handles rendering errors gracefully.
        When a rendering error occurs, the Error Boundary will display a fallback UI.
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
        <ErrorBoundary
          key={key}
          onError={handleError}
          onReset={handleReset}
          fallback={
            <div className="custom-fallback">
              <h3>Rendering Error</h3>
              <p>A rendering error occurred. You can try again or reset the component.</p>
              <button onClick={handleReset}>Reset Renderer</button>
            </div>
          }
        >
          <BuggyRenderer 
            shouldCrash={shouldCrash} 
            crashType={crashType} 
          />
        </ErrorBoundary>
      </div>

      <div className="info-box">
        <h4>✅ Benefits</h4>
        <ul>
          <li>App doesn't crash on rendering errors</li>
          <li>Isolated error handling for specific components</li>
          <li>Users can recover from rendering failures</li>
          <li>Better debugging with error details</li>
        </ul>
      </div>
    </div>
  );
};

export default RendererExample;
