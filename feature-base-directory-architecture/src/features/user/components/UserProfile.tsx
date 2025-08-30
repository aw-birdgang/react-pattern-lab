import React from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import UserProfileView from './UserProfileView';
import UserProfileForm from './UserProfileForm';
import Card from '../../../shared/components/Card';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const {
    user,
    loading,
    error,
    isEditing,
    formData,
    updateUser,
    startEditing,
    cancelEditing,
    updateFormData,
  } = useUserProfile(userId);

  const handleSave = () => {
    updateUser(formData);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-8">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        사용자를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <Card title="사용자 프로필" className="max-w-md mx-auto">
      {isEditing ? (
        <UserProfileForm
          formData={formData}
          onFormDataChange={updateFormData}
          onSave={handleSave}
          onCancel={cancelEditing}
          loading={loading}
        />
      ) : (
        <UserProfileView
          user={user}
          onEdit={startEditing}
        />
      )}
    </Card>
  );
};

export default UserProfile;
