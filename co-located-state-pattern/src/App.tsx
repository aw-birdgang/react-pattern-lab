import React, { useState } from 'react';
import './App.css';

// Before examples (Centralized State)
import CounterExampleBefore from './examples/before/CounterExample';
import TodoListExampleBefore from './examples/before/TodoListExample';
import FormExampleBefore from './examples/before/FormExample';
import ThemeToggleExampleBefore from './examples/before/ThemeToggleExample';

// After examples (Co-located State)
import CounterExampleAfter from './examples/after/CounterExample';
import TodoListExampleAfter from './examples/after/TodoListExample';
import FormExampleAfter from './examples/after/FormExample';
import ThemeToggleExampleAfter from './examples/after/ThemeToggleExample';

// Advanced example
import AdvancedCoLocatedExample from './patterns/AdvancedCoLocatedExample';

function App() {
  const [activeTab, setActiveTab] = useState<'before' | 'after' | 'advanced'>('before');

  return (
    <div className="App">
      <header className="App-header">
        <h1>상태의 지역화(Co-located State) 패턴</h1>
        <p>React에서 상태 관리 패턴을 비교해보세요</p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={activeTab === 'before' ? 'active' : ''}
          onClick={() => setActiveTab('before')}
        >
          Before (중앙화된 상태)
        </button>
        <button 
          className={activeTab === 'after' ? 'active' : ''}
          onClick={() => setActiveTab('after')}
        >
          After (지역화된 상태)
        </button>
        <button 
          className={activeTab === 'advanced' ? 'active' : ''}
          onClick={() => setActiveTab('advanced')}
        >
          고급 예제
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'before' && (
          <div className="before-examples">
            <h2>Before: 중앙화된 상태 관리</h2>
            <p className="pattern-description">
              모든 상태가 최상위 컴포넌트에서 관리되어 props drilling이 발생합니다.
              컴포넌트 간 강한 결합이 있고, 상태 변경 로직이 분산되어 있습니다.
            </p>
            
            <div className="examples-grid">
              <CounterExampleBefore />
              <TodoListExampleBefore />
              <FormExampleBefore />
              <ThemeToggleExampleBefore />
            </div>
          </div>
        )}

        {activeTab === 'after' && (
          <div className="after-examples">
            <h2>After: 지역화된 상태 관리</h2>
            <p className="pattern-description">
              상태가 실제로 사용되는 컴포넌트에 배치되어 props drilling이 최소화됩니다.
              컴포넌트 간 느슨한 결합이 있고, 상태 변경 로직이 캡슐화되어 있습니다.
            </p>
            
            <div className="examples-grid">
              <CounterExampleAfter />
              <TodoListExampleAfter />
              <FormExampleAfter />
              <ThemeToggleExampleAfter />
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="advanced-examples">
            <AdvancedCoLocatedExample />
          </div>
        )}
      </main>

      <footer className="App-footer">
        <h3>패턴 비교</h3>
        <div className="comparison">
          <div className="comparison-item">
            <h4>Before (중앙화된 상태)</h4>
            <ul>
              <li>Props drilling 발생</li>
              <li>컴포넌트 간 강한 결합</li>
              <li>상태 변경 로직 분산</li>
              <li>테스트 복잡성 증가</li>
            </ul>
          </div>
          <div className="comparison-item">
            <h4>After (지역화된 상태)</h4>
            <ul>
              <li>Props drilling 최소화</li>
              <li>컴포넌트 간 느슨한 결합</li>
              <li>상태 변경 로직 캡슐화</li>
              <li>테스트 용이성 증가</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
