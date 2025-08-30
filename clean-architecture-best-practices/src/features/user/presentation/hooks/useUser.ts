import { useState, useEffect } from 'react';
import { User } from '@/features/user/domain/entities/User';
import { GetUserUseCase } from '@/features/user/usecase/GetUserUseCase';
import { CreateUserUseCase } from '@/features/user/usecase/CreateUserUseCase';
import { UserRepository } from '@/features/user/repository/UserRepository';

export interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  getUser: (userId: string) => Promise<void>;
  createUser: (name: string, email: string, avatar?: string) => Promise<void>;
  clearError: () => void;
}

export function useUser(userRepository: UserRepository): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserUseCase = new GetUserUseCase(userRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);

  const getUser = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getUserUseCase.execute({ userId });
      
      if (result.isSuccess()) {
        setUser(result.value.user);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (name: string, email: string, avatar?: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createUserUseCase.execute({ name, email, avatar });
      
      if (result.isSuccess()) {
        setUser(result.value.user);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    getUser,
    createUser,
    clearError,
  };
}
