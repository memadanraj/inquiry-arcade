
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookText, MessageSquare, Trophy, Search } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import MaterialCard from '@/components/study/MaterialCard';
import QuestionCard from '@/components/qa/QuestionCard';
import { motion } from 'framer-motion';

// Mock data for demonstration
const featuredMaterials = [
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
  {
    id: '2',
    title: 'Calculus II Solutions & Explanations',
    type: 'solution' as const,
    subject: 'Mathematics',
    course: 'BIM',
    semester: '2',
    lastUpdated: 'Apr 2023',
    popularity: 87,
    tags: ['Calculus', 'Mathematics', 'Solutions'],
  },
];

const recentQuestions = [
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

const Home = () => {
  return (
    <div className="container py-8 md:py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8 md:py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Personal Study Companion
        </motion.h1>
        
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Access study materials, ask questions, and track your academic progress all in one place.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button size="lg" asChild>
            <Link to="/study-materials">
              <BookText className="mr-2 h-5 w-5" />
              Browse Study Materials
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link to="/q-and-a">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask a Question
            </Link>
          </Button>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            icon: <BookText className="h-10 w-10 text-blue-500" />, 
            title: 'Comprehensive Study Materials', 
            description: 'Access notes, solutions, and previous exam questions organized by course and semester.'
          },
          { 
            icon: <MessageSquare className="h-10 w-10 text-green-500" />, 
            title: 'Interactive Q&A Platform', 
            description: 'Ask questions, get answers from peers, and contribute to discussions.'
          },
          { 
            icon: <Trophy className="h-10 w-10 text-amber-500" />, 
            title: 'Achievement System', 
            description: 'Earn points, climb the leaderboard, and track your academic progress.'
          },
        ].map((feature, index) => (
          <GlassCard key={index} className="text-center p-8">
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </GlassCard>
        ))}
      </section>
      
      {/* Featured Study Materials */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Study Materials</h2>
          <Button variant="ghost" asChild>
            <Link to="/study-materials">
              View All
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredMaterials.map(material => (
            <MaterialCard
              key={material.id}
              {...material}
              onClick={() => console.log(`Clicked on ${material.title}`)}
            />
          ))}
        </div>
      </section>
      
      {/* Recent Questions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Questions</h2>
          <Button variant="ghost" asChild>
            <Link to="/q-and-a">
              View All
            </Link>
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentQuestions.map(question => (
            <QuestionCard
              key={question.id}
              {...question}
              onClick={() => console.log(`Clicked on question ${question.id}`)}
            />
          ))}
        </div>
      </section>
      
      {/* Get Started CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Enhance Your Learning?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join thousands of students who are already using Study Notes App to improve their academic performance.
        </p>
        <Button size="lg">
          Get Started
        </Button>
      </section>
    </div>
  );
};

export default Home;
