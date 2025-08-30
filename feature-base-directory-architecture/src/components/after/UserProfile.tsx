import React from 'react';
import UserProfileComponent from '../../features/user/components/UserProfile';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  return <UserProfileComponent userId={userId} />;
};

export default UserProfile;
