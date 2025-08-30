import React, { useState } from 'react';
import { ErrorBoundary, BuggyCounter } from '../../components/after';

const CounterExample: React.FC = () => {
  const [errorThreshold, setErrorThreshold] = useState(5);
  const [key, setKey] = useState(0);

  const handleError = (error: Error, errorInfo: any) => {
    console.log('Error caught in CounterExample:', error, errorInfo);
  };

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="example-container">
      <h2>Counter Example (With Error Boundary)</h2>
      <p>
        This example shows how Error Boundary catches errors and provides recovery options.
        When an error occurs, the Error Boundary will display a fallback UI instead of crashing the app.
      </p>
      
      <div className="controls">
        <label>
          Error Threshold:
          <input
            type="number"
            value={errorThreshold}
            onChange={(e) => setErrorThreshold(Number(e.target.value))}
            min="1"
            max="10"
          />
        </label>
      </div>

      <div className="component-container">
        <ErrorBoundary
          key={key}
          onError={handleError}
          onReset={handleReset}
          fallback={
            <div className="custom-fallback">
              <h3>Counter Error</h3>
              <p>The counter encountered an error. You can try again or reset the component.</p>
              <button onClick={handleReset}>Reset Counter</button>
            </div>
          }
        >
          <BuggyCounter 
            initialValue={0} 
            errorThreshold={errorThreshold} 
          />
        </ErrorBoundary>
      </div>

      <div className="info-box">
        <h4>✅ Benefits</h4>
        <ul>
          <li>App doesn't crash when errors occur</li>
          <li>Users can retry or reset the component</li>
          <li>Graceful error handling with custom fallback UI</li>
          <li>Error logging for debugging</li>
        </ul>
      </div>
    </div>
  );
};

export default CounterExample;
