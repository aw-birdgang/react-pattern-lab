import React from 'react';
import { ThemeToggle } from '../../components/after';

const ThemeToggleExample: React.FC = () => {
  return (
    <div className="example">
      <h2>Theme Toggle Example (After - Co-located State)</h2>
      <p>
        이 예제에서는 테마 상태가 컴포넌트 내부에서 관리됩니다.
        테마 토글 로직이 컴포넌트 내부에 캡슐화되어 있습니다.
      </p>
      <ThemeToggle />
    </div>
  );
};

export default ThemeToggleExample;
