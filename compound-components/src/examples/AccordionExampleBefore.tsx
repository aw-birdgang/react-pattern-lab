import React from 'react';
import { BeforeAccordion as Accordion } from '../components';

const AccordionExampleBefore: React.FC = () => {
  // Accordion 데이터
  const accordionItems = [
    {
      id: '1',
      title: 'React란 무엇인가요?',
      content: 'React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.'
    },
    {
      id: '2',
      title: 'Compound Components 패턴이란?',
      content: 'Compound Components는 여러 컴포넌트가 함께 작동하여 완전한 UI를 구성하는 패턴입니다.'
    },
    {
      id: '3',
      title: '이 패턴의 장점은?',
      content: '유연성, 재사용성, 그리고 더 나은 API를 제공합니다.'
    }
  ];

  return (
    <div className="before">
      <h3>❌ Compound Components 패턴 사용 전</h3>
      <p>데이터 기반으로 렌더링되어 구조가 고정됩니다.</p>
      <Accordion items={accordionItems} allowMultiple={false} />
    </div>
  );
};

export default AccordionExampleBefore;
