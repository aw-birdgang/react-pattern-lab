import React from 'react';
import { useLoginForm } from '../hooks/useLoginForm';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const {
    formState,
    validateForm,
    updateField,
    setLoading,
  } = useLoginForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onLogin(formState.email, formState.password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="로그인" className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="이메일"
          type="email"
          value={formState.email}
          onChange={(value) => updateField('email', value)}
          error={formState.errors.email}
          placeholder="이메일을 입력하세요"
          disabled={formState.loading}
          required
        />

        <Input
          label="비밀번호"
          type="password"
          value={formState.password}
          onChange={(value) => updateField('password', value)}
          error={formState.errors.password}
          placeholder="비밀번호를 입력하세요"
          disabled={formState.loading}
          required
        />

        <Button
          type="submit"
          loading={formState.loading}
          disabled={formState.loading}
          className="w-full"
        >
          로그인
        </Button>
      </form>

      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          비밀번호를 잊으셨나요?
        </a>
      </div>
    </Card>
  );
};

export default LoginForm;
