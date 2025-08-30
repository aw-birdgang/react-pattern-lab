import { useEffect } from 'react';
import { GetUserUseCase } from '@/usecase/user/GetUserUseCase';
import { CreateUserUseCase } from '@/usecase/user/CreateUserUseCase';
import { UserRepository } from '@/repository/interfaces/UserRepository';
import { useUserStore } from '@/infrastructure/store/UserStore';

export function useUserWithStore(userRepository: UserRepository) {
  const { user, loading, error, setUser, setLoading, setError } = useUserStore();

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

  return {
    user,
    loading,
    error,
    getUser,
    createUser,
  };
}
