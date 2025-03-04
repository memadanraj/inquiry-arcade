import React, { useState } from 'react';
import { FileText, Star, BarChart2, ArrowUp, MessageSquare, FileIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const mockResults = [
  {
    id: 1,
    examName: "Midterm Examination",
    subject: "Computer Science",
    date: "2023-09-20",
    score: 85,
    totalMarks: 100,
    rank: 15,
    pdfUrl: "https://example.com/results/midterm-cs.pdf"
  },
  {
    id: 2,
    examName: "Final Examination",
    subject: "Mathematics",
    date: "2023-10-15",
    score: 92,
    totalMarks: 100,
    rank: 8,
    pdfUrl: "https://example.com/results/final-math.pdf"
  },
  {
    id: 3,
    examName: "Spring Semester Results",
    subject: "Business Management",
    date: "2023-12-05",
    score: 78,
    totalMarks: 100,
    rank: 22,
    pdfUrl: "https://example.com/results/spring-bba.pdf"
  }
];

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
        
        <div className="bg-accent/50 dark:bg-accent/30 rounded-lg p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No activity yet</h3>
          <p className="text-muted-foreground mb-4">
            Start asking questions, answering them or take exams to build your activity profile
          </p>
          <Button>Ask a Question</Button>
        </div>
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
        </TabsContent>
        
        <TabsContent value="answers" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="results" className="space-y-4">
          {mockResults.map(result => (
            <GlassCard key={result.id} className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                <div>
                  <h3 className="font-medium text-lg">{result.examName}</h3>
                  <p className="text-muted-foreground text-sm">
                    Subject: {result.subject} • Posted on {result.date}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    Rank: {result.rank}
                  </span>
                  <a 
                    href={result.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    View PDF
                  </a>
                </div>
              </div>
              
              <div className="bg-background dark:bg-accent/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Score</span>
                  <span className="text-sm font-medium">{result.score}/{result.totalMarks}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${(result.score / result.totalMarks) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <a 
                  href={result.pdfUrl}
                  download
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </a>
              </div>
            </GlassCard>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ActivitySection;
