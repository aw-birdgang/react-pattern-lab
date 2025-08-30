import { useState } from 'react';
import { LoginFormState } from '../types';
import { validateEmail } from '../../../shared/utils';

export const useLoginForm = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    errors: {},
    loading: false,
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formState.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(formState.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formState.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formState.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    setFormState(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: 'email' | 'password', value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: '', // Clear error when user starts typing
      },
    }));
  };

  const setLoading = (loading: boolean) => {
    setFormState(prev => ({ ...prev, loading }));
  };

  const resetForm = () => {
    setFormState({
      email: '',
      password: '',
      errors: {},
      loading: false,
    });
  };

  return {
    formState,
    validateForm,
    updateField,
    setLoading,
    resetForm,
  };
};
