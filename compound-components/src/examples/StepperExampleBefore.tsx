import React, { useState } from 'react';

// 일반적인 Stepper 컴포넌트 (Compound Components 패턴 사용 전)
interface Step {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
  isCompleted?: boolean;
}

interface StepperProps {
  steps: Step[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
}

const Stepper: React.FC<StepperProps> = ({ 
  steps, 
  initialStep = 0, 
  onStepChange,
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      onStepChange?.(step);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        newSet.add(currentStep);
        return newSet;
      });
      onStepChange?.(nextStepIndex);
    } else {
      onComplete?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      onStepChange?.(prevStepIndex);
    }
  };

  const isStepComplete = (stepIndex: number) => {
    return completedSteps.has(stepIndex);
  };

  return (
    <div className="stepper-container">
      {/* Step Indicators */}
      <div className="stepper-indicators">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`step-indicator ${currentStep === index ? 'active' : ''} ${isStepComplete(index) ? 'completed' : ''}`}
          >
            <div className="step-number">
              {isStepComplete(index) ? '✓' : index + 1}
            </div>
            <div className="step-info">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="stepper-content">
        {steps[currentStep]?.content}
      </div>

      {/* Navigation */}
      <div className="stepper-navigation">
        <button 
          className="step-button step-button--secondary"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          이전
        </button>
        <button 
          className="step-button step-button--primary"
          onClick={nextStep}
        >
          {currentStep === steps.length - 1 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
};

const StepperExampleBefore: React.FC = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: '계정 정보',
      description: '기본 계정 정보를 입력하세요',
      content: (
        <div>
          <h4>계정 정보 입력</h4>
          <form>
            <div>
              <label>이름:</label>
              <input type="text" placeholder="이름을 입력하세요" />
            </div>
            <div>
              <label>이메일:</label>
              <input type="email" placeholder="이메일을 입력하세요" />
            </div>
          </form>
        </div>
      )
    },
    {
      id: 2,
      title: '프로필 설정',
      description: '프로필 정보를 설정하세요',
      content: (
        <div>
          <h4>프로필 설정</h4>
          <form>
            <div>
              <label>닉네임:</label>
              <input type="text" placeholder="닉네임을 입력하세요" />
            </div>
            <div>
              <label>자기소개:</label>
              <textarea placeholder="자기소개를 입력하세요" rows={3} />
            </div>
          </form>
        </div>
      )
    },
    {
      id: 3,
      title: '완료',
      description: '설정이 완료되었습니다',
      content: (
        <div>
          <h4>🎉 설정 완료!</h4>
          <p>계정 설정이 성공적으로 완료되었습니다.</p>
          <p>이제 서비스를 이용하실 수 있습니다.</p>
        </div>
      )
    }
  ];

  return (
    <div className="example-component">
      <Stepper 
        steps={steps} 
        initialStep={0}
        onStepChange={(step) => console.log('Step changed:', step)}
        onComplete={() => alert('설정이 완료되었습니다!')}
      />
    </div>
  );
};

export default StepperExampleBefore;
