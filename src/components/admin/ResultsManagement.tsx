
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { FileText, Plus, Trash2, Edit, Upload, Eye } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

// Mock results data
const mockResults = [
  {
    id: 1,
    title: "Spring Semester 2023 - BBA",
    semester: "Spring 2023",
    course: "BBA",
    publishDate: "2023-06-15",
    status: "published",
    fileUrl: "https://example.com/results/spring-bba-2023.pdf"
  },
  {
    id: 2,
    title: "Fall Semester 2023 - BIM",
    semester: "Fall 2023",
    course: "BIM",
    publishDate: "2023-12-20",
    status: "published",
    fileUrl: "https://example.com/results/fall-bim-2023.pdf"
  },
  {
    id: 3,
    title: "Midterm Examinations - BCA",
    semester: "Spring 2024",
    course: "BCA",
    publishDate: "2024-03-10",
    status: "draft",
    fileUrl: "https://example.com/results/midterm-bca-2024.pdf"
  }
];

const ResultsManagement = () => {
  const [results, setResults] = useState(mockResults);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newResult, setNewResult] = useState({
    title: '',
    semester: '',
    course: '',
    status: 'draft'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddResult = () => {
    // In a real implementation, this would include uploading the file to storage
    const newResultItem = {
      id: results.length + 1,
      ...newResult,
      publishDate: new Date().toISOString().split('T')[0],
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : ''
    };
    
    setResults([...results, newResultItem]);
    setIsAddDialogOpen(false);
    setNewResult({
      title: '',
      semester: '',
      course: '',
      status: 'draft'
    });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDeleteResult = (id: number) => {
    setResults(results.filter(result => result.id !== id));
  };

  const handlePublishResult = (id: number) => {
    setResults(results.map(result => 
      result.id === id ? {...result, status: 'published', publishDate: new Date().toISOString().split('T')[0]} : result
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Results Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Result
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Result</DialogTitle>
              <DialogDescription>
                Upload a new result PDF for students to view.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Result Title</Label>
                <Input 
                  id="title" 
                  value={newResult.title}
                  onChange={(e) => setNewResult({...newResult, title: e.target.value})}
                  placeholder="e.g., Spring Semester 2024 - BBA"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester/Term</Label>
                  <Input 
                    id="semester" 
                    value={newResult.semester}
                    onChange={(e) => setNewResult({...newResult, semester: e.target.value})}
                    placeholder="e.g., Spring 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input 
                    id="course" 
                    value={newResult.course}
                    onChange={(e) => setNewResult({...newResult, course: e.target.value})}
                    placeholder="e.g., BBA, BIM, BCA"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Result PDF File</Label>
                <div className="border border-input rounded-md p-2">
                  <Input 
                    id="file" 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                  />
                </div>
                {selectedFile && (
                  <p className="text-xs text-muted-foreground">
                    Selected file: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddResult} disabled={!newResult.title || !selectedFile}>
                Upload Result
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {results.map(result => (
          <GlassCard key={result.id} className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{result.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {result.course} • {result.semester}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      result.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {result.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    {result.status === 'published' && (
                      <span className="text-xs text-muted-foreground ml-2">
                        Published on {result.publishDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:self-start">
                <a
                  href={result.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </a>
                
                {result.status === 'draft' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 dark:border-green-700"
                    onClick={() => handlePublishResult(result.id)}
                  >
                    <Upload className="h-4 w-4" />
                    Publish
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-300 dark:hover:bg-amber-800 dark:border-amber-700"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 dark:border-red-700"
                  onClick={() => handleDeleteResult(result.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default ResultsManagement;
