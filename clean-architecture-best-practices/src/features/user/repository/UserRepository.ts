import { User, UserProfile, UserPreferences } from '@/features/user/domain/entities/User';
import { Result } from '@/shared/domain/Result';

export interface UserRepository {
  findById(id: string): Promise<Result<User, Error>>;
  findByEmail(email: string): Promise<Result<User, Error>>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Result<User, Error>>;
  update(id: string, user: Partial<User>): Promise<Result<User, Error>>;
  delete(id: string): Promise<Result<void, Error>>;
  list(limit?: number, offset?: number): Promise<Result<User[], Error>>;
}

export interface UserProfileRepository {
  findByUserId(userId: string): Promise<Result<UserProfile, Error>>;
  create(profile: Omit<UserProfile, 'id'>): Promise<Result<UserProfile, Error>>;
  update(userId: string, profile: Partial<UserProfile>): Promise<Result<UserProfile, Error>>;
}

export interface UserPreferencesRepository {
  findByUserId(userId: string): Promise<Result<UserPreferences, Error>>;
  create(preferences: Omit<UserPreferences, 'id'>): Promise<Result<UserPreferences, Error>>;
  update(userId: string, preferences: Partial<UserPreferences>): Promise<Result<UserPreferences, Error>>;
}
