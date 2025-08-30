import React, { createContext, useContext, ReactNode, useState } from 'react';

/**
 * Compound Components 패턴을 사용한 Accordion 컴포넌트
 * 
 * 장점:
 * - JSX로 자유롭게 구조 정의 가능
 * - 복잡한 내용을 HTML로 직접 표현 가능
 * - 각 아이템마다 다른 구조 사용 가능
 * - Context API를 통한 상태 공유
 * - 유연한 구조로 다양한 사용 사례 지원
 */

// Context 정의
interface AccordionContextType {
  openItems: string[];
  toggleItem: (itemId: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Context 사용을 위한 Hook
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

// 메인 Accordion 컴포넌트
interface AccordionProps {
  allowMultiple?: boolean;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ allowMultiple = false, children }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Accordion.Item 컴포넌트
interface AccordionItemProps {
  id: string;
  children: ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, children }) => {
  return (
    <div className="accordion-item" data-item-id={id}>
      {children}
    </div>
  );
};

// Accordion.Header 컴포넌트
interface AccordionHeaderProps {
  children: ReactNode;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children }) => {
  const { openItems, toggleItem } = useAccordionContext();
  const itemId = React.useContext(AccordionItemContext);

  if (!itemId) {
    throw new Error('AccordionHeader must be used within an AccordionItem');
  }

  const isOpen = openItems.includes(itemId);

  return (
    <button
      className={`accordion-header ${isOpen ? 'active' : ''}`}
      onClick={() => toggleItem(itemId)}
    >
      {children}
      <span className="accordion-icon">
        {isOpen ? '−' : '+'}
      </span>
    </button>
  );
};

// Accordion.Content 컴포넌트
interface AccordionContentProps {
  children: ReactNode;
}

const AccordionContent: React.FC<AccordionContentProps> = ({ children }) => {
  const { openItems } = useAccordionContext();
  const itemId = React.useContext(AccordionItemContext);

  if (!itemId) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  const isOpen = openItems.includes(itemId);

  if (!isOpen) return null;

  return (
    <div className="accordion-content">
      {children}
    </div>
  );
};

// AccordionItem 내부에서 itemId를 전달하기 위한 Context
const AccordionItemContext = React.createContext<string | undefined>(undefined);

// AccordionItem을 수정하여 Context를 제공
const AccordionItemWithContext: React.FC<AccordionItemProps> = ({ id, children }) => {
  return (
    <AccordionItemContext.Provider value={id}>
      <div className="accordion-item" data-item-id={id}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

// Compound Components를 하나의 객체로 내보내기
const CompoundAccordion = Object.assign(Accordion, {
  Item: AccordionItemWithContext,
  Header: AccordionHeader,
  Content: AccordionContent,
});

export default CompoundAccordion;
