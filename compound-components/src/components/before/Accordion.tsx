import React, { useState } from 'react';

/**
 * 일반적인 Accordion 컴포넌트 (Compound Components 패턴 적용 전)
 * 
 * 문제점:
 * - 데이터 기반으로 렌더링되어 구조가 고정됨
 * - 복잡한 내용을 표현하기 어려움
 * - HTML 구조를 자유롭게 구성할 수 없음
 * - 모든 아이템이 동일한 구조를 가져야 함
 */
interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
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
    <div className="accordion">
      {items.map(item => (
        <div key={item.id} className="accordion-item">
          <button
            className={`accordion-header ${openItems.includes(item.id) ? 'active' : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            {item.title}
            <span className="accordion-icon">
              {openItems.includes(item.id) ? '−' : '+'}
            </span>
          </button>
          {openItems.includes(item.id) && (
            <div className="accordion-content">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
