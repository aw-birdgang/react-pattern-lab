import { User } from '@/features/user/domain/entities/User';
import { UserRepository } from '@/features/user/repository/UserRepository';
import { Result, success, failure } from '@/shared/domain/Result';
import { HttpClient } from '@/shared/infrastructure/HttpClient';

export class HttpUserRepository implements UserRepository {
  constructor(private httpClient: HttpClient) {}

  async findById(id: string): Promise<Result<User, Error>> {
    try {
      const response = await this.httpClient.get(`/users/${id}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch user'));
    }
  }

  async findByEmail(email: string): Promise<Result<User, Error>> {
    try {
      const response = await this.httpClient.get(`/users/email/${email}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch user by email'));
    }
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Result<User, Error>> {
    try {
      const response = await this.httpClient.post('/users', user);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to create user'));
    }
  }

  async update(id: string, user: Partial<User>): Promise<Result<User, Error>> {
    try {
      const response = await this.httpClient.put(`/users/${id}`, user);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to update user'));
    }
  }

  async delete(id: string): Promise<Result<void, Error>> {
    try {
      await this.httpClient.delete(`/users/${id}`);
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to delete user'));
    }
  }

  async list(limit?: number, offset?: number): Promise<Result<User[], Error>> {
    try {
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit.toString());
      if (offset) params.append('offset', offset.toString());
      
      const response = await this.httpClient.get(`/users?${params.toString()}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch users'));
    }
  }
}
