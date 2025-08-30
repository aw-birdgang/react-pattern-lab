import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import BeforeExample from './examples/before/BeforeExample';
import AfterExample from './examples/after/AfterExample';
import AdvancedSelectorExample from './patterns/AdvancedSelectorExample';
import './App.css';

function App() {
  const [currentExample, setCurrentExample] = useState<'before' | 'after' | 'advanced'>('before');

  return (
    <Provider store={store}>
      <div className="App">
        {/* 네비게이션 */}
        <nav style={{
          padding: '15px 20px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <button
            onClick={() => setCurrentExample('before')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentExample === 'before' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Props Drilling 패턴 (Before)
          </button>
          <button
            onClick={() => setCurrentExample('after')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentExample === 'after' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Redux + Selectors 패턴 (After)
          </button>
          <button
            onClick={() => setCurrentExample('advanced')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentExample === 'advanced' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            고급 셀렉터 패턴 (Advanced)
          </button>
        </nav>

        {/* 예제 컴포넌트 렌더링 */}
        {currentExample === 'before' && <BeforeExample />}
        {currentExample === 'after' && <AfterExample />}
        {currentExample === 'advanced' && <AdvancedSelectorExample />}
      </div>
    </Provider>
  );
}

export default App;
