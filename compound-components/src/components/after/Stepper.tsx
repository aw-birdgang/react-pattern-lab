import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context 타입 정의
interface StepperContextType {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isStepComplete: (step: number) => boolean;
  setStepComplete: (step: number, complete: boolean) => void;
}

// Context 생성
const StepperContext = createContext<StepperContextType | undefined>(undefined);

// Hook으로 Context 사용
const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper');
  }
  return context;
};

// Props 타입 정의
interface StepperProps {
  children: ReactNode;
  initialStep?: number;
  className?: string;
}

interface StepProps {
  id: number;
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

interface StepListProps {
  children: ReactNode;
  className?: string;
}

interface StepContentProps {
  id: number;
  children: ReactNode;
  className?: string;
}

interface StepNavigationProps {
  children: ReactNode;
  className?: string;
}

interface StepButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

// 메인 Stepper 컴포넌트
const Stepper: React.FC<StepperProps> = ({ 
  children, 
  initialStep = 0, 
  className = '' 
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [totalSteps, setTotalSteps] = useState(0);

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = (step: number) => {
    return completedSteps.has(step);
  };

  const setStepComplete = (step: number, complete: boolean) => {
    const newCompletedSteps = new Set(completedSteps);
    if (complete) {
      newCompletedSteps.add(step);
    } else {
      newCompletedSteps.delete(step);
    }
    setCompletedSteps(newCompletedSteps);
  };

  // React.Children을 사용하여 총 스텝 수 계산
  React.useEffect(() => {
    const stepCount = React.Children.count(children);
    setTotalSteps(stepCount);
  }, [children]);

  return (
    <StepperContext.Provider 
      value={{ 
        currentStep, 
        totalSteps, 
        goToStep, 
        nextStep, 
        prevStep, 
        isStepComplete, 
        setStepComplete 
      }}
    >
      <div className={`stepper ${className}`}>
        {children}
      </div>
    </StepperContext.Provider>
  );
};

// StepList 컴포넌트
const StepList: React.FC<StepListProps> = ({ children, className = '' }) => {
  return (
    <div className={`step-list ${className}`}>
      {children}
    </div>
  );
};

// Step 컴포넌트
const Step: React.FC<StepProps> = ({ 
  id, 
  children, 
  className = '', 
  title, 
  description 
}) => {
  const { currentStep, isStepComplete } = useStepperContext();
  const isActive = currentStep === id;
  const isCompleted = isStepComplete(id);

  return (
    <div className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${className}`}>
      <div className="step-indicator">
        <div className="step-number">
          {isCompleted ? '✓' : id + 1}
        </div>
      </div>
      <div className="step-info">
        {title && <h3 className="step-title">{title}</h3>}
        {description && <p className="step-description">{description}</p>}
      </div>
    </div>
  );
};

// StepContent 컴포넌트
const StepContent: React.FC<StepContentProps> = ({ 
  id, 
  children, 
  className = '' 
}) => {
  const { currentStep } = useStepperContext();
  const isActive = currentStep === id;

  if (!isActive) return null;

  return (
    <div className={`step-content ${className}`}>
      {children}
    </div>
  );
};

// StepNavigation 컴포넌트
const StepNavigation: React.FC<StepNavigationProps> = ({ children, className = '' }) => {
  return (
    <div className={`step-navigation ${className}`}>
      {children}
    </div>
  );
};

// StepButton 컴포넌트
const StepButton: React.FC<StepButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children, 
  className = '', 
  variant = 'primary' 
}) => {
  return (
    <button
      className={`step-button step-button--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Compound Components 조합
const CompoundStepper = Object.assign(Stepper, {
  List: StepList,
  Step,
  Content: StepContent,
  Navigation: StepNavigation,
  Button: StepButton,
});

export default CompoundStepper;
