
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bookmark, Award, Settings, FileText } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import MaterialCard from '@/components/study/MaterialCard';
import QuestionCard from '@/components/qa/QuestionCard';

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
  { name: 'Knowledge Sharer', description: 'Saved 5 study materials', icon: <BookMark className="h-5 w-5" /> },
  { name: 'Rising Star', description: 'Received 10 upvotes on your answers', icon: <Award className="h-5 w-5" /> },
];

const Profile = () => {
  // This would come from authentication system in a real app
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: undefined,
    joinDate: 'May 2023',
    reputation: 120,
    rank: 'Scholar',
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
        
        <Tabs defaultValue="saved">
          <TabsList className="mb-6">
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Saved Study Materials</h2>
              {savedMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedMaterials.map(material => (
                    <MaterialCard
                      key={material.id}
                      {...material}
                      onClick={() => console.log(`Clicked on ${material.title}`)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">You haven't saved any study materials yet.</p>
              )}
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Saved Questions</h2>
              {savedQuestions.length > 0 ? (
                <div className="space-y-4">
                  {savedQuestions.map(question => (
                    <QuestionCard
                      key={question.id}
                      {...question}
                      onClick={() => console.log(`Clicked on question ${question.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">You haven't saved any questions yet.</p>
              )}
            </section>
          </TabsContent>
          
          <TabsContent value="activity">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
              <p className="text-muted-foreground">
                Your questions, answers, and comments will appear here.
              </p>
              
              <div className="bg-accent/50 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start asking questions or answering to build your activity profile
                </p>
                <Button>Ask a Question</Button>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="achievements">
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
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;
