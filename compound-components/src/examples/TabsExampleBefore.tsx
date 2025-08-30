import React, { useState } from 'react';

// 일반적인 Tabs 컴포넌트 (Compound Components 패턴 사용 전)
interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {activeTabData?.content}
      </div>
    </div>
  );
};

const TabsExampleBefore: React.FC = () => {
  const tabs = [
    {
      id: 'overview',
      label: '개요',
      content: (
        <div>
          <h4>React 개요</h4>
          <p>React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.</p>
          <ul>
            <li>컴포넌트 기반 아키텍처</li>
            <li>가상 DOM을 통한 효율적인 렌더링</li>
            <li>단방향 데이터 흐름</li>
          </ul>
        </div>
      )
    },
    {
      id: 'features',
      label: '주요 기능',
      content: (
        <div>
          <h4>React의 주요 기능</h4>
          <ul>
            <li>JSX를 통한 선언적 UI</li>
            <li>Hooks를 통한 상태 관리</li>
            <li>Context API를 통한 전역 상태 관리</li>
            <li>React Router를 통한 라우팅</li>
          </ul>
        </div>
      )
    },
    {
      id: 'ecosystem',
      label: '생태계',
      content: (
        <div>
          <h4>React 생태계</h4>
          <p>React는 풍부한 생태계를 가지고 있습니다:</p>
          <ul>
            <li>Next.js - SSR/SSG 프레임워크</li>
            <li>Redux - 상태 관리 라이브러리</li>
            <li>Material-UI - UI 컴포넌트 라이브러리</li>
            <li>React Query - 서버 상태 관리</li>
          </ul>
        </div>
      )
    },
    {
      id: 'disabled',
      label: '비활성화',
      content: <div>이 탭은 비활성화되어 있습니다.</div>,
      disabled: true
    }
  ];

  return (
    <div className="example-component">
      <Tabs 
        tabs={tabs} 
        defaultTab="overview"
        onTabChange={(tabId) => console.log('Tab changed:', tabId)}
      />
    </div>
  );
};

export default TabsExampleBefore;
