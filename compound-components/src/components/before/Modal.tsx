import React from 'react';

/**
 * 일반적인 Modal 컴포넌트 (Compound Components 패턴 적용 전)
 * 
 * 문제점:
 * - 구조가 고정되어 있어 유연성이 떨어짐
 * - props가 많아져서 복잡해짐
 * - 커스터마이징이 어려움
 * - 모든 내용을 props로 전달해야 함
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  footerText?: string;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  footerText,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
        <div className="modal-footer">
          {footerText && (
            <button onClick={onConfirm} className="confirm-button">
              {footerText}
            </button>
          )}
          <button onClick={onClose} className="cancel-button">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
