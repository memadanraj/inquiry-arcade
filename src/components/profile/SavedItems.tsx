
import React from 'react';
import MaterialCard from '@/components/study/MaterialCard';
import QuestionCard from '@/components/qa/QuestionCard';

interface SavedItemsProps {
  savedMaterials: Array<{
    id: string;
    title: string;
    type: 'note' | 'solution' | 'oldQuestion' | 'preboard';
    subject: string;
    course: string;
    semester: string;
    lastUpdated: string;
    popularity: number;
    tags: string[];
  }>;
  savedQuestions: Array<{
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
    };
    createdAt: Date;
    answerCount: number;
    voteCount: number;
    tags: string[];
  }>;
}

const SavedItems: React.FC<SavedItemsProps> = ({ savedMaterials, savedQuestions }) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default SavedItems;
