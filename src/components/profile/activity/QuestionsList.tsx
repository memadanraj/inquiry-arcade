
import React from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

// Mock data for demonstration
const mockQuestions = [
  {
    id: 1,
    title: "Understanding Newton's Third Law",
    subject: "Physics",
    date: "2023-09-15",
    votes: 12,
    answers: 3
  },
  {
    id: 2,
    title: "How to solve quadratic equations?",
    subject: "Mathematics",
    date: "2023-10-02",
    votes: 8,
    answers: 4
  }
];

const QuestionsList: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockQuestions.map(question => (
        <GlassCard key={question.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
          <div className="flex-1">
            <h3 className="font-medium text-lg">{question.title}</h3>
            <p className="text-muted-foreground text-sm">
              Subject: {question.subject} • Posted on {question.date}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <ArrowUp className="h-4 w-4" />
              <span>{question.votes}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>{question.answers}</span>
            </div>
            <Button variant="outline" size="sm">View</Button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default QuestionsList;
