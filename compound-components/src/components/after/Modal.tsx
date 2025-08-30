import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Compound Components 패턴을 사용한 Modal 컴포넌트
 * 
 * 장점:
 * - JSX로 자유롭게 구조 정의 가능
 * - 각 부분을 독립적으로 커스터마이징 가능
 * - 더 직관적이고 읽기 쉬운 코드
 * - Context API를 통한 상태 공유
 * - 유연한 구조로 다양한 사용 사례 지원
 */

// Context 정의
interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Context 사용을 위한 Hook
const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a Modal');
  }
  return context;
};

// 메인 Modal 컴포넌트
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="modal-overlay">
        <div className="modal">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

// Modal.Header 컴포넌트
interface ModalHeaderProps {
  children: ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
  const { onClose } = useModalContext();

  return (
    <div className="modal-header">
      {children}
      <button onClick={onClose} className="close-button">
        ×
      </button>
    </div>
  );
};

// Modal.Body 컴포넌트
interface ModalBodyProps {
  children: ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="modal-body">
      {children}
    </div>
  );
};

// Modal.Footer 컴포넌트
interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="modal-footer">
      {children}
    </div>
  );
};

// Modal.ConfirmButton 컴포넌트
interface ModalConfirmButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const ModalConfirmButton: React.FC<ModalConfirmButtonProps> = ({ 
  children, 
  onClick 
}) => {
  const { onClose } = useModalContext();

  const handleClick = () => {
    onClick?.();
    onClose();
  };

  return (
    <button onClick={handleClick} className="confirm-button">
      {children}
    </button>
  );
};

// Modal.CancelButton 컴포넌트
interface ModalCancelButtonProps {
  children: ReactNode;
}

const ModalCancelButton: React.FC<ModalCancelButtonProps> = ({ children }) => {
  const { onClose } = useModalContext();

  return (
    <button onClick={onClose} className="cancel-button">
      {children}
    </button>
  );
};

// Compound Components를 하나의 객체로 내보내기
const CompoundModal = Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  ConfirmButton: ModalConfirmButton,
  CancelButton: ModalCancelButton,
});

export default CompoundModal;
