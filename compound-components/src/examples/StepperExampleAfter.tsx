import React, { useState } from 'react';
import { Stepper } from '../components/after';

const StepperExampleAfter: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('설정이 완료되었습니다!');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="example-component">
      <Stepper initialStep={currentStep}>
        <Stepper.List>
          <Stepper.Step 
            id={0} 
            title="계정 정보" 
            description="기본 계정 정보를 입력하세요"
          />
          <Stepper.Step 
            id={1} 
            title="프로필 설정" 
            description="프로필 정보를 설정하세요"
          />
          <Stepper.Step 
            id={2} 
            title="완료" 
            description="설정이 완료되었습니다"
          />
        </Stepper.List>

        <Stepper.Content id={0}>
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
        </Stepper.Content>

        <Stepper.Content id={1}>
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
        </Stepper.Content>

        <Stepper.Content id={2}>
          <h4>🎉 설정 완료!</h4>
          <p>계정 설정이 성공적으로 완료되었습니다.</p>
          <p>이제 서비스를 이용하실 수 있습니다.</p>
        </Stepper.Content>



        <Stepper.Navigation>
          <Stepper.Button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            variant="secondary"
          >
            이전
          </Stepper.Button>
          <Stepper.Button 
            onClick={handleNext}
            variant="primary"
          >
            {currentStep === 2 ? '완료' : '다음'}
          </Stepper.Button>
        </Stepper.Navigation>
      </Stepper>
    </div>
  );
};

export default StepperExampleAfter;
