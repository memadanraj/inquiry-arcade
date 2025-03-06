import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { useQuery } from '@tanstack/react-query';
import { resultsService } from '@/services/resultsService';
import { Skeleton } from '@/components/ui/skeleton';

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

const ResultsList: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['results'],
    queryFn: () => resultsService.getAllResults(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const resultsData = isError ? mockResults : (data?.data || mockResults);

  return (
    <div className="space-y-4">
      {resultsData.map(result => (
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
    </div>
  );
};

export default ResultsList;
