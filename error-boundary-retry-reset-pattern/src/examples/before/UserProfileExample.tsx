import React, { useState } from 'react';
import { BuggyUserProfile } from '../../components/before';

const UserProfileExample: React.FC = () => {
  const [userId, setUserId] = useState(1);
  const [shouldFail, setShouldFail] = useState(false);

  return (
    <div className="example-container">
      <h2>User Profile Example (No Error Boundary)</h2>
      <p>
        This example shows what happens when an API call fails without an Error Boundary.
        The entire app will crash when the API call fails.
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
        <BuggyUserProfile 
          userId={userId} 
          shouldFail={shouldFail} 
        />
      </div>

      <div className="warning-box">
        <h4>⚠️ Warning</h4>
        <p>
          When the API call fails (either randomly or when forced), 
          the entire application will crash and show a blank screen or error page.
        </p>
      </div>
    </div>
  );
};

export default UserProfileExample;
