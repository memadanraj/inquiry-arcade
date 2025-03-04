
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, Users, Award, Star, BarChart2, Settings, Search, Plus, Edit, Trash2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

// Mock leaderboard data
const mockLeaderboardUsers = [
  {
    id: 1,
    user: {
      name: "Sophia Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "sophia.chen@example.com",
    },
    rank: 1,
    points: 8750,
    badges: ["Gold Scholar", "Quiz Master", "Consistent Learner"],
    streak: 42,
    level: 9,
    activityScore: 98,
  },
  {
    id: 2,
    user: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=2",
      email: "marcus.johnson@example.com",
    },
    rank: 2,
    points: 7820,
    badges: ["Silver Scholar", "Helpful Peer", "Fast Learner"],
    streak: 29,
    level: 8,
    activityScore: 92,
  },
  {
    id: 3,
    user: {
      name: "Aisha Patel",
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "aisha.patel@example.com",
    },
    rank: 3,
    points: 7105,
    badges: ["Bronze Scholar", "Problem Solver", "Knowledge Seeker"],
    streak: 21,
    level: 7,
    activityScore: 89,
  },
  {
    id: 4,
    user: {
      name: "Devon Lewis",
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "devon.lewis@example.com",
    },
    rank: 4,
    points: 6890,
    badges: ["Quick Thinker", "Study Group Leader"],
    streak: 18,
    level: 7,
    activityScore: 85,
  },
  {
    id: 5,
    user: {
      name: "Mei Lin",
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "mei.lin@example.com",
    },
    rank: 5,
    points: 5975,
    badges: ["Dedicated Learner", "Team Player"],
    streak: 14,
    level: 6,
    activityScore: 82,
  },
];

// Mock badges data
const mockBadges = [
  {
    id: 1,
    name: "Gold Scholar",
    description: "Awarded to users who score 90% or above in 10 consecutive quizzes",
    icon: "trophy",
    type: "achievement",
    tier: "gold",
    pointsValue: 500,
    isActive: true,
  },
  {
    id: 2,
    name: "Silver Scholar",
    description: "Awarded to users who score 80% or above in 8 consecutive quizzes",
    icon: "award",
    type: "achievement",
    tier: "silver",
    pointsValue: 300,
    isActive: true,
  },
  {
    id: 3,
    name: "Bronze Scholar",
    description: "Awarded to users who score 70% or above in 5 consecutive quizzes",
    icon: "award",
    type: "achievement",
    tier: "bronze",
    pointsValue: 150,
    isActive: true,
  },
  {
    id: 4,
    name: "Consistent Learner",
    description: "Login and study for 30 consecutive days",
    icon: "calendar",
    type: "streak",
    tier: "gold",
    pointsValue: 400,
    isActive: true,
  },
  {
    id: 5,
    name: "Quiz Master",
    description: "Complete 100 quizzes with an average score of 85% or higher",
    icon: "brain",
    type: "milestone",
    tier: "gold",
    pointsValue: 500,
    isActive: true,
  },
];

const LeaderboardManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('rankings');
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [pointsForQuizzes, setPointsForQuizzes] = useState(10);
  const [pointsForAnswers, setPointsForAnswers] = useState(5);
  const [badgeData, setBadgeData] = useState(mockBadges);
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardUsers);

  const filteredUsers = leaderboardData.filter(user => 
    user.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Leaderboard Management</h2>
          <p className="text-muted-foreground">Manage user rankings, badges, and gamification settings</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="gamification-toggle" className="mr-2">Gamification</Label>
          <Switch 
            id="gamification-toggle" 
            checked={gamificationEnabled}
            onCheckedChange={setGamificationEnabled}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-md p-4 space-y-1 bg-blue-50 dark:bg-blue-900/20">
          <p className="text-sm text-muted-foreground">Total Users Ranked</p>
          <p className="text-2xl font-semibold">{leaderboardData.length}</p>
        </div>
        <div className="border rounded-md p-4 space-y-1 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-muted-foreground">Total Badges</p>
          <p className="text-2xl font-semibold">{badgeData.length}</p>
        </div>
        <div className="border rounded-md p-4 space-y-1 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-muted-foreground">Top User Points</p>
          <p className="text-2xl font-semibold">{leaderboardData[0]?.points || 0}</p>
        </div>
        <div className="border rounded-md p-4 space-y-1 bg-purple-50 dark:bg-purple-900/20">
          <p className="text-sm text-muted-foreground">Avg. Engagement</p>
          <p className="text-2xl font-semibold">
            {Math.round(
              leaderboardData.reduce((sum, user) => sum + user.activityScore, 0) / 
              leaderboardData.length
            )}%
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex overflow-x-auto pb-2">
          <div className="flex space-x-1 border-b w-full">
            <button
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'rankings' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('rankings')}
            >
              User Rankings
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'badges' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('badges')}
            >
              Badges & Achievements
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'settings' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Point Settings
            </button>
          </div>
        </div>
        
        {activeTab === 'rankings' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                Recalculate Rankings
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Streak</TableHead>
                    <TableHead>Badges</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                            {user.rank}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                              <img src={user.user.avatar} alt={user.user.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{user.user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{user.points}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{user.level}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.streak} days</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {user.badges.slice(0, 2).map((badge, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              >
                                {badge}
                              </span>
                            ))}
                            {user.badges.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                +{user.badges.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative grow max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search badges..."
                  className="pl-8"
                />
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Badge
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badgeData.map((badge) => (
                <GlassCard key={badge.id} className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-md ${
                        badge.tier === 'gold' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300' :
                        badge.tier === 'silver' ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300' :
                        'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300'
                      }`}>
                        {badge.icon === 'trophy' ? <Trophy className="h-5 w-5" /> : 
                         badge.icon === 'award' ? <Award className="h-5 w-5" /> : 
                         <Star className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.pointsValue} points</p>
                      </div>
                    </div>
                    <Switch 
                      checked={badge.isActive}
                      onCheckedChange={() => {
                        setBadgeData(
                          badgeData.map(b => 
                            b.id === badge.id ? {...b, isActive: !b.isActive} : b
                          )
                        );
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Point System Configuration</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quiz-points">Points per Quiz Completion</Label>
                    <Input 
                      id="quiz-points" 
                      type="number" 
                      value={pointsForQuizzes}
                      onChange={(e) => setPointsForQuizzes(parseInt(e.target.value))}
                    />
                    <p className="text-sm text-muted-foreground">
                      Base points awarded for completing a quiz
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="answer-points">Points per Q&A Answer</Label>
                    <Input 
                      id="answer-points" 
                      type="number" 
                      value={pointsForAnswers}
                      onChange={(e) => setPointsForAnswers(parseInt(e.target.value))}
                    />
                    <p className="text-sm text-muted-foreground">
                      Points awarded for answering a question
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Activity Multipliers</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Streak Multiplier</p>
                        <p className="text-sm text-muted-foreground">
                          Increase points based on daily login streak
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Correct Answer Bonus</p>
                        <p className="text-sm text-muted-foreground">
                          Extra points for correct quiz answers
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Perfect Score Bonus</p>
                        <p className="text-sm text-muted-foreground">
                          Bonus for 100% quiz scores
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">First Answer Bonus</p>
                        <p className="text-sm text-muted-foreground">
                          Bonus for being first to answer a question
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardManagement;
