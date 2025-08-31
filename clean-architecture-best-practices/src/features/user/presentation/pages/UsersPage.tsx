'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@/infrastructure/container/Container';
import { useUser } from '@/features/user/presentation/hooks/useUser';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

function UsersPageContent() {
  const container = Container.getInstance();
  const userRepository = container.getUserRepository();
  const { user, loading, error, getUser, createUser, clearError } = useUser(userRepository);
  
  const [users, setUsers] = useState<User[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  // Mock users data for demonstration
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25'),
      },
    ];
    setUsers(mockUsers);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateUser = async () => {
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }

    setIsCreating(true);
    try {
      await createUser(formData.name, formData.email, formData.avatar || undefined);
      
      // Add new user to the list
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUsers(prev => [newUser, ...prev]);
      setFormData({ name: '', email: '', avatar: '' });
      setIsCreating(false);
    } catch (error) {
      setIsCreating(false);
    }
  };

  const handleViewUser = (userId: string) => {
    getUser(userId);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Users Management
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrating Feature Base Architecture with User management
        </p>
      </div>

      {/* Create User Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter user name"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter user email"
            />
            <Input
              label="Avatar URL (Optional)"
              value={formData.avatar}
              onChange={(e) => handleInputChange('avatar', e.target.value)}
              placeholder="Enter avatar URL"
            />
          </div>
          <div className="mt-4">
            <Button 
              onClick={handleCreateUser} 
              variant="primary"
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-16 h-16 object-cover"
                          />
                        ) : (
                          <span className="text-xl text-gray-600">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Button
                      onClick={() => handleViewUser(user.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Architecture Info */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Base Architecture - User Feature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">User Feature Structure:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>domain/entities/User.ts</code> - User business entities</li>
                <li>• <code>usecase/GetUserUseCase.ts</code> - Business logic</li>
                <li>• <code>repository/UserRepository.ts</code> - Data access interface</li>
                <li>• <code>infrastructure/HttpUserRepository.ts</code> - HTTP implementation</li>
                <li>• <code>presentation/hooks/useUser.ts</code> - React hooks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Feature-specific code organization</li>
                <li>• Independent development and testing</li>
                <li>• Clear separation of concerns</li>
                <li>• Easy to maintain and scale</li>
                <li>• Team collaboration efficiency</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UsersPage() {
  return (
    <ErrorBoundary featureName="Users">
      <UsersPageContent />
    </ErrorBoundary>
  );
}
