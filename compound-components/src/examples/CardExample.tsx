import React from 'react';
import CardExampleBefore from './CardExampleBefore';
import CardExampleAfter from './CardExampleAfter';

const CardExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>Card 컴포넌트</h2>
      <p>카드 레이아웃을 구현하는 Compound Components 패턴 예제입니다.</p>
      
      <div className="example-container">
        <div className="example-before">
          <h3>❌ 일반적인 방식</h3>
          <CardExampleBefore />
        </div>
        
        <div className="example-after">
          <h3>✅ Compound Components 패턴</h3>
          <CardExampleAfter />
        </div>
      </div>
    </section>
  );
};

export default CardExample;
