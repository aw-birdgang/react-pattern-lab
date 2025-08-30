import React, { useState } from 'react';
import './App.css';

// Before (Uncontrolled) Examples
import UncontrolledFormExample from './examples/uncontrolled/UncontrolledFormExample';
import UncontrolledInputExample from './examples/uncontrolled/UncontrolledInputExample';
import UncontrolledSelectExample from './examples/uncontrolled/UncontrolledSelectExample';

// After (Controlled) Examples
import ControlledFormExample from './examples/controlled/ControlledFormExample';
import ControlledInputExample from './examples/controlled/ControlledInputExample';
import ControlledSelectExample from './examples/controlled/ControlledSelectExample';

type ExampleType = 'form' | 'input' | 'select';
type PatternType = 'before' | 'after';

const App: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<ExampleType>('form');
  const [selectedPattern, setSelectedPattern] = useState<PatternType>('before');

  const examples = {
    form: {
      before: UncontrolledFormExample,
      after: ControlledFormExample
    },
    input: {
      before: UncontrolledInputExample,
      after: ControlledInputExample
    },
    select: {
      before: UncontrolledSelectExample,
      after: ControlledSelectExample
    }
  };

  const SelectedComponent = examples[selectedExample][selectedPattern];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Controlled vs Uncontrolled Components</h1>
        <p>React 컴포넌트 패턴 비교</p>
      </header>

      <main className="App-main">
        <div className="controls">
          <div className="control-group">
            <h3>Example Type:</h3>
            <div className="button-group">
              <button 
                className={selectedExample === 'form' ? 'active' : ''}
                onClick={() => setSelectedExample('form')}
              >
                Form
              </button>
              <button 
                className={selectedExample === 'input' ? 'active' : ''}
                onClick={() => setSelectedExample('input')}
              >
                Input
              </button>
              <button 
                className={selectedExample === 'select' ? 'active' : ''}
                onClick={() => setSelectedExample('select')}
              >
                Select
              </button>
            </div>
          </div>

          <div className="control-group">
            <h3>Pattern:</h3>
            <div className="button-group">
              <button 
                className={selectedPattern === 'before' ? 'active' : ''}
                onClick={() => setSelectedPattern('before')}
              >
                Uncontrolled (Before)
              </button>
              <button 
                className={selectedPattern === 'after' ? 'active' : ''}
                onClick={() => setSelectedPattern('after')}
              >
                Controlled (After)
              </button>
            </div>
          </div>
        </div>

        <div className="example-section">
          <SelectedComponent />
        </div>

        <div className="comparison-section">
          <h2>Controlled vs Uncontrolled Components 비교</h2>
          
          <div className="comparison-grid">
            <div className="comparison-card">
              <h3>Uncontrolled Components</h3>
              <h4>장점:</h4>
              <ul>
                <li>구현이 간단함</li>
                <li>성능상 이점 (리렌더링이 적음)</li>
                <li>기존 HTML 폼과 유사한 동작</li>
              </ul>
              <h4>단점:</h4>
              <ul>
                <li>실시간 상태 추적 불가</li>
                <li>유효성 검사가 어려움</li>
                <li>프로그래밍적 제어 불가</li>
                <li>테스트하기 어려움</li>
              </ul>
            </div>

            <div className="comparison-card">
              <h3>Controlled Components</h3>
              <h4>장점:</h4>
              <ul>
                <li>완전한 상태 제어</li>
                <li>실시간 유효성 검사 가능</li>
                <li>예측 가능한 동작</li>
                <li>테스트하기 쉬움</li>
                <li>복잡한 폼 로직 구현 가능</li>
              </ul>
              <h4>단점:</h4>
              <ul>
                <li>더 많은 코드 작성 필요</li>
                <li>성능 오버헤드 (매번 리렌더링)</li>
                <li>복잡한 폼의 경우 상태 관리 복잡</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
