import React, { useState } from 'react';
import './App.css';
import { PropsDrillingApp } from './patterns/props-drilling/PropsDrillingApp';
import { ContextModuleApp } from './patterns/context-module/ContextModuleApp';
import { ShoppingCartApp } from './patterns/shopping-cart-context/ShoppingCartApp';
import { FormManagementApp } from './patterns/form-management-context/FormManagementApp';
import { ShoppingCartPropsDrillingApp } from './patterns/shopping-cart-props-drilling/ShoppingCartPropsDrillingApp';
import { FormManagementPropsDrillingApp } from './patterns/form-management-props-drilling/FormManagementPropsDrillingApp';
import { AdvancedContextExample } from './patterns/advanced-context-example/AdvancedContextExample';

type PatternType = 'props-drilling' | 'context-module' | 'shopping-cart-props' | 'shopping-cart-context' | 'form-management-props' | 'form-management-context' | 'advanced-context';

function App() {
  const [activePattern, setActivePattern] = useState<PatternType>('props-drilling');

  const patterns = [
    {
      id: 'props-drilling' as PatternType,
      name: 'Props Drilling',
      description: 'Context 사용 전 (기본)',
      icon: '🔗'
    },
    {
      id: 'context-module' as PatternType,
      name: 'Context Module',
      description: 'Context 사용 후 (기본)',
      icon: '🎯'
    },
    {
      id: 'shopping-cart-props' as PatternType,
      name: 'Shopping Cart (Props)',
      description: '쇼핑 카트 Props Drilling',
      icon: '🛍️'
    },
    {
      id: 'shopping-cart-context' as PatternType,
      name: 'Shopping Cart (Context)',
      description: '쇼핑 카트 Context Module',
      icon: '🛒'
    },
    {
      id: 'form-management-props' as PatternType,
      name: 'Form Management (Props)',
      description: '폼 관리 Props Drilling',
      icon: '📝'
    },
    {
      id: 'form-management-context' as PatternType,
      name: 'Form Management (Context)',
      description: '폼 관리 Context Module',
      icon: '📋'
    },
    {
      id: 'advanced-context' as PatternType,
      name: 'Advanced Context Example',
      description: '고급 알림 시스템 예제',
      icon: '🎯'
    }
  ];

  const renderPattern = () => {
    switch (activePattern) {
      case 'props-drilling':
        return <PropsDrillingApp />;
      case 'context-module':
        return <ContextModuleApp />;
      case 'shopping-cart-props':
        return <ShoppingCartPropsDrillingApp />;
      case 'shopping-cart-context':
        return <ShoppingCartApp />;
      case 'form-management-props':
        return <FormManagementPropsDrillingApp />;
      case 'form-management-context':
        return <FormManagementApp />;
      case 'advanced-context':
        return <AdvancedContextExample />;
      default:
        return <PropsDrillingApp />;
    }
  };

  return (
    <div className="App">
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #dee2e6',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 20px 0', color: '#333' }}>
          React Context Module / Provider Pattern
        </h1>
        <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '16px' }}>
          다양한 Context Module 패턴 예제들을 비교하며 학습할 수 있는 데모 애플리케이션
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setActivePattern(pattern.id)}
              style={{
                padding: '12px 16px',
                backgroundColor: activePattern === pattern.id ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minWidth: '160px',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '16px' }}>{pattern.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.9 }}>
                  {pattern.description}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {pattern.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '0' }}>
        {renderPattern()}
      </div>
    </div>
  );
}

export default App;
