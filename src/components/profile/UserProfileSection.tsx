
import React, { useState } from 'react';
import { User } from '@/types/api';
import ProfileHeader from './ProfileHeader';
import ProfileEdit, { ProfileData } from './ProfileEdit';
import { toast } from 'sonner';

interface UserProfileSectionProps {
  user: User;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user.name,
    email: user.email,
    bio: localStorage.getItem('user_bio') || '',
    avatar: localStorage.getItem('user_avatar') || undefined,
  });

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (newData: ProfileData) => {
    // For now, we'll just update our local state and localStorage
    // In a real app, we would send this to the API
    setProfileData(newData);
    localStorage.setItem('user_bio', newData.bio || '');
    if (newData.avatar) {
      localStorage.setItem('user_avatar', newData.avatar);
    }
    
    // Update user info in localStorage to reflect the name change
    const storedUser = localStorage.getItem('user_info');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.name = newData.name;
      localStorage.setItem('user_info', JSON.stringify(parsedUser));
    }
    
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  // Prepare user data for ProfileHeader component
  const headerUserData = {
    name: profileData.name,
    email: profileData.email,
    avatar: profileData.avatar,
    joinDate: user.joinDate || 'January 2023',
    reputation: user.reputation || 120,
    rank: user.rank || 'Scholar',
  };

  return (
    <div>
      {isEditing ? (
        <ProfileEdit 
          initialData={profileData} 
          onCancel={handleCancel} 
          onSave={handleSave} 
        />
      ) : (
        <ProfileHeader 
          user={headerUserData} 
          onEditProfile={handleEditToggle} 
        />
      )}
    </div>
  );
};

export default UserProfileSection;
