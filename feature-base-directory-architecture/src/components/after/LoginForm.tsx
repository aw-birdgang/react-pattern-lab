import React from 'react';
import LoginFormComponent from '../../features/auth/components/LoginForm';
import { useAuth } from '../../features/auth/hooks/useAuth';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { login, error, clearError } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      onLoginSuccess?.();
    } catch (error) {
      // Error is handled by the useAuth hook
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={clearError}
            className="ml-2 text-red-700 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}
      <LoginFormComponent onLogin={handleLogin} />
    </div>
  );
};

export default LoginForm;
