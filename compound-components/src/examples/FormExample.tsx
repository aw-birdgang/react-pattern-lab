import React from 'react';
import FormExampleBefore from './FormExampleBefore';
import FormExampleAfter from './FormExampleAfter';

const FormExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>Form 컴포넌트 비교</h2>
      
      <div className="comparison">
        <FormExampleBefore />
        <FormExampleAfter />
      </div>
    </section>
  );
};

export default FormExample;
