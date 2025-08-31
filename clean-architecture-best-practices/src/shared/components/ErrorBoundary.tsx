'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  featureName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">
                {this.props.featureName ? `${this.props.featureName} Error` : 'Something went wrong'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    An error occurred while loading this feature. This might be due to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-500">
                    <li>Network connectivity issues</li>
                    <li>Server problems</li>
                    <li>Data corruption</li>
                    <li>Browser compatibility issues</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Button onClick={this.handleReset} variant="primary" className="w-full">
                    Try Again
                  </Button>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline" 
                    className="w-full"
                  >
                    Reload Page
                  </Button>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700">
                      Error Details (Development)
                    </summary>
                    <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-red-600 overflow-auto">
                      <p><strong>Error:</strong> {this.state.error.message}</p>
                      <p><strong>Stack:</strong></p>
                      <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </div>
                  </details>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
    console.error('useErrorHandler caught an error:', error);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}
