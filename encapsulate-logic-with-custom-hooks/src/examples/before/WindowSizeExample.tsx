import React, { useState, useEffect } from 'react';

const WindowSizeExample: React.FC = () => {
  // 각 컴포넌트마다 중복되는 윈도우 크기 감지 로직
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  return (
    <div className="example-container">
      <h2>Window 크기 감지 예제 (Before)</h2>
      <p>Custom Hook을 사용하지 않은 원본 구현</p>
      
      <div className="windowSize-example">
        <div className="size-display">
          <h4>현재 윈도우 크기</h4>
          <div className="size-info">
            <p><strong>너비:</strong> {windowSize.width}px</p>
            <p><strong>높이:</strong> {windowSize.height}px</p>
          </div>
        </div>

        <div className="device-type">
          <h4>디바이스 타입</h4>
          <div className="device-indicators">
            <div className={`device-indicator ${isMobile ? 'active' : ''}`}>
              📱 모바일 {isMobile && '(현재)'}
            </div>
            <div className={`device-indicator ${isTablet ? 'active' : ''}`}>
              📱 태블릿 {isTablet && '(현재)'}
            </div>
            <div className={`device-indicator ${isDesktop ? 'active' : ''}`}>
              💻 데스크톱 {isDesktop && '(현재)'}
            </div>
          </div>
        </div>

        <div className="responsive-content">
          <h4>반응형 콘텐츠</h4>
          <div className={`content-box ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
            {isMobile && (
              <div className="mobile-content">
                <h5>모바일 최적화 콘텐츠</h5>
                <p>작은 화면에 최적화된 레이아웃입니다.</p>
                <button>모바일 액션</button>
              </div>
            )}
            
            {isTablet && (
              <div className="tablet-content">
                <h5>태블릿 최적화 콘텐츠</h5>
                <p>중간 크기 화면에 최적화된 레이아웃입니다.</p>
                <div className="tablet-actions">
                  <button>액션 1</button>
                  <button>액션 2</button>
                </div>
              </div>
            )}
            
            {isDesktop && (
              <div className="desktop-content">
                <h5>데스크톱 최적화 콘텐츠</h5>
                <p>큰 화면에 최적화된 레이아웃입니다.</p>
                <div className="desktop-actions">
                  <button>주요 액션</button>
                  <button>보조 액션</button>
                  <button>추가 액션</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="code-section">
        <h4>Before: Custom Hook 없음</h4>
        <pre>
{`// 각 컴포넌트마다 중복되는 윈도우 크기 감지 로직
const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight,
});

useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

const isMobile = windowSize.width < 768;
const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
const isDesktop = windowSize.width >= 1024;

// 문제점:
// ❌ 각 컴포넌트마다 중복되는 윈도우 크기 감지 로직
// ❌ 이벤트 리스너 관리가 복잡
// ❌ 재사용이 어려움
// ❌ 코드가 길고 반복됨`}
        </pre>
      </div>
    </div>
  );
};

export default WindowSizeExample;
