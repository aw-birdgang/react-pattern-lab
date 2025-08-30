import React, { useState } from 'react';
import { BeforeModal as Modal } from '../components';

const ModalExampleBefore: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="before">
      <h3>❌ Compound Components 패턴 사용 전</h3>
      <p>고정된 구조로 유연성이 떨어집니다.</p>
      <button onClick={() => setModalOpen(true)}>
        일반 Modal 열기
      </button>
      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="일반 Modal"
        content="이것은 일반적인 Modal 컴포넌트입니다. 구조가 고정되어 있어 유연성이 떨어집니다."
        footerText="확인"
        onConfirm={() => {
          alert('확인 버튼이 클릭되었습니다!');
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default ModalExampleBefore;
