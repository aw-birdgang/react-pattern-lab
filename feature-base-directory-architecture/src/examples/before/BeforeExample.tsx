import React, { useState } from 'react';
import UserProfile from '../../components/before/UserProfile';
import LoginForm from '../../components/before/LoginForm';
import Dashboard from '../../components/before/Dashboard';

const BeforeExample: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'profile' | 'dashboard'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            기존 방식 (Before) - 기능별 분리 없음
          </h1>
          <p className="text-gray-600 mb-6">
            모든 컴포넌트가 하나의 폴더에 있고, 각 컴포넌트 내부에서 모든 로직을 처리합니다.
          </p>
          
          {isLoggedIn && (
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
          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <>
              {currentView === 'dashboard' && <Dashboard />}
              {currentView === 'profile' && <UserProfile userId="1" />}
            </>
          )}
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            기존 방식의 문제점:
          </h3>
          <ul className="text-yellow-700 space-y-1">
            <li>• 모든 컴포넌트가 하나의 폴더에 있어 찾기 어려움</li>
            <li>• 각 컴포넌트가 너무 많은 책임을 가짐</li>
            <li>• 로직과 UI가 분리되지 않음</li>
            <li>• 재사용성이 떨어짐</li>
            <li>• 테스트하기 어려움</li>
            <li>• 코드 중복이 많음</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeforeExample;
