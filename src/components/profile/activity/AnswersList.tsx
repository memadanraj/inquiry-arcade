
import React from 'react';
import { ArrowUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

// Mock data for demonstration
const mockAnswers = [
  {
    id: 1,
    questionTitle: "What is the difference between JDK and JRE?",
    subject: "Computer Science",
    date: "2023-09-25",
    votes: 15,
    accepted: true
  },
  {
    id: 2,
    questionTitle: "How to balance chemical equations?",
    subject: "Chemistry",
    date: "2023-10-10",
    votes: 7,
    accepted: false
  }
];

const AnswersList: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockAnswers.map(answer => (
        <GlassCard key={answer.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
          <div className="flex-1">
            <h3 className="font-medium text-lg">{answer.questionTitle}</h3>
            <p className="text-muted-foreground text-sm">
              Subject: {answer.subject} • Answered on {answer.date}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <ArrowUp className="h-4 w-4" />
              <span>{answer.votes}</span>
            </div>
            {answer.accepted && (
              <div className="text-green-500 flex items-center gap-1">
                <Star className="h-4 w-4 fill-green-500" />
                <span className="text-xs font-semibold">Accepted</span>
              </div>
            )}
            <Button variant="outline" size="sm">View</Button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default AnswersList;
