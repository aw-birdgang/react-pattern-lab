import { create } from 'zustand';
import { Post } from '@/domain/entities/Post';

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
}

interface PostActions {
  setPosts: (posts: Post[]) => void;
  addPosts: (posts: Post[]) => void;
  setCurrentPost: (post: Post | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHasMore: (hasMore: boolean) => void;
  setTotal: (total: number) => void;
  clearPosts: () => void;
  reset: () => void;
}

type PostStore = PostState & PostActions;

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  hasMore: false,
  total: 0,
};

export const usePostStore = create<PostStore>((set) => ({
  ...initialState,
  
  setPosts: (posts) => set({ posts, error: null }),
  
  addPosts: (posts) => set((state) => ({ 
    posts: [...state.posts, ...posts] 
  })),
  
  setCurrentPost: (currentPost) => set({ currentPost }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error, loading: false }),
  
  setHasMore: (hasMore) => set({ hasMore }),
  
  setTotal: (total) => set({ total }),
  
  clearPosts: () => set({ posts: [], currentPost: null, error: null }),
  
  reset: () => set(initialState),
}));
