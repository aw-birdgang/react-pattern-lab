import React, { useState } from 'react';
import UserProfile from '../../components/after/UserProfile';
import LoginForm from '../../components/after/LoginForm';
import Dashboard from '../../components/after/Dashboard';
import { useAuth } from '../../features/auth/hooks/useAuth';

const AfterExample: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'profile' | 'dashboard'>('login');
  const { isAuthenticated, logout } = useAuth();

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            기능-기반 구조 (After) - 기능별 분리
          </h1>
          <p className="text-gray-600 mb-6">
            기능별로 폴더를 나누고, 각 기능 내부에서 컴포넌트, 훅, 타입을 분리하여 관리합니다.
          </p>
          
          {isAuthenticated && (
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-md ${
                  currentView === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                대시보드
              </button>
              <button
                onClick={() => setCurrentView('profile')}
                className={`px-4 py-2 rounded-md ${
                  currentView === 'profile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                프로필
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {!isAuthenticated ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <>
              {currentView === 'dashboard' && <Dashboard />}
              {currentView === 'profile' && <UserProfile userId="1" />}
            </>
          )}
        </div>

        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            기능-기반 구조의 장점:
          </h3>
          <ul className="text-green-700 space-y-1">
            <li>• 기능별로 폴더가 분리되어 코드를 찾기 쉬움</li>
            <li>• 각 기능의 책임이 명확하게 분리됨</li>
            <li>• 로직과 UI가 분리되어 재사용성 향상</li>
            <li>• 커스텀 훅을 통한 로직 재사용</li>
            <li>• 타입 정의가 기능별로 분리되어 관리 용이</li>
            <li>• 테스트하기 쉬운 구조</li>
            <li>• 확장성이 좋음</li>
          </ul>
        </div>

        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            폴더 구조:
          </h3>
          <div className="text-blue-700 text-sm font-mono">
            <div>src/</div>
            <div className="ml-4">├── features/</div>
            <div className="ml-8">├── auth/</div>
            <div className="ml-12">├── components/</div>
            <div className="ml-12">├── hooks/</div>
            <div className="ml-12">└── types.ts</div>
            <div className="ml-8">├── user/</div>
            <div className="ml-12">├── components/</div>
            <div className="ml-12">├── hooks/</div>
            <div className="ml-12">└── types.ts</div>
            <div className="ml-8">└── dashboard/</div>
            <div className="ml-12">├── components/</div>
            <div className="ml-12">├── hooks/</div>
            <div className="ml-12">└── types.ts</div>
            <div className="ml-4">├── shared/</div>
            <div className="ml-8">├── components/</div>
            <div className="ml-8">├── hooks/</div>
            <div className="ml-8">├── utils/</div>
            <div className="ml-8">└── types/</div>
            <div className="ml-4">└── components/</div>
            <div className="ml-8">├── before/</div>
            <div className="ml-8">└── after/</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterExample;
