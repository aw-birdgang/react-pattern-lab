# React 기능-기반 폴더 구조 패턴 분석

## 📋 목차

1. [개요](#개요)
2. [프로젝트 구조 분석](#프로젝트-구조-분석)
3. [패턴 적용 전 (Before)](#패턴-적용-전-before)
4. [패턴 적용 후 (After)](#패턴-적용-후-after)
5. [코드 비교 분석](#코드-비교-분석)
6. [장단점 분석](#장단점-분석)
7. [패턴 적용 이유](#패턴-적용-이유)
8. [실제 구현 예제](#실제-구현-예제)
9. [결론](#결론)

## 🎯 개요

기능-기반 폴더 구조 패턴(Feature-based Directory Architecture)은 React 애플리케이션에서 코드를 기능별로 조직화하는 아키텍처 패턴입니다. 이 패턴은 기존의 타입별 분리(Type-based Separation) 방식과 달리, 비즈니스 기능을 중심으로 코드를 구조화합니다.

### 핵심 원칙
- **기능 중심**: 비즈니스 기능별로 폴더를 구성
- **관심사 분리**: 각 기능 내에서 컴포넌트, 훅, 타입을 분리
- **재사용성**: 공통 요소를 shared 폴더에서 관리
- **확장성**: 새로운 기능 추가 시 기존 코드에 영향 최소화

## 📁 프로젝트 구조 분석

### 전체 프로젝트 구조
```
feature-base-directory-architecture/
├── src/
│   ├── features/                    # 기능별 폴더 구조
│   │   ├── auth/                    # 인증 기능
│   │   │   ├── components/          # 인증 관련 컴포넌트
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── hooks/              # 인증 관련 커스텀 훅
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useLoginForm.ts
│   │   │   └── types.ts            # 인증 관련 타입
│   │   ├── user/                    # 사용자 기능
│   │   │   ├── components/          # 사용자 관련 컴포넌트
│   │   │   │   ├── UserProfile.tsx
│   │   │   │   ├── UserProfileView.tsx
│   │   │   │   └── UserProfileForm.tsx
│   │   │   ├── hooks/              # 사용자 관련 커스텀 훅
│   │   │   │   └── useUserProfile.ts
│   │   │   └── types.ts            # 사용자 관련 타입
│   │   └── dashboard/               # 대시보드 기능
│   │       ├── components/          # 대시보드 관련 컴포넌트
│   │       │   ├── Dashboard.tsx
│   │       │   ├── StatsCard.tsx
│   │       │   └── RecentActivities.tsx
│   │       ├── hooks/              # 대시보드 관련 커스텀 훅
│   │       │   └── useDashboard.ts
│   │       └── types.ts            # 대시보드 관련 타입
│   ├── shared/                      # 공통 리소스
│   │   ├── components/              # 공통 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── hooks/                  # 공통 커스텀 훅
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useDebounce.ts
│   │   ├── utils/                  # 유틸리티 함수
│   │   │   └── index.ts
│   │   └── types/                  # 공통 타입
│   │       └── index.ts
│   ├── components/                  # 예제 컴포넌트
│   │   ├── before/                 # 기존 방식
│   │   │   ├── UserProfile.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── Dashboard.tsx
│   │   └── after/                  # 기능-기반 구조
│   │       ├── UserProfile.tsx
│   │       ├── LoginForm.tsx
│   │       └── Dashboard.tsx
│   └── examples/                    # 예제 페이지
│       ├── before/                 # 기존 방식 예제
│       │   └── BeforeExample.tsx
│       └── after/                  # 기능-기반 구조 예제
│           └── AfterExample.tsx
```

## 🔴 패턴 적용 전 (Before)

### 구조적 특징
- **타입별 분리**: 컴포넌트, 훅, 유틸리티를 타입별로 분리
- **단일 책임 위반**: 하나의 컴포넌트가 여러 책임을 가짐
- **코드 중복**: 유사한 로직이 여러 컴포넌트에 반복
- **의존성 혼재**: 비즈니스 로직과 UI 로직이 섞여있음

### 예제: UserProfile 컴포넌트 (Before)

```typescript
// src/components/before/UserProfile.tsx
import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  // 상태 관리
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // API 호출 로직
  const fetchUser = async () => {
    try {
      setLoading(true);
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
      
      setUser(mockUser);
      setFormData({
        name: mockUser.name,
        email: mockUser.email,
      });
    } catch (err) {
      setError('사용자 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 저장 로직
  const handleSave = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user) {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
        });
      }
      setIsEditing(false);
    } catch (err) {
      setError('저장에 실패했습니다.');
    }
  };

  // 유틸리티 함수
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR').format(date);
  };

  // UI 렌더링
  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  if (!user) {
    return <div className="text-center py-8">사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {/* 프로필 표시 UI */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar || 'https://via.placeholder.com/80'}
          alt={user.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
            {user.role}
          </span>
        </div>
      </div>

      {/* 편집 모드 UI */}
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">가입일</h3>
            <p className="text-gray-900">{formatDate(user.createdAt)}</p>
          </div>
          {user.lastLoginAt && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">마지막 로그인</h3>
              <p className="text-gray-900">{formatDate(user.lastLoginAt)}</p>
            </div>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            프로필 편집
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
```

### 기존 방식의 문제점

1. **단일 파일에 모든 로직 집중**
   - API 호출, 상태 관리, UI 렌더링이 모두 하나의 파일에
   - 파일 크기가 174줄로 매우 큼

2. **재사용성 부족**
   - 로직이 컴포넌트에 하드코딩되어 재사용 불가
   - 다른 컴포넌트에서 유사한 로직을 중복 구현

3. **테스트 어려움**
   - 로직과 UI가 섞여있어 단위 테스트 작성 어려움
   - 비즈니스 로직을 독립적으로 테스트할 수 없음

4. **유지보수성 저하**
   - 기능 변경 시 전체 파일을 수정해야 함
   - 버그 발생 시 원인 파악이 어려움
