import React from 'react';
import { User } from '../types';
import { formatDate } from '../../../shared/utils';
import Button from '../../../shared/components/Button';

interface UserProfileViewProps {
  user: User;
  onEdit: () => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onEdit }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar || 'https://via.placeholder.com/80'}
          alt={user.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
            {user.role}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">가입일</h3>
          <p className="text-gray-900">{formatDate(user.createdAt)}</p>
        </div>
        {user.lastLoginAt && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">마지막 로그인</h3>
            <p className="text-gray-900">{formatDate(user.lastLoginAt)}</p>
          </div>
        )}
        <Button
          onClick={onEdit}
          className="w-full"
        >
          프로필 편집
        </Button>
      </div>
    </div>
  );
};

export default UserProfileView;
