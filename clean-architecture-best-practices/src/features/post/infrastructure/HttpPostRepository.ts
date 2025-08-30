import { Post, PostComment, PostLike } from '@/features/post/domain/entities/Post';
import { PostRepository, PostCommentRepository, PostLikeRepository } from '@/features/post/repository/PostRepository';
import { Result, success, failure } from '@/shared/domain/Result';
import { HttpClient } from '@/shared/infrastructure/HttpClient';

export class HttpPostRepository implements PostRepository {
  constructor(private httpClient: HttpClient) {}

  async findById(id: string): Promise<Result<Post, Error>> {
    try {
      const response = await this.httpClient.get(`/posts/${id}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch post'));
    }
  }

  async findByAuthorId(authorId: string): Promise<Result<Post[], Error>> {
    try {
      const response = await this.httpClient.get(`/posts/author/${authorId}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch posts by author'));
    }
  }

  async findByStatus(status: Post['status']): Promise<Result<Post[], Error>> {
    try {
      const response = await this.httpClient.get(`/posts/status/${status}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch posts by status'));
    }
  }

  async create(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Result<Post, Error>> {
    try {
      const response = await this.httpClient.post('/posts', post);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to create post'));
    }
  }

  async update(id: string, post: Partial<Post>): Promise<Result<Post, Error>> {
    try {
      const response = await this.httpClient.put(`/posts/${id}`, post);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to update post'));
    }
  }

  async delete(id: string): Promise<Result<void, Error>> {
    try {
      await this.httpClient.delete(`/posts/${id}`);
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to delete post'));
    }
  }

  async list(limit?: number, offset?: number): Promise<Result<Post[], Error>> {
    try {
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit.toString());
      if (offset) params.append('offset', offset.toString());
      
      const response = await this.httpClient.get(`/posts?${params.toString()}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch posts'));
    }
  }

  async search(query: string): Promise<Result<Post[], Error>> {
    try {
      const response = await this.httpClient.get(`/posts/search?q=${encodeURIComponent(query)}`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to search posts'));
    }
  }
}

export class HttpPostCommentRepository implements PostCommentRepository {
  constructor(private httpClient: HttpClient) {}

  async findByPostId(postId: string): Promise<Result<PostComment[], Error>> {
    try {
      const response = await this.httpClient.get(`/posts/${postId}/comments`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch comments'));
    }
  }

  async create(comment: Omit<PostComment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Result<PostComment, Error>> {
    try {
      const response = await this.httpClient.post(`/posts/${comment.postId}/comments`, comment);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to create comment'));
    }
  }

  async update(id: string, comment: Partial<PostComment>): Promise<Result<PostComment, Error>> {
    try {
      const response = await this.httpClient.put(`/comments/${id}`, comment);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to update comment'));
    }
  }

  async delete(id: string): Promise<Result<void, Error>> {
    try {
      await this.httpClient.delete(`/comments/${id}`);
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to delete comment'));
    }
  }
}

export class HttpPostLikeRepository implements PostLikeRepository {
  constructor(private httpClient: HttpClient) {}

  async findByPostId(postId: string): Promise<Result<PostLike[], Error>> {
    try {
      const response = await this.httpClient.get(`/posts/${postId}/likes`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch likes'));
    }
  }

  async findByUserId(userId: string): Promise<Result<PostLike[], Error>> {
    try {
      const response = await this.httpClient.get(`/users/${userId}/likes`);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to fetch user likes'));
    }
  }

  async create(like: Omit<PostLike, 'id' | 'createdAt'>): Promise<Result<PostLike, Error>> {
    try {
      const response = await this.httpClient.post(`/posts/${like.postId}/likes`, like);
      return success(response.data);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to create like'));
    }
  }

  async delete(postId: string, userId: string): Promise<Result<void, Error>> {
    try {
      await this.httpClient.delete(`/posts/${postId}/likes/${userId}`);
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to delete like'));
    }
  }

  async exists(postId: string, userId: string): Promise<Result<boolean, Error>> {
    try {
      const response = await this.httpClient.get(`/posts/${postId}/likes/${userId}/exists`);
      return success(response.data.exists);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to check like existence'));
    }
  }
}
