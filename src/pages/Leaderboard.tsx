import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GlassCard from '@/components/ui/GlassCard';
import { Trophy, Award, Star, Medal, Crown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type LeaderboardPeriod = 'weekly' | 'monthly' | 'all-time';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  reputation: number;
  rank: string;
  contributionCount: number;
  badges: { gold: number; silver: number; bronze: number };
  streak: number;
  position: number;
}

// Mock data for leaderboard
const generateMockLeaderboardUsers = (count: number): LeaderboardUser[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    avatar: i < 5 ? undefined : undefined, // First 5 users have avatars
    reputation: Math.round(1000 - (i * 50) + (Math.random() * 30)),
    rank: i === 0 ? 'Grand Master' : i < 3 ? 'Master' : i < 10 ? 'Expert' : 'Scholar',
    contributionCount: Math.round(200 - (i * 12) + (Math.random() * 20)),
    badges: {
      gold: Math.max(0, 5 - Math.floor(i / 2)),
      silver: Math.max(0, 10 - Math.floor(i / 1.5)),
      bronze: Math.max(0, 15 - Math.floor(i / 1)),
    },
    streak: Math.round(30 - (i * 2) + (Math.random() * 5)),
    position: i + 1,
  }));
};

const Leaderboard = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');

  // Generate mock data for each time period
  const weeklyLeaderboard = generateMockLeaderboardUsers(20);
  const monthlyLeaderboard = generateMockLeaderboardUsers(20)
    .sort((a, b) => (b.reputation * 0.7 + b.contributionCount * 0.3) - 
                     (a.reputation * 0.7 + a.contributionCount * 0.3));
  const allTimeLeaderboard = generateMockLeaderboardUsers(20)
    .sort((a, b) => (b.reputation * 0.5 + b.badges.gold * 30 + b.badges.silver * 10 + b.badges.bronze * 3) - 
                     (a.reputation * 0.5 + a.badges.gold * 30 + a.badges.silver * 10 + a.badges.bronze * 3));

  const getLeaderboardData = () => {
    switch (period) {
      case 'weekly':
        return weeklyLeaderboard;
      case 'monthly':
        return monthlyLeaderboard;
      case 'all-time':
        return allTimeLeaderboard;
      default:
        return weeklyLeaderboard;
    }
  };

  const leaderboardData = getLeaderboardData();
  const topUsers = leaderboardData.slice(0, 3);
  const restUsers = leaderboardData.slice(3);

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Community Leaderboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Top contributors who are helping the community through sharing knowledge, 
            answering questions, and creating study materials.
          </p>
        </div>

        <Tabs 
          defaultValue="weekly" 
          value={period}
          onValueChange={(value) => setPeriod(value as LeaderboardPeriod)}
          className="mb-8"
        >
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="all-time">All Time</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {/* Top 3 Users */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-end mb-12">
          {topUsers.map((user, index) => {
            // Position 0 is 1st place (center), position 1 is 2nd place (left), position 2 is 3rd place (right)
            const displayOrder = [1, 0, 2];
            const displayIndex = displayOrder[index];
            
            const getPositionStyles = (position: number) => {
              switch (position) {
                case 0: // 1st place (center)
                  return "order-0 md:order-1 md:-mt-8 md:mb-8 z-10";
                case 1: // 2nd place (left)
                  return "order-1 md:order-0";
                case 2: // 3rd place (right)
                  return "order-2 md:order-2";
                default:
                  return "";
              }
            };
            
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={cn(
                  "flex-1 flex flex-col items-center",
                  getPositionStyles(displayIndex)
                )}
              >
                <div className={cn(
                  "p-3 rounded-full mb-3",
                  index === 0 ? "bg-amber-100 text-amber-500" : 
                  index === 1 ? "bg-slate-100 text-slate-500" : 
                  "bg-orange-100 text-orange-500"
                )}>
                  {index === 0 ? (
                    <Crown className="h-7 w-7" />
                  ) : index === 1 ? (
                    <Medal className="h-7 w-7" />
                  ) : (
                    <Award className="h-7 w-7" />
                  )}
                </div>
                
                <Avatar className={cn(
                  "border-4 mb-3",
                  index === 0 ? "border-amber-500 h-24 w-24" : 
                  index === 1 ? "border-slate-300 h-20 w-20" : 
                  "border-orange-400 h-20 w-20"
                )}>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{user.rank}</p>
                
                <div className="flex items-center gap-1 mb-1">
                  <Badge variant="outline" className="bg-primary/5 gap-1 font-normal">
                    <Trophy className="h-3 w-3" />
                    {user.reputation} pts
                  </Badge>
                </div>
                
                <div className="flex gap-1 text-xs">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                    {user.badges.gold} 🥇
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
                    {user.badges.silver} 🥈
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                    {user.badges.bronze} 🥉
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rest of the users in a table */}
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/40">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Rank</th>
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-center py-3 px-4 font-medium">Reputation</th>
                  <th className="text-center py-3 px-4 font-medium">Contributions</th>
                  <th className="text-center py-3 px-4 font-medium hidden md:table-cell">Badges</th>
                  <th className="text-center py-3 px-4 font-medium hidden md:table-cell">Streak</th>
                </tr>
              </thead>
              <tbody>
                {restUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border/40 last:border-0 hover:bg-accent/10 transition-colors">
                    <td className="py-3 px-4 align-middle">
                      <span className="bg-accent/30 w-8 h-8 rounded-full flex items-center justify-center">
                        {user.position}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-xs text-muted-foreground">{user.rank}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center align-middle">
                      <Badge variant="outline" className="font-normal">
                        {user.reputation}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center align-middle">
                      {user.contributionCount}
                    </td>
                    <td className="py-3 px-4 text-center align-middle hidden md:table-cell">
                      <div className="flex gap-1 justify-center">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                          {user.badges.gold}
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200 text-xs">
                          {user.badges.silver}
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                          {user.badges.bronze}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center align-middle hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        {user.streak} days
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
