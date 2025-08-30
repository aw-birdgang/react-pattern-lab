import React from 'react';
import { CompoundAccordion } from '../components';

const AccordionExampleAfter: React.FC = () => {
  return (
    <div className="after">
      <h3>✅ Compound Components 패턴 사용 후</h3>
      <p>JSX로 자유롭게 구조를 정의할 수 있습니다.</p>
      <CompoundAccordion allowMultiple={false}>
        <CompoundAccordion.Item id="1">
          <CompoundAccordion.Header>
            React란 무엇인가요?
          </CompoundAccordion.Header>
          <CompoundAccordion.Content>
            <p>React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.</p>
            <p>컴포넌트 기반으로 UI를 구성할 수 있습니다.</p>
          </CompoundAccordion.Content>
        </CompoundAccordion.Item>
        
        <CompoundAccordion.Item id="2">
          <CompoundAccordion.Header>
            Compound Components 패턴이란?
          </CompoundAccordion.Header>
          <CompoundAccordion.Content>
            <p>Compound Components는 여러 컴포넌트가 함께 작동하여 완전한 UI를 구성하는 패턴입니다.</p>
            <ul>
              <li>유연성</li>
              <li>재사용성</li>
              <li>더 나은 API</li>
            </ul>
          </CompoundAccordion.Content>
        </CompoundAccordion.Item>
        
        <CompoundAccordion.Item id="3">
          <CompoundAccordion.Header>
            이 패턴의 장점은?
          </CompoundAccordion.Header>
          <CompoundAccordion.Content>
            <p>유연성, 재사용성, 그리고 더 나은 API를 제공합니다.</p>
          </CompoundAccordion.Content>
        </CompoundAccordion.Item>
      </CompoundAccordion>
    </div>
  );
};

export default AccordionExampleAfter;
