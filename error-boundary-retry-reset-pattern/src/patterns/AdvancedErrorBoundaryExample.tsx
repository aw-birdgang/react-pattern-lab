import React, { useState } from 'react';
import { ErrorBoundary, BuggyCounter, BuggyUserProfile, BuggyRenderer } from '../components/after';

interface ErrorLog {
  id: string;
  timestamp: Date;
  error: string;
  component: string;
  stack?: string;
}

const AdvancedErrorBoundaryExample: React.FC = () => {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [globalErrorCount, setGlobalErrorCount] = useState(0);

  const handleError = (error: Error, errorInfo: any, componentName: string) => {
    const newErrorLog: ErrorLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      error: error.message,
      component: componentName,
      stack: errorInfo.componentStack,
    };

    setErrorLogs(prev => [newErrorLog, ...prev]);
    setGlobalErrorCount(prev => prev + 1);
  };

  const clearErrorLogs = () => {
    setErrorLogs([]);
    setGlobalErrorCount(0);
  };

  return (
    <div className="advanced-example">
      <h2>Advanced Error Boundary Pattern</h2>
      <p>
        This example demonstrates advanced Error Boundary patterns including:
        error logging, global error tracking, and component-specific error handling.
      </p>

      <div className="error-stats">
        <h3>Error Statistics</h3>
        <p>Total Errors: {globalErrorCount}</p>
        <p>Recent Errors: {errorLogs.length}</p>
        <button onClick={clearErrorLogs} className="clear-logs-btn">
          Clear Error Logs
        </button>
      </div>

      <div className="components-grid">
        {/* Counter with Error Boundary */}
        <div className="component-section">
          <h3>Counter Component</h3>
          <ErrorBoundary
            onError={(error, errorInfo) => handleError(error, errorInfo, 'Counter')}
            fallback={
              <div className="custom-fallback">
                <h4>Counter Error</h4>
                <p>Counter component failed. Try again or reset.</p>
              </div>
            }
          >
            <BuggyCounter initialValue={0} errorThreshold={3} />
          </ErrorBoundary>
        </div>

        {/* User Profile with Error Boundary */}
        <div className="component-section">
          <h3>User Profile Component</h3>
          <ErrorBoundary
            onError={(error, errorInfo) => handleError(error, errorInfo, 'UserProfile')}
            fallback={
              <div className="custom-fallback">
                <h4>Profile Error</h4>
                <p>Failed to load user profile. Retry loading.</p>
              </div>
            }
          >
            <BuggyUserProfile userId={1} shouldFail={false} />
          </ErrorBoundary>
        </div>

        {/* Renderer with Error Boundary */}
        <div className="component-section">
          <h3>Renderer Component</h3>
          <ErrorBoundary
            onError={(error, errorInfo) => handleError(error, errorInfo, 'Renderer')}
            fallback={
              <div className="custom-fallback">
                <h4>Renderer Error</h4>
                <p>Rendering failed. Reset the component.</p>
              </div>
            }
          >
            <BuggyRenderer shouldCrash={false} crashType="render" />
          </ErrorBoundary>
        </div>
      </div>

      {/* Error Logs */}
      {errorLogs.length > 0 && (
        <div className="error-logs">
          <h3>Error Logs</h3>
          <div className="logs-container">
            {errorLogs.map(log => (
              <div key={log.id} className="error-log-item">
                <div className="log-header">
                  <span className="component-name">{log.component}</span>
                  <span className="timestamp">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="error-message">{log.error}</div>
                {log.stack && (
                  <details className="stack-trace">
                    <summary>Stack Trace</summary>
                    <pre>{log.stack}</pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pattern-explanation">
        <h3>Advanced Pattern Features</h3>
        <ul>
          <li><strong>Error Logging:</strong> All errors are logged with timestamps and component names</li>
          <li><strong>Global Error Tracking:</strong> Centralized error monitoring across all components</li>
          <li><strong>Component-Specific Handling:</strong> Different fallback UIs for different component types</li>
          <li><strong>Error Recovery:</strong> Each component can be reset independently</li>
          <li><strong>Debugging Support:</strong> Stack traces and error details for developers</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedErrorBoundaryExample;
