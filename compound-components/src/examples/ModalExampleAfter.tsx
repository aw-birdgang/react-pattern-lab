import React, { useState } from 'react';
import { CompoundModal } from '../components';

const ModalExampleAfter: React.FC = () => {
  const [compoundModalOpen, setCompoundModalOpen] = useState(false);

  return (
    <div className="after">
      <h3>✅ Compound Components 패턴 사용 후</h3>
      <p>유연한 구조로 원하는 대로 커스터마이징할 수 있습니다.</p>
      <button onClick={() => setCompoundModalOpen(true)}>
        Compound Modal 열기
      </button>
      
      <CompoundModal
        isOpen={compoundModalOpen}
        onClose={() => setCompoundModalOpen(false)}
      >
        <CompoundModal.Header>
          <h2>Compound Modal</h2>
        </CompoundModal.Header>
        <CompoundModal.Body>
          <p>이것은 Compound Components 패턴을 사용한 Modal입니다.</p>
          <p>원하는 대로 구조를 자유롭게 구성할 수 있습니다!</p>
        </CompoundModal.Body>
        <CompoundModal.Footer>
          <CompoundModal.ConfirmButton onClick={() => alert('확인 버튼이 클릭되었습니다!')}>
            확인
          </CompoundModal.ConfirmButton>
          <CompoundModal.CancelButton>
            취소
          </CompoundModal.CancelButton>
        </CompoundModal.Footer>
      </CompoundModal>
    </div>
  );
};

export default ModalExampleAfter;
