import { Post } from '@/features/post/domain/entities/Post';
import { PostRepository } from '@/features/post/repository/PostRepository';
import { Result } from '@/shared/domain/Result';

export interface GetPostsUseCaseRequest {
  limit?: number;
  offset?: number;
  status?: Post['status'];
  authorId?: string;
  searchQuery?: string;
}

export interface GetPostsUseCaseResponse {
  posts: Post[];
  total: number;
  hasMore: boolean;
}

export class GetPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(request: GetPostsUseCaseRequest): Promise<Result<GetPostsUseCaseResponse, Error>> {
    const { limit = 10, offset = 0, status, authorId, searchQuery } = request;

    let postsResult: Result<Post[], Error>;

    if (searchQuery) {
      postsResult = await this.postRepository.search(searchQuery);
    } else if (authorId) {
      postsResult = await this.postRepository.findByAuthorId(authorId);
    } else if (status) {
      postsResult = await this.postRepository.findByStatus(status);
    } else {
      postsResult = await this.postRepository.list(limit, offset);
    }

    if (postsResult.isFailure()) {
      return Result.failure(postsResult.error);
    }

    const posts = postsResult.value;
    const hasMore = posts.length === limit;

    return Result.success({
      posts,
      total: posts.length,
      hasMore
    });
  }
}
