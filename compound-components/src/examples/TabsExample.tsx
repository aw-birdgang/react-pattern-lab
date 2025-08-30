import React from 'react';
import TabsExampleBefore from './TabsExampleBefore';
import TabsExampleAfter from './TabsExampleAfter';

const TabsExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>Tabs 컴포넌트</h2>
      <p>탭 인터페이스를 구현하는 Compound Components 패턴 예제입니다.</p>
      
      <div className="example-container">
        <div className="example-before">
          <h3>❌ 일반적인 방식</h3>
          <TabsExampleBefore />
        </div>
        
        <div className="example-after">
          <h3>✅ Compound Components 패턴</h3>
          <TabsExampleAfter />
        </div>
      </div>
    </section>
  );
};

export default TabsExample;
