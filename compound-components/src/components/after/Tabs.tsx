import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context 타입 정의
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

// Context 생성
const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Hook으로 Context 사용
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs');
  }
  return context;
};

// Props 타입 정의
interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
  className?: string;
}

interface TabProps {
  id: string;
  children: ReactNode;
  className?: string;
}

interface TabListProps {
  children: ReactNode;
  className?: string;
}

interface TabTriggerProps {
  id: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface TabContentProps {
  id: string;
  children: ReactNode;
  className?: string;
}

// 메인 Tabs 컴포넌트
const Tabs: React.FC<TabsProps> = ({ 
  children, 
  defaultTab, 
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || '');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`tabs ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabList 컴포넌트
const TabList: React.FC<TabListProps> = ({ children, className = '' }) => {
  return (
    <div className={`tab-list ${className}`} role="tablist">
      {children}
    </div>
  );
};

// TabTrigger 컴포넌트
const TabTrigger: React.FC<TabTriggerProps> = ({ 
  id, 
  children, 
  className = '', 
  disabled = false 
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;

  return (
    <button
      className={`tab-trigger ${isActive ? 'active' : ''} ${className}`}
      onClick={() => !disabled && setActiveTab(id)}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
    >
      {children}
    </button>
  );
};

// TabContent 컴포넌트
const TabContent: React.FC<TabContentProps> = ({ 
  id, 
  children, 
  className = '' 
}) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === id;

  if (!isActive) return null;

  return (
    <div 
      className={`tab-content ${className}`}
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={id}
    >
      {children}
    </div>
  );
};

// Compound Components 조합
const CompoundTabs = Object.assign(Tabs, {
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
});

export default CompoundTabs;
