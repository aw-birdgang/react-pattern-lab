import React, { useState } from 'react';
import { BuggyCounter } from '../../components/before';

const CounterExample: React.FC = () => {
  const [errorThreshold, setErrorThreshold] = useState(5);

  return (
    <div className="example-container">
      <h2>Counter Example (No Error Boundary)</h2>
      <p>
        This example shows what happens when an error occurs without an Error Boundary.
        The entire app will crash when the counter reaches the error threshold.
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
        <BuggyCounter 
          initialValue={0} 
          errorThreshold={errorThreshold} 
        />
      </div>

      <div className="warning-box">
        <h4>⚠️ Warning</h4>
        <p>
          When you click the increment button and reach the error threshold, 
          the entire application will crash and show a blank screen or error page.
        </p>
      </div>
    </div>
  );
};

export default CounterExample;
