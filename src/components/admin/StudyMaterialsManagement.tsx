
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
import { Textarea } from '@/components/ui/textarea';
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
  FilePlus, 
  FileText, 
  UploadCloud, 
  Eye,
  Pencil,
  Trash2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for demonstration
const mockStudyMaterials = [
  { 
    id: 1, 
    title: 'Introduction to Computer Science', 
    course: 'BCA', 
    semester: '1', 
    subject: 'Computer Fundamentals', 
    chapter: 'Introduction', 
    type: 'Note', 
    status: 'Published', 
    createdAt: '2023-06-15', 
    views: 235
  },
  { 
    id: 2, 
    title: 'Linear Algebra Concepts', 
    course: 'BIM', 
    semester: '2', 
    subject: 'Mathematics', 
    chapter: 'Matrices', 
    type: 'Note', 
    status: 'Published', 
    createdAt: '2023-07-22', 
    views: 189
  },
  { 
    id: 3, 
    title: 'Spring Final Examination 2022', 
    course: 'BBA', 
    semester: '3', 
    subject: 'Financial Management', 
    chapter: 'All', 
    type: 'Question', 
    status: 'Published', 
    createdAt: '2023-08-10', 
    views: 312
  },
  { 
    id: 4, 
    title: 'Database Management Systems', 
    course: 'BCA', 
    semester: '3', 
    subject: 'DBMS', 
    chapter: 'Normalization', 
    type: 'Note', 
    status: 'Draft', 
    createdAt: '2023-09-05', 
    views: 0
  },
  { 
    id: 5, 
    title: 'Marketing Management Midterm', 
    course: 'BBA', 
    semester: '4', 
    subject: 'Marketing', 
    chapter: 'All', 
    type: 'Solution', 
    status: 'Published', 
    createdAt: '2023-09-18', 
    views: 145
  },
];

// Options for dropdowns
const courseOptions = ['BCA', 'BIM', 'BBA', '+2 NEB'];
const semesterOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
const typeOptions = ['Note', 'Question', 'Solution'];
const statusOptions = ['Published', 'Draft', 'Archived'];

const StudyMaterialsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [isEditMaterialOpen, setIsEditMaterialOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<typeof mockStudyMaterials[0] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Filter materials based on search query and active tab
  const filteredMaterials = mockStudyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && material.type.toLowerCase() === activeTab.toLowerCase();
  });
  
  const handleAddMaterial = () => {
    // In a real application, you would add the material to the database
    setIsAddMaterialOpen(false);
  };
  
  const handleEditMaterial = () => {
    // In a real application, you would update the material in the database
    setIsEditMaterialOpen(false);
  };
  
  const handleMaterialAction = (material: typeof mockStudyMaterials[0], action: string) => {
    setSelectedMaterial(material);
    if (action === 'edit') {
      setIsEditMaterialOpen(true);
    }
    // Additional actions like delete, view, etc. can be added here
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'Draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'Archived':
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'Note':
        return <Badge className="bg-blue-500">Note</Badge>;
      case 'Question':
        return <Badge className="bg-purple-500">Question</Badge>;
      case 'Solution':
        return <Badge className="bg-amber-500">Solution</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Study Materials Management</h2>
          <Badge variant="outline" className="ml-2">{mockStudyMaterials.length} Materials</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddMaterialOpen(true)}>
            <FilePlus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-md border">
        <div className="p-4 flex gap-4">
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <FileText className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium">3 Notes</h3>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <FileText className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-medium">1 Question</h3>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <FileText className="h-8 w-8 text-amber-500 mb-2" />
            <h3 className="font-medium">1 Solution</h3>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/4">
            <Eye className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">881 Total Views</h3>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="note">Notes</TabsTrigger>
          <TabsTrigger value="question">Questions</TabsTrigger>
          <TabsTrigger value="solution">Solutions</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Table>
        <TableCaption>A list of all study materials in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Views</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMaterials.map((material) => (
            <TableRow key={material.id}>
              <TableCell className="font-medium">{material.title}</TableCell>
              <TableCell>{material.course} (Sem {material.semester})</TableCell>
              <TableCell>{material.subject}</TableCell>
              <TableCell>{getTypeBadge(material.type)}</TableCell>
              <TableCell>{getStatusBadge(material.status)}</TableCell>
              <TableCell>{material.createdAt}</TableCell>
              <TableCell>{material.views}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleMaterialAction(material, 'view')}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMaterialAction(material, 'edit')}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {material.status === 'Published' ? (
                      <DropdownMenuItem onClick={() => handleMaterialAction(material, 'unpublish')}>
                        Unpublish
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handleMaterialAction(material, 'publish')}>
                        Publish
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleMaterialAction(material, 'delete')}
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
      
      {/* Add Study Material Dialog */}
      <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Study Material</DialogTitle>
            <DialogDescription>
              Create and publish a new study material for students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input id="title" placeholder="Title of the material" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="course" className="text-sm font-medium">Course</label>
                <select id="course" className="w-full p-2 border rounded-md">
                  {courseOptions.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="semester" className="text-sm font-medium">Semester</label>
                <select id="semester" className="w-full p-2 border rounded-md">
                  {semesterOptions.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="Subject name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="chapter" className="text-sm font-medium">Chapter</label>
                <Input id="chapter" placeholder="Chapter name" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">Type</label>
                <select id="type" className="w-full p-2 border rounded-md">
                  {typeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <select id="status" className="w-full p-2 border rounded-md">
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                placeholder="Brief description of the material"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Files</label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop files here or click to browse</p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
                <input type="file" className="hidden" multiple />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMaterialOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMaterial}>Create Material</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Study Material Dialog */}
      <Dialog open={isEditMaterialOpen} onOpenChange={setIsEditMaterialOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Study Material</DialogTitle>
            <DialogDescription>
              Update the details of the study material.
            </DialogDescription>
          </DialogHeader>
          {selectedMaterial && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                <Input id="edit-title" defaultValue={selectedMaterial.title} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-course" className="text-sm font-medium">Course</label>
                  <select 
                    id="edit-course" 
                    className="w-full p-2 border rounded-md"
                    defaultValue={selectedMaterial.course}
                  >
                    {courseOptions.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-semester" className="text-sm font-medium">Semester</label>
                  <select 
                    id="edit-semester" 
                    className="w-full p-2 border rounded-md"
                    defaultValue={selectedMaterial.semester}
                  >
                    {semesterOptions.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-subject" className="text-sm font-medium">Subject</label>
                  <Input id="edit-subject" defaultValue={selectedMaterial.subject} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-chapter" className="text-sm font-medium">Chapter</label>
                  <Input id="edit-chapter" defaultValue={selectedMaterial.chapter} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-type" className="text-sm font-medium">Type</label>
                  <select 
                    id="edit-type" 
                    className="w-full p-2 border rounded-md"
                    defaultValue={selectedMaterial.type}
                  >
                    {typeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                  <select 
                    id="edit-status" 
                    className="w-full p-2 border rounded-md"
                    defaultValue={selectedMaterial.status}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="edit-description" 
                  placeholder="Brief description of the material"
                  rows={4}
                  defaultValue="This is a sample description for the selected study material."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Files</label>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between border-b pb-2 mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">material-document.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">additional-resources.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload More Files</label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files here or click to browse</p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                  <input type="file" className="hidden" multiple />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMaterialOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMaterial}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyMaterialsManagement;
