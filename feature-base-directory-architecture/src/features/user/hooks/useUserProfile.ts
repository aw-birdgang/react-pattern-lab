import { useState, useEffect, useCallback } from 'react';
import { User, UserProfileFormData, UserProfileState } from '../types';

export const useUserProfile = (userId: string) => {
  const [state, setState] = useState<UserProfileState>({
    user: null,
    loading: true,
    error: null,
    isEditing: false,
    formData: {
      name: '',
      email: '',
    },
  });

  const fetchUser = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: userId,
        name: '홍길동',
        email: 'hong@example.com',
        avatar: 'https://via.placeholder.com/150',
        role: 'user',
        createdAt: new Date('2023-01-01'),
        lastLoginAt: new Date(),
      };
      
      setState(prev => ({
        ...prev,
        user: mockUser,
        formData: {
          name: mockUser.name,
          email: mockUser.email,
        },
        loading: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: '사용자 정보를 불러오는데 실패했습니다.',
        loading: false,
      }));
    }
  }, [userId]);

  const updateUser = async (formData: UserProfileFormData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (state.user) {
        const updatedUser: User = {
          ...state.user,
          name: formData.name,
          email: formData.email,
        };
        
        setState(prev => ({
          ...prev,
          user: updatedUser,
          isEditing: false,
          loading: false,
        }));
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: '저장에 실패했습니다.',
        loading: false,
      }));
    }
  };

  const startEditing = () => {
    setState(prev => ({ ...prev, isEditing: true }));
  };

  const cancelEditing = () => {
    setState(prev => ({
      ...prev,
      isEditing: false,
      formData: {
        name: state.user?.name || '',
        email: state.user?.email || '',
      },
    }));
  };

  const updateFormData = (field: keyof UserProfileFormData, value: string) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    ...state,
    updateUser,
    startEditing,
    cancelEditing,
    updateFormData,
    refetch: fetchUser,
  };
};
