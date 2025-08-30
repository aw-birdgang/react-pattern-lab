import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CounterExampleBefore from './examples/before/CounterExample';
import CounterExampleAfter from './examples/after/CounterExample';
import FormExampleBefore from './examples/before/FormExample';
import FormExampleAfter from './examples/after/FormExample';
import ApiExampleBefore from './examples/before/ApiExample';
import ApiExampleAfter from './examples/after/ApiExample';
import LocalStorageExampleBefore from './examples/before/LocalStorageExample';
import LocalStorageExampleAfter from './examples/after/LocalStorageExample';
import WindowSizeExampleBefore from './examples/before/WindowSizeExample';
import WindowSizeExampleAfter from './examples/after/WindowSizeExample';

function App() {
  const [selectedPattern, setSelectedPattern] = useState<'before' | 'after'>('before');

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Custom Hooks 패턴 예제</h1>
          <p>로직 캡슐화를 통한 코드 재사용성 향상</p>
        </header>
        
        <nav className="App-nav">
          <div className="pattern-selector">
            <button 
              className={`pattern-btn ${selectedPattern === 'before' ? 'active' : ''}`}
              onClick={() => setSelectedPattern('before')}
            >
              Before (Custom Hook 없음)
            </button>
            <button 
              className={`pattern-btn ${selectedPattern === 'after' ? 'active' : ''}`}
              onClick={() => setSelectedPattern('after')}
            >
              After (Custom Hook 사용)
            </button>
          </div>
          
          <div className="example-nav">
            <Link to="/counter">Counter</Link>
            <Link to="/form">Form</Link>
            <Link to="/api">API</Link>
            <Link to="/localStorage">LocalStorage</Link>
            <Link to="/windowSize">WindowSize</Link>
          </div>
        </nav>

        <main className="App-main">
          <Routes>
            <Route path="/counter" element={
              selectedPattern === 'before' ? <CounterExampleBefore /> : <CounterExampleAfter />
            } />
            <Route path="/form" element={
              selectedPattern === 'before' ? <FormExampleBefore /> : <FormExampleAfter />
            } />
            <Route path="/api" element={
              selectedPattern === 'before' ? <ApiExampleBefore /> : <ApiExampleAfter />
            } />
            <Route path="/localStorage" element={
              selectedPattern === 'before' ? <LocalStorageExampleBefore /> : <LocalStorageExampleAfter />
            } />
            <Route path="/windowSize" element={
              selectedPattern === 'before' ? <WindowSizeExampleBefore /> : <WindowSizeExampleAfter />
            } />
            <Route path="/" element={
              <div className="welcome">
                <h2>Custom Hooks 패턴에 오신 것을 환영합니다!</h2>
                <p>위의 네비게이션을 클릭하여 각 예제를 확인해보세요.</p>
                <div className="pattern-info">
                  <h3>Custom Hooks 패턴이란?</h3>
                  <p>
                    Custom Hooks는 React의 기본 Hook들을 조합하여 재사용 가능한 로직을 만드는 패턴입니다.
                    이를 통해 컴포넌트 간에 상태 관련 로직을 공유할 수 있고, 
                    비즈니스 로직과 UI 로직을 분리하여 코드의 가독성과 유지보수성을 향상시킬 수 있습니다.
                  </p>
                  
                  <h4>주요 장점:</h4>
                  <ul>
                    <li><strong>로직 재사용성:</strong> 동일한 로직을 여러 컴포넌트에서 쉽게 재사용</li>
                    <li><strong>관심사 분리:</strong> 비즈니스 로직과 UI 로직을 분리</li>
                    <li><strong>테스트 용이성:</strong> Custom Hook은 독립적으로 테스트 가능</li>
                    <li><strong>코드 가독성:</strong> 컴포넌트 코드가 간결해지고 이해하기 쉬워짐</li>
                    <li><strong>상태 관리 단순화:</strong> 복잡한 상태 로직을 캡슐화</li>
                  </ul>
                </div>
                <div className="comparison-info">
                  <h3>Before vs After 비교:</h3>
                  <div className="comparison-grid">
                    <div className="comparison-item">
                      <h4>Before (Custom Hook 없음)</h4>
                      <ul>
                        <li>❌ 로직이 컴포넌트 내부에 중복</li>
                        <li>❌ 재사용이 어려움</li>
                        <li>❌ 테스트하기 어려움</li>
                        <li>❌ 코드가 복잡하고 길어짐</li>
                      </ul>
                    </div>
                    <div className="comparison-item">
                      <h4>After (Custom Hook 사용)</h4>
                      <ul>
                        <li>✅ 로직이 Custom Hook으로 캡슐화</li>
                        <li>✅ 다른 컴포넌트에서 쉽게 재사용</li>
                        <li>✅ 독립적으로 테스트 가능</li>
                        <li>✅ 컴포넌트 코드가 간결해짐</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="note">
                  <h4>💡 사용 방법:</h4>
                  <p>
                    상단의 "Before" 또는 "After" 버튼을 클릭하여 패턴을 선택한 후,
                    원하는 예제를 클릭하여 확인해보세요.
                    Before는 Custom Hook을 사용하지 않은 원본 구현이고,
                    After는 Custom Hook을 사용한 개선된 구현입니다.
                  </p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
