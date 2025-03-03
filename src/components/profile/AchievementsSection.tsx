
import React from 'react';
import { MessageSquare, Bookmark, Award } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface Achievement {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <GlassCard key={index} className="flex items-center gap-4">
            <div className="bg-accent p-3 rounded-full">
              {achievement.icon}
            </div>
            <div>
              <h3 className="font-semibold">{achievement.name}</h3>
              <p className="text-muted-foreground text-sm">{achievement.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
