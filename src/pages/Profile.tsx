
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Bookmark, Award, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

// Import components
import ProfileHeader from '@/components/profile/ProfileHeader';
import SavedItems from '@/components/profile/SavedItems';
import ActivitySection from '@/components/profile/ActivitySection';
import AchievementsSection from '@/components/profile/AchievementsSection';

// Mock data for demonstration
const savedMaterials = [
  {
    id: '1',
    title: 'Introduction to Business Communication',
    type: 'note' as const,
    subject: 'Business Communication',
    course: 'BBA',
    semester: '1',
    lastUpdated: 'May 2023',
    popularity: 95,
    tags: ['Communication', 'Business', 'Introduction'],
  },
];

const savedQuestions = [
  {
    id: '1',
    title: 'How to calculate limits with L\'Hospital\'s rule?',
    content: 'I\'m having trouble understanding when and how to apply L\'Hospital\'s rule for limits. Can someone explain with examples?',
    author: {
      name: 'Alex Johnson',
    },
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    answerCount: 2,
    voteCount: 7,
    tags: ['Calculus', 'Mathematics', 'Limits'],
  },
];

const achievements = [
  { name: 'First Question', description: 'Asked your first question', icon: <MessageSquare className="h-5 w-5" /> },
  { name: 'Knowledge Sharer', description: 'Saved 5 study materials', icon: <Bookmark className="h-5 w-5" /> },
  { name: 'Rising Star', description: 'Received 10 upvotes on your answers', icon: <Award className="h-5 w-5" /> },
];

const Profile = () => {
  // Theme provider hook
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Detect system preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && !theme) {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  // This would come from authentication system in a real app
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: undefined,
    joinDate: 'May 2023',
    reputation: 120,
    rank: 'Scholar',
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        
        <ProfileHeader user={user} />
        
        <Tabs defaultValue="activity" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity">
            <ActivitySection userHasActivity={true} />
          </TabsContent>
          
          <TabsContent value="saved">
            <SavedItems savedMaterials={savedMaterials} savedQuestions={savedQuestions} />
          </TabsContent>
          
          <TabsContent value="achievements">
            <AchievementsSection achievements={achievements} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;
