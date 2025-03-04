
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestionsList from './activity/QuestionsList';
import AnswersList from './activity/AnswersList';
import ResultsList from './activity/ResultsList';
import EmptyActivity from './activity/EmptyActivity';

interface ActivitySectionProps {
  userHasActivity?: boolean;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ userHasActivity = true }) => {
  const [activeTab, setActiveTab] = useState("questions");

  if (!userHasActivity) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
        <p className="text-muted-foreground">
          Your questions, answers, comments, and exam results will appear here.
        </p>
        <EmptyActivity />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Your Activity</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="space-y-4">
          <QuestionsList />
        </TabsContent>
        
        <TabsContent value="answers" className="space-y-4">
          <AnswersList />
        </TabsContent>
        
        <TabsContent value="results" className="space-y-4">
          <ResultsList />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ActivitySection;
