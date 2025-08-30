import React, { useState } from 'react';

interface BuggyRendererProps {
  shouldCrash?: boolean;
  crashType?: 'render' | 'calculation' | 'null-access';
}

const BuggyRenderer: React.FC<BuggyRendererProps> = ({ 
  shouldCrash = false, 
  crashType = 'render' 
}) => {
  const [data, setData] = useState<any>(null);
  const [counter, setCounter] = useState(0);

  // 렌더링 에러를 발생시키는 함수들
  const renderError = () => {
    if (shouldCrash) {
      throw new Error('Rendering error occurred!');
    }
    return <div>Normal render</div>;
  };

  const calculationError = () => {
    if (shouldCrash) {
      // 0으로 나누기 에러
      const result = 10 / 0;
      return result;
    }
    return 42;
  };

  const nullAccessError = () => {
    if (shouldCrash) {
      // null 객체에 접근
      const obj: any = null;
      return obj.property;
    }
    return 'Safe access';
  };

  const getErrorContent = () => {
    switch (crashType) {
      case 'render':
        return renderError();
      case 'calculation':
        return <div>Calculation result: {calculationError()}</div>;
      case 'null-access':
        return <div>Access result: {nullAccessError()}</div>;
      default:
        return <div>No error</div>;
    }
  };

  const handleToggleCrash = () => {
    setCounter(prev => prev + 1);
  };

  const triggerError = () => {
    // 즉시 에러를 발생시키는 함수
    setCounter(prev => prev + 1); // 상태 업데이트로 렌더링 트리거
  };

  // 카운터가 특정 값에 도달하면 에러 발생
  if (counter === 3) {
    throw new Error('Manual renderer error triggered');
  }

  return (
    <div className="buggy-renderer">
      <h3>Buggy Renderer</h3>
      <p>Crash Type: {crashType}</p>
      <p>Should Crash: {shouldCrash ? 'Yes' : 'No'}</p>
      <p>Counter: {counter}</p>
      
      <div className="render-content">
        {getErrorContent()}
      </div>

      <div className="renderer-actions">
        <button onClick={handleToggleCrash}>
          Increment Counter
        </button>
        <button onClick={triggerError} className="error-button">
          Trigger Error
        </button>
      </div>
    </div>
  );
};

export default BuggyRenderer;
