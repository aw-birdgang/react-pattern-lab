import React from 'react';
import { UserProfileFormData } from '../types';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

interface UserProfileFormProps {
  formData: UserProfileFormData;
  onFormDataChange: (field: keyof UserProfileFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  formData,
  onFormDataChange,
  onSave,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="space-y-4">
      <Input
        label="이름"
        value={formData.name}
        onChange={(value) => onFormDataChange('name', value)}
        placeholder="이름을 입력하세요"
        required
      />
      
      <Input
        label="이메일"
        type="email"
        value={formData.email}
        onChange={(value) => onFormDataChange('email', value)}
        placeholder="이메일을 입력하세요"
        required
      />
      
      <div className="flex space-x-2">
        <Button
          onClick={onSave}
          loading={loading}
          disabled={loading}
        >
          저장
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default UserProfileForm;
