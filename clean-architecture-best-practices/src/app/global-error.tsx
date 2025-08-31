'use client';

import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              {/* Error Icon */}
              <div className="mx-auto h-24 w-24 text-red-400 mb-6">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              
              {/* Error Text */}
              <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-8">
                An unexpected error occurred. Please try again.
              </p>
            </div>

            {/* Error Details */}
            <Card>
              <CardHeader>
                <CardTitle>Error Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Error:</span>
                    <p className="text-gray-600 mt-1 break-words">
                      {error.message || 'Unknown error occurred'}
                    </p>
                  </div>
                  {error.digest && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Error ID:</span>
                      <p className="text-gray-600 mt-1 font-mono text-xs">
                        {error.digest}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={reset} 
                variant="primary" 
                className="w-full"
              >
                Try again
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <a href="/">
                  Go back home
                </a>
              </Button>
            </div>

            {/* Architecture Info */}
            <Card>
              <CardHeader>
                <CardTitle>Error Handling in Feature Base</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  This error page demonstrates error handling in Feature Base architecture:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Global error boundary</li>
                  <li>• User-friendly error messages</li>
                  <li>• Recovery mechanisms</li>
                  <li>• Error logging and monitoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </body>
    </html>
  );
}
