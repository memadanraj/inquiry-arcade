
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActivitySection: React.FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
      <p className="text-muted-foreground">
        Your questions, answers, and comments will appear here.
      </p>
      
      <div className="bg-accent/50 dark:bg-accent/30 rounded-lg p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No activity yet</h3>
        <p className="text-muted-foreground mb-4">
          Start asking questions or answering to build your activity profile
        </p>
        <Button>Ask a Question</Button>
      </div>
    </section>
  );
};

export default ActivitySection;
