
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings, Award, Trophy } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    joinDate: string;
    reputation: number;
    rank: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xl">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">Member since {user.joinDate}</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard className="flex items-center gap-4">
            <div className="bg-blue-50 text-blue-500 p-3 rounded-md">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.reputation}</h3>
              <p className="text-muted-foreground text-sm">Reputation Points</p>
            </div>
          </GlassCard>
          
          <GlassCard className="flex items-center gap-4">
            <div className="bg-amber-50 text-amber-500 p-3 rounded-md">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.rank}</h3>
              <p className="text-muted-foreground text-sm">Current Rank</p>
            </div>
          </GlassCard>
        </div>
        
        <div className="flex gap-2 self-end">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
