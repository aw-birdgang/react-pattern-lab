import React from 'react';
import MenuExampleBefore from './MenuExampleBefore';
import MenuExampleAfter from './MenuExampleAfter';

const MenuExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>Menu 컴포넌트</h2>
      <p>드롭다운 메뉴를 구현하는 Compound Components 패턴 예제입니다.</p>
      
      <div className="example-container">
        <div className="example-before">
          <h3>❌ 일반적인 방식</h3>
          <MenuExampleBefore />
        </div>
        
        <div className="example-after">
          <h3>✅ Compound Components 패턴</h3>
          <MenuExampleAfter />
        </div>
      </div>
    </section>
  );
};

export default MenuExample;
