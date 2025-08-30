import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Clean Architecture Best Practices
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive demonstration of clean architecture patterns in React/Next.js applications.
          This project showcases proper separation of concerns, dependency inversion, and scalable code organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Domain Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Contains business entities, value objects, and domain logic. This layer is completely independent of external concerns.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Business Entities (User, Post)</li>
              <li>• Value Objects (Result)</li>
              <li>• Domain Services</li>
              <li>• Business Rules</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use Case Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Orchestrates the flow of data between the domain and external layers. Contains application-specific business logic.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• GetUserUseCase</li>
              <li>• CreateUserUseCase</li>
              <li>• GetPostsUseCase</li>
              <li>• Application Logic</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repository Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Defines interfaces for data access. Abstracts the data layer from the rest of the application.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• UserRepository Interface</li>
              <li>• PostRepository Interface</li>
              <li>• Data Access Contracts</li>
              <li>• Abstraction Layer</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Implements external concerns like HTTP clients, databases, and third-party services.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• HttpUserRepository</li>
              <li>• AxiosHttpClient</li>
              <li>• Dependency Container</li>
              <li>• External Services</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Presentation Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Handles user interface and user interactions. Contains React components and custom hooks.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• React Components</li>
              <li>• Custom Hooks</li>
              <li>• Page Components</li>
              <li>• UI Logic</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shared Components</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Reusable UI components and utilities that can be used across the application.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Button Component</li>
              <li>• Input Component</li>
              <li>• Card Component</li>
              <li>• Utility Functions</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Testability</h3>
            <p className="text-gray-600">
              Each layer can be tested independently with proper mocking and dependency injection.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Maintainability</h3>
            <p className="text-gray-600">
              Clear separation of concerns makes the codebase easier to understand and maintain.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Scalability</h3>
            <p className="text-gray-600">
              The architecture supports growth and can easily accommodate new features and requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" size="lg">
          Explore Examples
        </Button>
      </div>
    </div>
  );
}
