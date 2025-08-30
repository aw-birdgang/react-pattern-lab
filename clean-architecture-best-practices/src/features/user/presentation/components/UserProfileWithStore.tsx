import React, { useEffect } from 'react';
import { useUserStore } from '@/infrastructure/store/UserStore';
import { useUserWithStore } from '@/features/user/presentation/hooks/useUserWithStore';
import { Container } from '@/infrastructure/container/Container';
import { Button } from '@/shared/components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';

interface UserProfileWithStoreProps {
  userId: string;
}

export const UserProfileWithStore: React.FC<UserProfileWithStoreProps> = ({ userId }) => {
  const container = Container.getInstance();
  const userRepository = container.getUserRepository();
  const { user, loading, error, getUser } = useUserWithStore(userRepository);

  // Zustand 스토어에서 직접 상태 접근
  const { setUser, setLoading, setError } = useUserStore();

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId, getUser]);

  const handleRefresh = () => {
    getUser(userId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={handleRefresh} variant="primary">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent>
            <div className="text-center">
              <p className="text-gray-600">User not found</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User Profile (with Zustand)</CardTitle>
            <Button onClick={handleRefresh} variant="outline" size="sm">
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-gray-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Zustand Store Benefits:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Global state management without complexity</li>
                <li>• Automatic re-renders when state changes</li>
                <li>• Type-safe state updates</li>
                <li>• Minimal boilerplate code</li>
                <li>• Easy integration with Clean Architecture</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
