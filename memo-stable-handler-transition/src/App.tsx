import React, { useState } from 'react';
import './App.css';

// Before Examples
import MemoExampleBefore from './examples/before/MemoExample';
import StableHandlerExampleBefore from './examples/before/StableHandlerExample';
import TransitionExampleBefore from './examples/before/TransitionExample';

// After Examples
import MemoExampleAfter from './examples/after/MemoExample';
import StableHandlerExampleAfter from './examples/after/StableHandlerExample';
import TransitionExampleAfter from './examples/after/TransitionExample';

// Advanced Pattern
import AdvancedPerformanceExample from './patterns/AdvancedPerformanceExample';

type ExampleType = 'memo' | 'stable-handler' | 'transition' | 'advanced';

const App: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<ExampleType>('memo');
  const [showBefore, setShowBefore] = useState(true);

  const examples = {
    memo: {
      title: 'React.memo 패턴',
      description: '컴포넌트의 불필요한 리렌더링을 방지하는 패턴',
      before: MemoExampleBefore,
      after: MemoExampleAfter
    },
    'stable-handler': {
      title: '안정 핸들러 패턴 (useCallback)',
      description: '함수 참조의 안정성을 보장하는 패턴',
      before: StableHandlerExampleBefore,
      after: StableHandlerExampleAfter
    },
    transition: {
      title: '전환 패턴 (useTransition)',
      description: 'UI 업데이트의 우선순위를 관리하는 패턴',
      before: TransitionExampleBefore,
      after: TransitionExampleAfter
    },
    advanced: {
      title: '고급 성능 패턴',
      description: '여러 패턴을 조합한 복합 예제',
      before: AdvancedPerformanceExample,
      after: AdvancedPerformanceExample
    }
  };

  const selectedExampleConfig = examples[selectedExample];
  const ExampleComponent = showBefore ? selectedExampleConfig.before : selectedExampleConfig.after;

  return (
    <div className="App">
      <header style={{ 
        backgroundColor: '#282c34', 
        padding: '20px', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h1>React 성능 패턴: 메모/안정 핸들러/전환 패턴</h1>
        <p>React에서 성능을 최적화하는 주요 패턴들을 비교해보세요</p>
      </header>

      {/* 네비게이션 */}
      <nav style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px',
        borderBottom: '1px solid #dee2e6'
      }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '15px'
        }}>
          {Object.entries(examples).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key as ExampleType)}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedExample === key ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {config.title}
            </button>
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '10px'
        }}>
          <button
            onClick={() => setShowBefore(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: showBefore ? '#dc3545' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            최적화 전
          </button>
          <button
            onClick={() => setShowBefore(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: !showBefore ? '#28a745' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            최적화 후
          </button>
        </div>
      </nav>

      {/* 설명 */}
      <div style={{ 
        padding: '20px',
        backgroundColor: showBefore ? '#fff3cd' : '#d4edda',
        borderBottom: '1px solid #dee2e6'
      }}>
        <h3>{selectedExampleConfig.title}</h3>
        <p>{selectedExampleConfig.description}</p>
        <p style={{ fontWeight: 'bold' }}>
          현재 보기: {showBefore ? '최적화 전 (성능 문제 있음)' : '최적화 후 (성능 개선됨)'}
        </p>
        {showBefore && (
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            💡 개발자 도구의 콘솔을 열어서 렌더링 로그를 확인해보세요!
          </div>
        )}
      </div>

      {/* 예제 컴포넌트 */}
      <main>
        <ExampleComponent />
      </main>

      {/* 푸터 */}
      <footer style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px',
        textAlign: 'center',
        borderTop: '1px solid #dee2e6',
        marginTop: '40px'
      }}>
        <p>React 성능 패턴 학습 프로젝트</p>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>
          각 패턴의 성능 차이를 직접 체험해보세요
        </p>
      </footer>
    </div>
  );
};

export default App;
