import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Search, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Flag,
  Eye,
  Star,
  Trash2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for demonstration
const mockQuestions = [
  { 
    id: 1, 
    title: 'How to solve quadratic equations?', 
    author: 'John Doe', 
    subject: 'Mathematics', 
    status: 'Approved', 
    date: '2023-07-12', 
    answers: 4, 
    reports: 0
  },
  { 
    id: 2, 
    title: 'Explain Newton\'s Third Law with examples', 
    author: 'Emily Wilson', 
    subject: 'Physics', 
    status: 'Approved', 
    date: '2023-08-05', 
    answers: 2, 
    reports: 0
  },
  { 
    id: 3, 
    title: 'How to normalize a database to 3NF?', 
    author: 'Robert Johnson', 
    subject: 'Database Management', 
    status: 'Pending', 
    date: '2023-09-15', 
    answers: 0, 
    reports: 0
  },
  { 
    id: 4, 
    title: 'What are the economic factors affecting market equilibrium?', 
    author: 'Jane Smith', 
    subject: 'Economics', 
    status: 'Approved', 
    date: '2023-09-18', 
    answers: 3, 
    reports: 1
  },
  { 
    id: 5, 
    title: 'Explain the role of enzymes in digestion', 
    author: 'Michael Brown', 
    subject: 'Biology', 
    status: 'Flagged', 
    date: '2023-09-22', 
    answers: 1, 
    reports: 2
  },
];

const mockAnswers = [
  { 
    id: 1, 
    questionId: 1, 
    content: 'To solve quadratic equations, you can use the quadratic formula...', 
    author: 'Robert Johnson', 
    date: '2023-07-13', 
    status: 'Approved', 
    votes: 12, 
    featured: true, 
    reports: 0
  },
  { 
    id: 2, 
    questionId: 1, 
    content: 'You can also solve by factoring if the equation is factorable...', 
    author: 'Jane Smith', 
    date: '2023-07-14', 
    status: 'Approved', 
    votes: 8, 
    featured: false, 
    reports: 0
  },
  { 
    id: 3, 
    questionId: 2, 
    content: 'Newton\'s Third Law states that for every action there is an equal and opposite reaction...', 
    author: 'Michael Brown', 
    date: '2023-08-06', 
    status: 'Approved', 
    votes: 15, 
    featured: true, 
    reports: 0
  },
  { 
    id: 4, 
    questionId: 4, 
    content: 'Market equilibrium is affected by supply and demand factors...', 
    author: 'Emily Wilson', 
    date: '2023-09-19', 
    status: 'Pending', 
    votes: 2, 
    featured: false, 
    reports: 0
  },
  { 
    id: 5, 
    questionId: 5, 
    content: 'This answer contains inappropriate content...', 
    author: 'Anonymous User', 
    date: '2023-09-23', 
    status: 'Flagged', 
    votes: 0, 
    featured: false, 
    reports: 3
  },
];

const QAManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('questions');
  const [activeSubTab, setActiveSubTab] = useState<string>('all');
  const [selectedQuestion, setSelectedQuestion] = useState<typeof mockQuestions[0] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<typeof mockAnswers[0] | null>(null);
  const [isViewQuestionOpen, setIsViewQuestionOpen] = useState(false);
  const [isViewAnswerOpen, setIsViewAnswerOpen] = useState(false);
  
  // Filter data based on search query and active tabs
  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         question.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeSubTab === 'all') return matchesSearch;
    if (activeSubTab === 'pending') return matchesSearch && question.status === 'Pending';
    if (activeSubTab === 'flagged') return matchesSearch && question.status === 'Flagged';
    if (activeSubTab === 'approved') return matchesSearch && question.status === 'Approved';
    
    return matchesSearch;
  });
  
  const filteredAnswers = mockAnswers.filter(answer => {
    const matchesSearch = answer.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         answer.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeSubTab === 'all') return matchesSearch;
    if (activeSubTab === 'pending') return matchesSearch && answer.status === 'Pending';
    if (activeSubTab === 'flagged') return matchesSearch && answer.status === 'Flagged';
    if (activeSubTab === 'approved') return matchesSearch && answer.status === 'Approved';
    if (activeSubTab === 'featured') return matchesSearch && answer.featured;
    
    return matchesSearch;
  });
  
  const handleQuestionAction = (question: typeof mockQuestions[0], action: string) => {
    setSelectedQuestion(question);
    if (action === 'view') {
      setIsViewQuestionOpen(true);
    }
    // Other actions for questions can be implemented here
  };
  
  const handleAnswerAction = (answer: typeof mockAnswers[0], action: string) => {
    setSelectedAnswer(answer);
    if (action === 'view') {
      setIsViewAnswerOpen(true);
    }
    // Other actions for answers can be implemented here
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'Pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'Flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Q&A Management</h2>
          <Badge variant="outline" className="ml-2">
            {mockQuestions.length} Questions, {mockAnswers.length} Answers
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Q&A..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-md border">
        <div className="p-4 flex gap-4">
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-2 mb-2">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="font-medium">1 Pending Question</h3>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <div className="bg-red-100 dark:bg-red-900 rounded-full p-2 mb-2">
              <Flag className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="font-medium">3 Reported Items</h3>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2 mb-2">
              <Star className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="font-medium">2 Featured Answers</h3>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="font-medium">7 Approved Items</h3>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="questions">
            <MessageSquare className="h-4 w-4 mr-2" />
            Questions
          </TabsTrigger>
          <TabsTrigger value="answers">
            <CheckCircle className="h-4 w-4 mr-2" />
            Answers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="space-y-6">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Table>
            <TableCaption>List of questions in the Q&A section.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Answers</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">{question.title}</TableCell>
                  <TableCell>{question.author}</TableCell>
                  <TableCell>{question.subject}</TableCell>
                  <TableCell>{getStatusBadge(question.status)}</TableCell>
                  <TableCell>{question.date}</TableCell>
                  <TableCell>{question.answers}</TableCell>
                  <TableCell>
                    {question.reports > 0 ? (
                      <Badge variant="destructive">{question.reports}</Badge>
                    ) : (
                      "0"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleQuestionAction(question, 'view')}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        {question.status === 'Pending' && (
                          <DropdownMenuItem onClick={() => handleQuestionAction(question, 'approve')}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {question.status !== 'Flagged' && (
                          <DropdownMenuItem onClick={() => handleQuestionAction(question, 'flag')}>
                            <Flag className="h-4 w-4 mr-2" />
                            Flag
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleQuestionAction(question, 'delete')}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="answers" className="space-y-6">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Table>
            <TableCaption>List of answers in the Q&A section.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Content Preview</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnswers.map((answer) => (
                <TableRow key={answer.id}>
                  <TableCell className="font-medium">
                    {answer.content.length > 50 ? answer.content.substring(0, 50) + '...' : answer.content}
                  </TableCell>
                  <TableCell>{answer.author}</TableCell>
                  <TableCell>{getStatusBadge(answer.status)}</TableCell>
                  <TableCell>{answer.date}</TableCell>
                  <TableCell>{answer.votes}</TableCell>
                  <TableCell>
                    {answer.featured ? (
                      <Badge className="bg-amber-500">Featured</Badge>
                    ) : (
                      "No"
                    )}
                  </TableCell>
                  <TableCell>
                    {answer.reports > 0 ? (
                      <Badge variant="destructive">{answer.reports}</Badge>
                    ) : (
                      "0"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAnswerAction(answer, 'view')}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        {answer.status === 'Pending' && (
                          <DropdownMenuItem onClick={() => handleAnswerAction(answer, 'approve')}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {!answer.featured ? (
                          <DropdownMenuItem onClick={() => handleAnswerAction(answer, 'feature')}>
                            <Star className="h-4 w-4 mr-2" />
                            Feature
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleAnswerAction(answer, 'unfeature')}>
                            Remove Feature
                          </DropdownMenuItem>
                        )}
                        {answer.status !== 'Flagged' && (
                          <DropdownMenuItem onClick={() => handleAnswerAction(answer, 'flag')}>
                            <Flag className="h-4 w-4 mr-2" />
                            Flag
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleAnswerAction(answer, 'delete')}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      
      {/* View Question Dialog */}
      <Dialog open={isViewQuestionOpen} onOpenChange={setIsViewQuestionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>View Question</DialogTitle>
            <DialogDescription>
              Review question details and take moderation actions.
            </DialogDescription>
          </DialogHeader>
          {selectedQuestion && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{selectedQuestion.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Posted by {selectedQuestion.author}</span>
                  <span>•</span>
                  <span>{selectedQuestion.date}</span>
                  <span>•</span>
                  <span>Subject: {selectedQuestion.subject}</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <p className="text-sm">
                  This is the full question content. In a real application, this would contain the detailed question that was posted by the user. It may include formatting, equations, and possibly images related to the subject matter.
                </p>
              </div>
              
              <div className="bg-muted/30 rounded-md p-4">
                <h4 className="font-medium mb-2">Moderation Actions</h4>
                <div className="flex gap-2">
                  {selectedQuestion.status === 'Pending' && (
                    <Button variant="outline" className="text-green-500 border-green-500">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  {selectedQuestion.status !== 'Flagged' && (
                    <Button variant="outline" className="text-yellow-500 border-yellow-500">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag
                    </Button>
                  )}
                  <Button variant="outline" className="text-destructive border-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              
              {selectedQuestion.reports > 0 && (
                <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-4 border border-red-200 dark:border-red-900">
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Reports ({selectedQuestion.reports})</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">
                      <p className="font-medium">Reported by: User123</p>
                      <p>Reason: Content violates community guidelines</p>
                      <p className="text-muted-foreground">Date: 2023-09-23</p>
                    </li>
                  </ul>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Answers ({selectedQuestion.answers})</h4>
                {mockAnswers
                  .filter(answer => answer.questionId === selectedQuestion.id)
                  .map(answer => (
                    <div key={answer.id} className="border rounded-md p-4 mb-2">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>By {answer.author}</span>
                          <span>•</span>
                          <span>{answer.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {answer.featured && (
                            <Badge className="bg-amber-500">Featured</Badge>
                          )}
                          {getStatusBadge(answer.status)}
                        </div>
                      </div>
                      <p className="text-sm">{answer.content}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewQuestionOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Answer Dialog */}
      <Dialog open={isViewAnswerOpen} onOpenChange={setIsViewAnswerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>View Answer</DialogTitle>
            <DialogDescription>
              Review answer details and take moderation actions.
            </DialogDescription>
          </DialogHeader>
          {selectedAnswer && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  Answer to: {
                    mockQuestions.find(q => q.id === selectedAnswer.questionId)?.title || 'Unknown Question'
                  }
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Posted by {selectedAnswer.author}</span>
                  <span>•</span>
                  <span>{selectedAnswer.date}</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <p className="text-sm">{selectedAnswer.content}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span>Votes:</span>
                  <Badge variant="outline">{selectedAnswer.votes}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span>Status:</span>
                  {getStatusBadge(selectedAnswer.status)}
                </div>
                <div className="flex items-center gap-1">
                  <span>Featured:</span>
                  {selectedAnswer.featured ? (
                    <Badge className="bg-amber-500">Yes</Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-md p-4">
                <h4 className="font-medium mb-2">Moderation Actions</h4>
                <div className="flex gap-2">
                  {selectedAnswer.status === 'Pending' && (
                    <Button variant="outline" className="text-green-500 border-green-500">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  {!selectedAnswer.featured ? (
                    <Button variant="outline" className="text-amber-500 border-amber-500">
                      <Star className="h-4 w-4 mr-2" />
                      Feature
                    </Button>
                  ) : (
                    <Button variant="outline">
                      Remove Feature
                    </Button>
                  )}
                  {selectedAnswer.status !== 'Flagged' && (
                    <Button variant="outline" className="text-yellow-500 border-yellow-500">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag
                    </Button>
                  )}
                  <Button variant="outline" className="text-destructive border-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              
              {selectedAnswer.reports > 0 && (
                <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-4 border border-red-200 dark:border-red-900">
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Reports ({selectedAnswer.reports})</h4>
                  <ul className="space-y-2">
                    <li className="text-sm">
                      <p className="font-medium">Reported by: User456</p>
                      <p>Reason: Inappropriate content</p>
                      <p className="text-muted-foreground">Date: 2023-09-23</p>
                    </li>
                    <li className="text-sm">
                      <p className="font-medium">Reported by: User789</p>
                      <p>Reason: Misleading information</p>
                      <p className="text-muted-foreground">Date: 2023-09-24</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewAnswerOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QAManagement;
