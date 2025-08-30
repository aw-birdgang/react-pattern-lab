import React from 'react';
import ListExampleBefore from './ListExampleBefore';
import ListExampleAfter from './ListExampleAfter';

const ListExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>List 컴포넌트</h2>
      <p>리스트 인터페이스를 구현하는 Compound Components 패턴 예제입니다.</p>
      
      <div className="example-container">
        <div className="example-before">
          <h3>❌ 일반적인 방식</h3>
          <ListExampleBefore />
        </div>
        
        <div className="example-after">
          <h3>✅ Compound Components 패턴</h3>
          <ListExampleAfter />
        </div>
      </div>
    </section>
  );
};

export default ListExample;
