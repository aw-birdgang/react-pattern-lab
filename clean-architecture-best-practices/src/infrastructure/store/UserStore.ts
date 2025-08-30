import { create } from 'zustand';
import { User } from '@/domain/entities/User';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UserActions {
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  reset: () => void;
}

type UserStore = UserState & UserActions;

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  
  setUser: (user) => set({ user, error: null }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error, loading: false }),
  
  clearUser: () => set({ user: null, error: null }),
  
  reset: () => set(initialState),
}));
