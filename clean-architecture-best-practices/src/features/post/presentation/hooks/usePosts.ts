import { useState, useEffect } from 'react';
import { Post } from '@/features/post/domain/entities/Post';
import { GetPostsUseCase } from '@/features/post/usecase/GetPostsUseCase';
import { PostRepository } from '@/features/post/repository/PostRepository';

export interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  getPosts: (params?: {
    limit?: number;
    offset?: number;
    status?: Post['status'];
    authorId?: string;
    searchQuery?: string;
  }) => Promise<void>;
  loadMore: () => Promise<void>;
  clearError: () => void;
}

export function usePosts(postRepository: PostRepository): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);

  const getPostsUseCase = new GetPostsUseCase(postRepository);

  const getPosts = async (params?: {
    limit?: number;
    offset?: number;
    status?: Post['status'];
    authorId?: string;
    searchQuery?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPostsUseCase.execute({
        limit: params?.limit || 10,
        offset: params?.offset || 0,
        status: params?.status,
        authorId: params?.authorId,
        searchQuery: params?.searchQuery,
      });
      
      if (result.isSuccess()) {
        setPosts(result.value.posts);
        setHasMore(result.value.hasMore);
        setTotal(result.value.total);
        setCurrentOffset(params?.offset || 0);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const nextOffset = currentOffset + posts.length;
      const result = await getPostsUseCase.execute({
        limit: 10,
        offset: nextOffset,
      });
      
      if (result.isSuccess()) {
        setPosts(prev => [...prev, ...result.value.posts]);
        setHasMore(result.value.hasMore);
        setCurrentOffset(nextOffset);
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
    posts,
    loading,
    error,
    hasMore,
    total,
    getPosts,
    loadMore,
    clearError,
  };
}
