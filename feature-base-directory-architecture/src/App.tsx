import React, { useState } from 'react';
import './App.css';
import BeforeExample from './examples/before/BeforeExample';
import AfterExample from './examples/after/AfterExample';

function App() {
  const [currentExample, setCurrentExample] = useState<'before' | 'after'>('before');

  return (
    <div className="App">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              React 기능-기반 폴더 구조 패턴
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentExample('before')}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentExample === 'before'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                기존 방식 (Before)
              </button>
              <button
                onClick={() => setCurrentExample('after')}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentExample === 'after'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                기능-기반 구조 (After)
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentExample === 'before' ? <BeforeExample /> : <AfterExample />}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              React 기능-기반 폴더 구조 패턴 예제
            </h3>
            <p className="text-gray-300">
              기능별로 코드를 조직화하여 유지보수성과 확장성을 향상시키는 방법을 보여줍니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
