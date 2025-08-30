# React 기능-기반 폴더 구조 패턴 분석 (Part 2)

## 🟢 패턴 적용 후 (After)

### 구조적 특징
- **기능별 분리**: 각 비즈니스 기능별로 폴더 구성
- **관심사 분리**: 컴포넌트, 훅, 타입을 명확히 분리
- **재사용성 향상**: 공통 요소를 shared 폴더에서 관리
- **확장성**: 새로운 기능 추가 시 기존 코드에 영향 최소화

### 예제: UserProfile 기능 (After)

#### 1. 타입 정의
```typescript
// src/features/user/types.ts
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
```

#### 2. 커스텀 훅
```typescript
// src/features/user/hooks/useUserProfile.ts
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
```

#### 3. 컴포넌트 분리

**메인 컴포넌트**
```typescript
// src/features/user/components/UserProfile.tsx
import React from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import UserProfileView from './UserProfileView';
import UserProfileForm from './UserProfileForm';
import Card from '../../../shared/components/Card';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const {
    user,
    loading,
    error,
    isEditing,
    formData,
    updateUser,
    startEditing,
    cancelEditing,
    updateFormData,
  } = useUserProfile(userId);

  const handleSave = () => {
    updateUser(formData);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-8">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        사용자를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <Card title="사용자 프로필" className="max-w-md mx-auto">
      {isEditing ? (
        <UserProfileForm
          formData={formData}
          onFormDataChange={updateFormData}
          onSave={handleSave}
          onCancel={cancelEditing}
          loading={loading}
        />
      ) : (
        <UserProfileView
          user={user}
          onEdit={startEditing}
        />
      )}
    </Card>
  );
};

export default UserProfile;
```

**뷰 컴포넌트**
```typescript
// src/features/user/components/UserProfileView.tsx
import React from 'react';
import { User } from '../types';
import { formatDate } from '../../../shared/utils';
import Button from '../../../shared/components/Button';

interface UserProfileViewProps {
  user: User;
  onEdit: () => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onEdit }) => {
  return (
    <div className="space-y-4">
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
        <Button
          onClick={onEdit}
          className="w-full"
        >
          프로필 편집
        </Button>
      </div>
    </div>
  );
};

export default UserProfileView;
```

**폼 컴포넌트**
```typescript
// src/features/user/components/UserProfileForm.tsx
import React from 'react';
import { UserProfileFormData } from '../types';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

interface UserProfileFormProps {
  formData: UserProfileFormData;
  onFormDataChange: (field: keyof UserProfileFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  formData,
  onFormDataChange,
  onSave,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="space-y-4">
      <Input
        label="이름"
        value={formData.name}
        onChange={(value) => onFormDataChange('name', value)}
        placeholder="이름을 입력하세요"
        required
      />
      
      <Input
        label="이메일"
        type="email"
        value={formData.email}
        onChange={(value) => onFormDataChange('email', value)}
        placeholder="이메일을 입력하세요"
        required
      />
      
      <div className="flex space-x-2">
        <Button
          onClick={onSave}
          loading={loading}
          disabled={loading}
        >
          저장
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default UserProfileForm;
```

#### 4. 공통 컴포넌트
```typescript
// src/shared/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-gray-300',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
```

## 📊 코드 비교 분석

### 파일 크기 비교

| 구분 | Before | After |
|------|--------|-------|
| 메인 컴포넌트 | 174줄 | 74줄 |
| 커스텀 훅 | - | 119줄 |
| 뷰 컴포넌트 | - | 47줄 |
| 폼 컴포넌트 | - | 42줄 |
| **총합** | **174줄** | **282줄** |

### 책임 분리 비교

| 구분 | Before | After |
|------|--------|-------|
| 상태 관리 | 컴포넌트 내부 | 커스텀 훅 |
| API 호출 | 컴포넌트 내부 | 커스텀 훅 |
| UI 렌더링 | 단일 컴포넌트 | 여러 컴포넌트 분리 |
| 유틸리티 | 컴포넌트 내부 | shared/utils |
| 타입 정의 | 컴포넌트 내부 | 별도 types.ts |

### 재사용성 비교

| 구분 | Before | After |
|------|--------|-------|
| 로직 재사용 | 불가능 | 가능 (커스텀 훅) |
| 컴포넌트 재사용 | 제한적 | 높음 (공통 컴포넌트) |
| 타입 재사용 | 불가능 | 가능 (공통 타입) |
| 유틸리티 재사용 | 불가능 | 가능 (shared/utils) |

## ✅ 장단점 분석

### 🟢 장점

#### 1. **코드 발견성 향상**
- 기능별로 폴더가 분리되어 관련 코드를 쉽게 찾을 수 있음
- 새로운 개발자가 프로젝트 구조를 이해하기 쉬움
- 파일 네비게이션이 직관적

#### 2. **관심사의 분리**
- 각 기능의 로직, UI, 타입이 명확하게 분리됨
- 컴포넌트는 UI에만 집중하고, 로직은 커스텀 훅으로 분리
- 단일 책임 원칙 준수

#### 3. **재사용성 향상**
- 공통 컴포넌트와 훅을 `shared` 폴더에서 관리
- 기능별 로직을 다른 곳에서도 쉽게 재사용할 수 있음
- 중복 코드 최소화

#### 4. **테스트 용이성**
- 각 기능별로 독립적인 테스트를 작성할 수 있음
- 로직과 UI가 분리되어 단위 테스트가 쉬워짐
- 커스텀 훅을 독립적으로 테스트 가능

#### 5. **확장성**
- 새로운 기능을 추가할 때 기존 코드에 영향을 주지 않음
- 팀원들이 동시에 다른 기능을 개발할 때 충돌이 줄어듦
- 기능별로 독립적인 개발 가능

#### 6. **유지보수성**
- 버그 수정이나 기능 변경 시 관련 코드를 쉽게 찾을 수 있음
- 코드의 책임이 명확하게 분리되어 있어 수정이 안전함
- 리팩토링이 용이함

### 🔴 단점

#### 1. **초기 설정 복잡성**
- 프로젝트 초기 설정 시 폴더 구조 설계가 필요
- 작은 프로젝트에서는 과도한 구조일 수 있음

#### 2. **파일 수 증가**
- 기능별로 분리되면서 전체 파일 수가 증가
- 작은 기능도 여러 파일로 분리되어 복잡해 보일 수 있음

#### 3. **학습 곡선**
- 새로운 팀원이 구조를 이해하는 데 시간이 필요
- 패턴에 대한 이해가 부족하면 오히려 복잡해질 수 있음

#### 4. **의존성 관리**
- 기능 간 의존성이 복잡해질 수 있음
- 순환 의존성 방지가 중요

## 🤔 패턴 적용 이유

### 1. **확장성 요구사항**
현대적인 웹 애플리케이션은 지속적으로 기능이 추가되고 변경됩니다. 기능-기반 구조는 이러한 확장성 요구사항을 효과적으로 처리할 수 있습니다.

```typescript
// 새로운 기능 추가 시
src/features/
├── auth/          # 기존 기능
├── user/          # 기존 기능
├── dashboard/     # 기존 기능
└── notification/  # 새로운 기능 추가
    ├── components/
    ├── hooks/
    └── types.ts
```

### 2. **팀 협업 효율성**
여러 개발자가 동시에 다른 기능을 개발할 때, 기능별 분리로 인해 충돌을 최소화할 수 있습니다.

### 3. **코드 품질 향상**
관심사의 분리와 단일 책임 원칙을 통해 코드 품질을 향상시킬 수 있습니다.

### 4. **유지보수성**
장기적으로 프로젝트를 유지보수할 때, 기능별 구조가 더 효율적입니다.

### 5. **재사용성**
공통 요소를 효과적으로 관리하여 재사용성을 높일 수 있습니다.

## 🎯 결론

### 패턴 적용 권장 시나리오

#### ✅ 권장하는 경우
- **중간~대규모 프로젝트**: 기능이 많고 복잡한 애플리케이션
- **팀 개발**: 여러 개발자가 동시에 작업하는 프로젝트
- **장기 유지보수**: 지속적으로 기능이 추가/변경되는 프로젝트
- **재사용성 요구**: 여러 곳에서 사용되는 로직이 많은 프로젝트

#### ❌ 권장하지 않는 경우
- **소규모 프로젝트**: 단순한 기능만 있는 작은 애플리케이션
- **프로토타입**: 빠른 개발이 필요한 초기 단계
- **팀 경험 부족**: 패턴에 대한 이해가 부족한 팀

### 핵심 가치

1. **확장성**: 새로운 기능 추가 시 기존 코드에 영향 최소화
2. **유지보수성**: 코드 구조가 명확하여 유지보수가 용이
3. **재사용성**: 공통 요소를 효과적으로 관리하여 재사용성 향상
4. **협업성**: 팀원 간 작업 충돌 최소화
5. **품질**: 관심사 분리와 단일 책임 원칙을 통한 코드 품질 향상

### 마이그레이션 전략

기존 프로젝트에 기능-기반 구조를 적용할 때는 점진적으로 마이그레이션하는 것을 권장합니다:

1. **공통 요소 분리**: 먼저 shared 폴더에 공통 컴포넌트와 유틸리티를 분리
2. **기능별 그룹화**: 관련된 컴포넌트들을 기능별로 그룹화
3. **커스텀 훅 추출**: 비즈니스 로직을 커스텀 훅으로 분리
4. **타입 정의**: 각 기능별로 타입을 명확하게 정의

이러한 단계적 접근을 통해 기존 코드의 안정성을 유지하면서 점진적으로 구조를 개선할 수 있습니다.

---

**참고**: 이 문서는 React 기능-기반 폴더 구조 패턴의 실제 구현 예제를 바탕으로 작성되었습니다. 프로젝트의 특성과 팀의 상황에 맞게 적절히 적용하시기 바랍니다.
