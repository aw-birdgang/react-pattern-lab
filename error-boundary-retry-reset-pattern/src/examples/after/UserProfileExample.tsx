import React, { useState } from 'react';
import { ErrorBoundary, BuggyUserProfile } from '../../components/after';

const UserProfileExample: React.FC = () => {
  const [userId, setUserId] = useState(1);
  const [shouldFail, setShouldFail] = useState(false);
  const [key, setKey] = useState(0);

  const handleError = (error: Error, errorInfo: any) => {
    console.log('Error caught in UserProfileExample:', error, errorInfo);
  };

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="example-container">
      <h2>User Profile Example (With Error Boundary)</h2>
      <p>
        This example shows how Error Boundary handles API call failures gracefully.
        When an API call fails, the Error Boundary will display a fallback UI and allow retry.
      </p>
      
      <div className="controls">
        <label>
          User ID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            min="1"
            max="10"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => setShouldFail(e.target.checked)}
          />
          Force API Failure
        </label>
      </div>

      <div className="component-container">
        <ErrorBoundary
          key={key}
          onError={handleError}
          onReset={handleReset}
          fallback={
            <div className="custom-fallback">
              <h3>Profile Loading Error</h3>
              <p>Failed to load user profile. You can try again or reset the component.</p>
              <button onClick={handleReset}>Retry Loading</button>
            </div>
          }
        >
          <BuggyUserProfile 
            userId={userId} 
            shouldFail={shouldFail} 
          />
        </ErrorBoundary>
      </div>

      <div className="info-box">
        <h4>✅ Benefits</h4>
        <ul>
          <li>Graceful handling of API failures</li>
          <li>Users can retry failed API calls</li>
          <li>App remains functional even when data loading fails</li>
          <li>Better user experience with clear error messages</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileExample;
