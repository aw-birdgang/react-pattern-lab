import { User } from '@/features/user/domain/entities/User';
import { UserRepository } from '@/features/user/repository/UserRepository';
import { Result } from '@/shared/domain/Result';

export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  avatar?: string;
}

export interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserUseCaseRequest): Promise<Result<CreateUserUseCaseResponse, Error>> {
    const { name, email, avatar } = request;

    // Validation
    if (!name || !email) {
      return Result.failure(new Error('Name and email are required'));
    }

    if (!this.isValidEmail(email)) {
      return Result.failure(new Error('Invalid email format'));
    }

    // Check if user already exists
    const existingUserResult = await this.userRepository.findByEmail(email);
    if (existingUserResult.isSuccess()) {
      return Result.failure(new Error('User with this email already exists'));
    }

    // Create user
    const userData = {
      name,
      email,
      avatar,
    };

    const userResult = await this.userRepository.create(userData);
    
    if (userResult.isFailure()) {
      return Result.failure(userResult.error);
    }

    return Result.success({
      user: userResult.value
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
