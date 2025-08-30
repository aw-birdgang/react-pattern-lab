export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfileFormData {
  name: string;
  email: string;
}

export interface UserProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  formData: UserProfileFormData;
}
