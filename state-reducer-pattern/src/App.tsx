import React, { useState } from 'react';
import './App.css';

// Before examples
import ToggleExampleBefore from './examples/before/ToggleExample';
import CounterExampleBefore from './examples/before/CounterExample';
import FormExampleBefore from './examples/before/FormExample';

// After examples
import ToggleExampleAfter from './examples/after/ToggleExample';
import CounterExampleAfter from './examples/after/CounterExample';
import FormExampleAfter from './examples/after/FormExample';

function App() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <div className="App">
      <header className="App-header">
        <h1>State Reducer Pattern Examples</h1>
        <p>
          This project demonstrates the State Reducer pattern in React, showing how 
          external state management logic can be injected into components.
        </p>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('before')}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: activeTab === 'before' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'before' ? 'white' : 'black',
              border: '1px solid #dee2e6',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Before State Reducer Pattern
          </button>
          <button 
            onClick={() => setActiveTab('after')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'after' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'after' ? 'white' : 'black',
              border: '1px solid #dee2e6',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            After State Reducer Pattern
          </button>
        </div>

        {activeTab === 'before' && (
          <div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '5px', 
              marginBottom: '20px' 
            }}>
              <h2>Before State Reducer Pattern</h2>
              <p>
                These components have hardcoded state management logic. The behavior 
                cannot be customized without modifying the component code.
              </p>
            </div>
            
            <ToggleExampleBefore />
            <CounterExampleBefore />
            <FormExampleBefore />
          </div>
        )}

        {activeTab === 'after' && (
          <div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#e7f3ff', 
              borderRadius: '5px', 
              marginBottom: '20px' 
            }}>
              <h2>After State Reducer Pattern</h2>
              <p>
                These components accept a <code>stateReducer</code> prop that allows 
                external control over state management logic. The same component can 
                have different behaviors without code modification.
              </p>
            </div>
            
            <ToggleExampleAfter />
            <CounterExampleAfter />
            <FormExampleAfter />
          </div>
        )}
      </div>

      <footer style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        marginTop: '40px',
        textAlign: 'center'
      }}>
        <h3>Key Benefits of State Reducer Pattern:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li><strong>Flexibility:</strong> Components can have different behaviors without code changes</li>
          <li><strong>Reusability:</strong> Same component can be used in different contexts</li>
          <li><strong>Testability:</strong> State logic can be tested independently</li>
          <li><strong>Composability:</strong> Multiple reducers can be combined</li>
          <li><strong>Inversion of Control:</strong> Parent components control child behavior</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
