import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          
          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        {/* Error Details */}
        <Card>
          <CardHeader>
            <CardTitle>What happened?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• The page might have been moved or deleted</p>
              <p>• You might have typed the wrong URL</p>
              <p>• The link you followed might be broken</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button variant="primary" className="w-full" asChild>
            <Link href="/">
              Go back home
            </Link>
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/users">
                Users
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/posts">
                Posts
              </Link>
            </Button>
          </div>
        </div>

        {/* Architecture Info */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Base Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              This 404 page demonstrates how to handle errors in a Feature Base architecture:
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Centralized error handling</li>
              <li>• Consistent user experience</li>
              <li>• Easy navigation back to working features</li>
              <li>• Maintainable error pages</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
