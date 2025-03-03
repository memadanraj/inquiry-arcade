
import React, { useState } from 'react';
import QuestionCard, { QuestionCardProps } from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Mock data
const generateMockQuestions = (): QuestionCardProps[] => {
  const subjects = ['Mathematics', 'Computer Science', 'Business Communication', 'Economics', 'Finance'];
  const users = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sara Williams', 'Mike Brown'];
  const tags = ['Calculus', 'Programming', 'Accounting', 'Management', 'Communication', 'Finance', 'Marketing'];
  
  return Array.from({ length: 8 }, (_, i) => {
    return {
      id: `question-${i}`,
      title: `How do I solve this ${subjects[i % subjects.length]} problem?`,
      content: `I'm having trouble understanding ${['the concept of', 'this equation for', 'the theory behind'][i % 3]} ${subjects[i % subjects.length]}. Can someone help explain it in simple terms?`,
      author: {
        name: users[i % users.length],
        avatar: undefined,
      },
      createdAt: new Date(Date.now() - (i * 86400000)), // days ago
      answerCount: Math.floor(Math.random() * 10),
      voteCount: Math.floor(Math.random() * 20) - 5,
      tags: Array.from(
        { length: 2 + Math.floor(Math.random() * 3) },
        (_, j) => tags[(i + j) % tags.length]
      ),
    };
  });
};

const QuestionList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');
  
  const allQuestions = generateMockQuestions();
  
  // Apply filters
  const filteredQuestions = allQuestions.filter(question => {
    const matchesSearch = searchQuery === '' || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });
  
  // Apply sorting
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.voteCount - a.voteCount;
    }
    if (sortBy === 'answers') {
      return b.answerCount - a.answerCount;
    }
    // Default to newest
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="votes">Most Votes</SelectItem>
              <SelectItem value="answers">Most Answers</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        </div>
      </div>
      
      {sortedQuestions.length > 0 ? (
        <div className="space-y-4">
          {sortedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              {...question}
              onClick={() => console.log(`Clicked on question ${question.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No questions found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search query or be the first to ask a question
          </p>
          <Button>Ask a Question</Button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
