import React from 'react';
import ModalExampleBefore from './ModalExampleBefore';
import ModalExampleAfter from './ModalExampleAfter';

const ModalExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>Modal 컴포넌트 비교</h2>
      
      <div className="comparison">
        <ModalExampleBefore />
        <ModalExampleAfter />
      </div>
    </section>
  );
};

export default ModalExample;
