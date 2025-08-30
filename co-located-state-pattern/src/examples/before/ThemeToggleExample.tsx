import React, { useState } from 'react';
import { ThemeToggle } from '../../components/before';

const ThemeToggleExample: React.FC = () => {
  // 모든 상태가 최상위 컴포넌트에서 관리됨 (props drilling 발생)
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="example">
      <h2>Theme Toggle Example (Before - Centralized State)</h2>
      <p>
        이 예제에서는 테마 상태가 부모 컴포넌트에서 관리되고, 
        토글 함수가 props를 통해 전달됩니다.
      </p>
      <ThemeToggle
        isDark={isDark}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default ThemeToggleExample;
