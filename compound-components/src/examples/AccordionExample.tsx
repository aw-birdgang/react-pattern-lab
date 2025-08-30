import React from 'react';
import AccordionExampleBefore from './AccordionExampleBefore';
import AccordionExampleAfter from './AccordionExampleAfter';

const AccordionExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>Accordion 컴포넌트 비교</h2>
      
      <div className="comparison">
        <AccordionExampleBefore />
        <AccordionExampleAfter />
      </div>
    </section>
  );
};

export default AccordionExample;
