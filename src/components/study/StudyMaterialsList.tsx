
import React, { useState } from 'react';
import MaterialCard, { MaterialCardProps, MaterialType } from './MaterialCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Filter, CrownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data
const generateMockMaterials = (): (MaterialCardProps & { isPremium?: boolean })[] => {
  const types: MaterialType[] = ['note', 'solution', 'oldQuestion', 'preboard'];
  const subjects = ['Mathematics', 'Computer Science', 'Business Communication', 'Economics', 'Finance'];
  const courses = ['BBA', 'BIM', 'BBS', '+2 Science', '+2 Management'];
  const tags = ['Calculus', 'Programming', 'Accounting', 'Management', 'Communication', 'Finance', 'Marketing'];
  
  return Array.from({ length: 12 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const usesSemester = ['BBA', 'BIM', 'BBS'].includes(courses[i % courses.length]);
    const isPremium = i % 3 === 0; // Every third item is premium
    
    return {
      id: `material-${i}`,
      title: `${subjects[i % subjects.length]} ${type === 'note' ? 'Notes' : type === 'solution' ? 'Solutions' : 'Questions'} ${i + 1}`,
      type,
      subject: subjects[i % subjects.length],
      course: courses[i % courses.length],
      semester: usesSemester ? `${(i % 8) + 1}` : undefined,
      year: !usesSemester ? `${2023 - (i % 3)}` : undefined,
      lastUpdated: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i % 6]} ${2023}`,
      popularity: Math.floor(Math.random() * 100),
      tags: Array.from(
        { length: 2 + Math.floor(Math.random() * 4) },
        (_, j) => tags[(i + j) % tags.length]
      ),
      isPremium,
    };
  });
};

interface StudyMaterialsListProps {
  initialFilter?: MaterialType | 'all';
}

const StudyMaterialsList = ({ initialFilter = 'all' }: StudyMaterialsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [materialType, setMaterialType] = useState<MaterialType | 'all'>(initialFilter);
  const [course, setCourse] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  
  const allMaterials = generateMockMaterials();
  
  // Apply filters
  const filteredMaterials = allMaterials.filter(material => {
    const matchesSearch = searchQuery === '' || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = materialType === 'all' || material.type === materialType;
    const matchesCourse = course === 'all' || material.course === course;
    const matchesPremium = !showPremiumOnly || material.isPremium;
    
    return matchesSearch && matchesType && matchesCourse && matchesPremium;
  });
  
  // Apply sorting
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.popularity - a.popularity;
    }
    // Default to recent
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });

  const uniqueCourses = Array.from(new Set(allMaterials.map(material => material.course)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map(course => (
                <SelectItem key={course} value={course}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showPremiumOnly ? "default" : "outline"}
            size="icon"
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            className="relative"
            title={showPremiumOnly ? "Show all content" : "Show premium content only"}
          >
            <CrownIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showPremiumOnly && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CrownIcon className="h-5 w-5 text-amber-500" />
            <p className="text-sm text-amber-700">
              Showing premium content only. Some premium content may require a subscription.
            </p>
          </div>
          <Button variant="outline" size="sm" className="text-amber-700 border-amber-300 hover:bg-amber-100">
            Get Premium
          </Button>
        </div>
      )}
      
      <Tabs defaultValue={materialType} onValueChange={(v) => setMaterialType(v as MaterialType | 'all')}>
        <TabsList className="bg-transparent h-auto p-0 mb-6">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-accent data-[state=active]:shadow-none h-9"
          >
            All Materials
          </TabsTrigger>
          <TabsTrigger 
            value="note" 
            className="data-[state=active]:bg-accent data-[state=active]:shadow-none h-9"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger 
            value="solution" 
            className="data-[state=active]:bg-accent data-[state=active]:shadow-none h-9"
          >
            Solutions
          </TabsTrigger>
          <TabsTrigger 
            value="oldQuestion" 
            className="data-[state=active]:bg-accent data-[state=active]:shadow-none h-9"
          >
            Old Questions
          </TabsTrigger>
          <TabsTrigger 
            value="preboard" 
            className="data-[state=active]:bg-accent data-[state=active]:shadow-none h-9"
          >
            Preboard
          </TabsTrigger>
        </TabsList>
        
        {['all', 'note', 'solution', 'oldQuestion', 'preboard'].map((type) => (
          <TabsContent key={type} value={type} className="m-0">
            {sortedMaterials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedMaterials.map((material) => (
                  <MaterialCard
                    key={material.id}
                    {...material}
                    isPremium={material.isPremium}
                    onClick={() => console.log(`Clicked on ${material.title}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No materials found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StudyMaterialsList;
