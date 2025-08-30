import { Post, PostComment, PostLike } from '@/features/post/domain/entities/Post';
import { Result } from '@/shared/domain/Result';

export interface PostRepository {
  findById(id: string): Promise<Result<Post, Error>>;
  findByAuthorId(authorId: string): Promise<Result<Post[], Error>>;
  findByStatus(status: Post['status']): Promise<Result<Post[], Error>>;
  create(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Result<Post, Error>>;
  update(id: string, post: Partial<Post>): Promise<Result<Post, Error>>;
  delete(id: string): Promise<Result<void, Error>>;
  list(limit?: number, offset?: number): Promise<Result<Post[], Error>>;
  search(query: string): Promise<Result<Post[], Error>>;
}

export interface PostCommentRepository {
  findByPostId(postId: string): Promise<Result<PostComment[], Error>>;
  create(comment: Omit<PostComment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Result<PostComment, Error>>;
  update(id: string, comment: Partial<PostComment>): Promise<Result<PostComment, Error>>;
  delete(id: string): Promise<Result<void, Error>>;
}

export interface PostLikeRepository {
  findByPostId(postId: string): Promise<Result<PostLike[], Error>>;
  findByUserId(userId: string): Promise<Result<PostLike[], Error>>;
  create(like: Omit<PostLike, 'id' | 'createdAt'>): Promise<Result<PostLike, Error>>;
  delete(postId: string, userId: string): Promise<Result<void, Error>>;
  exists(postId: string, userId: string): Promise<Result<boolean, Error>>;
}
