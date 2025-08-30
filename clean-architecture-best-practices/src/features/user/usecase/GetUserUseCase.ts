import { User } from '@/features/user/domain/entities/User';
import { UserRepository } from '@/features/user/repository/UserRepository';
import { Result } from '@/shared/domain/Result';

export interface GetUserUseCaseRequest {
  userId: string;
}

export interface GetUserUseCaseResponse {
  user: User;
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: GetUserUseCaseRequest): Promise<Result<GetUserUseCaseResponse, Error>> {
    const { userId } = request;

    if (!userId) {
      return Result.failure(new Error('User ID is required'));
    }

    const userResult = await this.userRepository.findById(userId);
    
    if (userResult.isFailure()) {
      return Result.failure(userResult.error);
    }

    return Result.success({
      user: userResult.value
    });
  }
}
