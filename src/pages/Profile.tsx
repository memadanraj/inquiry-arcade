
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Bookmark, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Import components
import UserProfileSection from '@/components/profile/UserProfileSection';
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
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UserProfileSection user={user} />
        
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
