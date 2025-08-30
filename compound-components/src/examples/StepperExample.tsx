import React from 'react';
import {StepperExampleAfter, StepperExampleBefore} from "./index";

const StepperExample: React.FC = () => {
  return (
    <section className="example-section">
      <h2>Stepper 컴포넌트</h2>
      <p>단계별 진행을 표시하는 Compound Components 패턴 예제입니다.</p>

      <div className="example-container">
        <div className="example-before">
          <h3>❌ 일반적인 방식</h3>
          <StepperExampleBefore />
        </div>

        <div className="example-after">
          <h3>✅ Compound Components 패턴</h3>
          <StepperExampleAfter />
        </div>
      </div>
    </section>
  );
};

export default StepperExample;
