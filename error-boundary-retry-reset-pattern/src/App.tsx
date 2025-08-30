import React, { useState } from 'react';
import './App.css';

// Before examples (without Error Boundary)
import CounterExampleBefore from './examples/before/CounterExample';
import UserProfileExampleBefore from './examples/before/UserProfileExample';
import RendererExampleBefore from './examples/before/RendererExample';

// After examples (with Error Boundary)
import CounterExampleAfter from './examples/after/CounterExample';
import UserProfileExampleAfter from './examples/after/UserProfileExample';
import RendererExampleAfter from './examples/after/RendererExample';

// Advanced pattern
import AdvancedErrorBoundaryExample from './patterns/AdvancedErrorBoundaryExample';

type TabType = 'before' | 'after' | 'advanced';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('after');
  const [activeExample, setActiveExample] = useState<string>('counter');

  const tabs = [
    { id: 'before', label: 'Without Error Boundary', description: 'See what happens when errors occur without protection' },
    { id: 'after', label: 'With Error Boundary', description: 'See how Error Boundary handles errors gracefully' },
    { id: 'advanced', label: 'Advanced Pattern', description: 'Advanced Error Boundary patterns with logging and monitoring' },
  ];

  const beforeExamples = [
    { id: 'counter', label: 'Counter', component: CounterExampleBefore },
    { id: 'userProfile', label: 'User Profile', component: UserProfileExampleBefore },
    { id: 'renderer', label: 'Renderer', component: RendererExampleBefore },
  ];

  const afterExamples = [
    { id: 'counter', label: 'Counter', component: CounterExampleAfter },
    { id: 'userProfile', label: 'User Profile', component: UserProfileExampleAfter },
    { id: 'renderer', label: 'Renderer', component: RendererExampleAfter },
  ];

  const renderContent = () => {
    if (activeTab === 'advanced') {
      return <AdvancedErrorBoundaryExample />;
    }

    const examples = activeTab === 'before' ? beforeExamples : afterExamples;
    const ExampleComponent = examples.find(ex => ex.id === activeExample)?.component;

    return ExampleComponent ? <ExampleComponent /> : null;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Error Boundary & Retry/Reset Pattern</h1>
        <p>
          This project demonstrates how to handle React component errors gracefully using Error Boundaries.
          Compare the behavior with and without Error Boundaries.
        </p>
      </header>

      <main className="App-main">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as TabType)}
            >
              <div className="tab-label">{tab.label}</div>
              <div className="tab-description">{tab.description}</div>
            </button>
          ))}
        </div>

        {/* Example Navigation (only for before/after tabs) */}
        {activeTab !== 'advanced' && (
          <div className="example-navigation">
            <h3>Examples:</h3>
            <div className="example-buttons">
              {(activeTab === 'before' ? beforeExamples : afterExamples).map(example => (
                <button
                  key={example.id}
                  className={`example-button ${activeExample === example.id ? 'active' : ''}`}
                  onClick={() => setActiveExample(example.id)}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="content-area">
          {renderContent()}
        </div>
      </main>

      <footer className="App-footer">
        <p>
          <strong>Error Boundary & Retry/Reset Pattern</strong> - 
          A React pattern for graceful error handling and recovery
        </p>
      </footer>
    </div>
  );
};

export default App;
