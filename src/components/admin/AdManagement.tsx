
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { BarChart3, Image, Plus, Trash2, Edit, Eye, Info, Type, LayoutTemplate } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { toast } from 'sonner';

// Mock ad data
const mockAds = [
  {
    id: 1,
    title: "Premium Notes Promotion",
    type: "banner",
    location: "homepage",
    status: "active",
    clicks: 342,
    impressions: 5643,
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    content: "Upgrade to Premium and access exclusive study materials!",
    imageUrl: "https://example.com/ad1.jpg",
  },
  {
    id: 2,
    title: "Midterm Preparation Package",
    type: "sidebar",
    location: "study-materials",
    status: "active",
    clicks: 189,
    impressions: 2431,
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    content: "Get our special midterm preparation package - 30% off!",
    imageUrl: "https://example.com/ad2.jpg",
  },
  {
    id: 3,
    title: "Q&A Pro Features",
    type: "text",
    location: "q-and-a",
    status: "scheduled",
    clicks: 0,
    impressions: 0,
    startDate: "2024-04-01",
    endDate: "2024-05-01",
    content: "Ask unlimited questions with our new Q&A Pro subscription",
    imageUrl: null,
  },
];

// Ad types and locations
const adTypes = [
  { value: "banner", label: "Banner Ad" },
  { value: "sidebar", label: "Sidebar Ad" },
  { value: "text", label: "Text Ad" },
  { value: "popup", label: "Popup Ad" },
];

const adLocations = [
  { value: "homepage", label: "Homepage" },
  { value: "study-materials", label: "Study Materials" },
  { value: "q-and-a", label: "Q&A Section" },
  { value: "profile", label: "User Profile" },
  { value: "results", label: "Results Page" },
];

const AdManagement = () => {
  const [ads, setAds] = useState(mockAds);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  
  const [newAd, setNewAd] = useState({
    title: '',
    type: 'banner',
    location: 'homepage',
    status: 'draft',
    content: '',
    startDate: '',
    endDate: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddAd = () => {
    const newAdItem = {
      id: ads.length + 1,
      ...newAd,
      clicks: 0,
      impressions: 0,
      imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };
    
    setAds([...ads, newAdItem]);
    setIsAddDialogOpen(false);
    toast.success("New ad created successfully");
    
    // Reset form
    setNewAd({
      title: '',
      type: 'banner',
      location: 'homepage',
      status: 'draft',
      content: '',
      startDate: '',
      endDate: '',
    });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDeleteAd = (id: number) => {
    setAds(ads.filter(ad => ad.id !== id));
    toast.success("Ad deleted successfully");
  };

  const handleActivateAd = (id: number) => {
    setAds(ads.map(ad => 
      ad.id === id ? {...ad, status: 'active'} : ad
    ));
    toast.success("Ad activated successfully");
  };

  const handlePauseAd = (id: number) => {
    setAds(ads.map(ad => 
      ad.id === id ? {...ad, status: 'paused'} : ad
    ));
    toast.success("Ad paused successfully");
  };

  const viewAdPerformance = (id: number) => {
    setSelectedAdId(id);
    setIsPerformanceModalOpen(true);
  };

  const selectedAd = selectedAdId ? ads.find(ad => ad.id === selectedAdId) : null;

  const getFilteredAds = () => {
    if (activeFilter === "all") return ads;
    return ads.filter(ad => ad.status === activeFilter);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Ad Management</h2>
          <p className="text-muted-foreground">Create and manage ads across the platform</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ads</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Ad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Advertisement</DialogTitle>
                <DialogDescription>
                  Create a new ad to display across the platform
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Ad Title</Label>
                  <Input 
                    id="title" 
                    value={newAd.title}
                    onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                    placeholder="e.g., Premium Subscription Promotion"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Ad Type</Label>
                    <Select 
                      value={newAd.type}
                      onValueChange={(value) => setNewAd({...newAd, type: value})}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select ad type" />
                      </SelectTrigger>
                      <SelectContent>
                        {adTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Ad Location</Label>
                    <Select 
                      value={newAd.location}
                      onValueChange={(value) => setNewAd({...newAd, location: value})}
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select ad location" />
                      </SelectTrigger>
                      <SelectContent>
                        {adLocations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Ad Content</Label>
                  <Input 
                    id="content" 
                    value={newAd.content}
                    onChange={(e) => setNewAd({...newAd, content: e.target.value})}
                    placeholder="Ad text content"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      type="date"
                      value={newAd.startDate}
                      onChange={(e) => setNewAd({...newAd, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate" 
                      type="date"
                      value={newAd.endDate}
                      onChange={(e) => setNewAd({...newAd, endDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Ad Image</Label>
                  <div className="border border-input rounded-md p-2">
                    <Input 
                      id="image" 
                      type="file" 
                      accept="image/*" 
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

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="published" 
                    checked={newAd.status === 'active'}
                    onCheckedChange={(checked) => 
                      setNewAd({...newAd, status: checked ? 'active' : 'draft'})
                    }
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAd} disabled={!newAd.title || !newAd.content}>
                  Create Ad
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="list" className="flex items-center gap-1">
              <LayoutTemplate className="h-4 w-4" />
              <span className="hidden md:inline">List View</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Performance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4 mt-4">
            {getFilteredAds().map(ad => (
              <GlassCard key={ad.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div className={`p-3 rounded-md ${
                      ad.type === 'banner' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                      ad.type === 'sidebar' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' :
                      'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300'
                    }`}>
                      {ad.type === 'banner' ? <LayoutTemplate className="h-5 w-5" /> : 
                       ad.type === 'text' ? <Type className="h-5 w-5" /> : 
                       <Image className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ad.content?.substring(0, 100)}{ad.content?.length > 100 ? '...' : ''}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ad.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          ad.status === 'paused' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                          ad.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {ad.location.charAt(0).toUpperCase() + ad.location.slice(1).replace('-', ' ')}
                        </span>
                        {ad.startDate && (
                          <span className="text-xs text-muted-foreground">
                            {ad.startDate} to {ad.endDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 md:self-start">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => viewAdPerformance(ad.id)}
                    >
                      <Info className="h-4 w-4" />
                      <span className="hidden md:inline">Stats</span>
                    </Button>
                    
                    {ad.status !== 'active' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
                        onClick={() => handleActivateAd(ad.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="hidden md:inline">Activate</span>
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
                        onClick={() => handlePauseAd(ad.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="hidden md:inline">Pause</span>
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
                      onClick={() => handleDeleteAd(ad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </TabsContent>
          
          <TabsContent value="performance" className="mt-4">
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Ad Performance Overview</h3>
              <div className="h-64 flex items-center justify-center border rounded-md bg-gray-50 dark:bg-gray-800">
                <p className="text-muted-foreground">Ad performance charts will be displayed here</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-semibold">{ads.reduce((sum, ad) => sum + ad.clicks, 0)}</p>
                </div>
                <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm text-muted-foreground">Total Impressions</p>
                  <p className="text-2xl font-semibold">{ads.reduce((sum, ad) => sum + ad.impressions, 0)}</p>
                </div>
                <div className="p-4 border rounded-md bg-purple-50 dark:bg-purple-900/20">
                  <p className="text-sm text-muted-foreground">Click-through Rate</p>
                  <p className="text-2xl font-semibold">
                    {(ads.reduce((sum, ad) => sum + ad.clicks, 0) / Math.max(1, ads.reduce((sum, ad) => sum + ad.impressions, 0)) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Performance Modal */}
      <Dialog open={isPerformanceModalOpen} onOpenChange={setIsPerformanceModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Ad Performance Details</DialogTitle>
            <DialogDescription>
              {selectedAd ? selectedAd.title : 'Loading ad data...'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAd && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
                  <p className="text-sm text-muted-foreground">Clicks</p>
                  <p className="text-2xl font-semibold">{selectedAd.clicks}</p>
                </div>
                <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="text-2xl font-semibold">{selectedAd.impressions}</p>
                </div>
                <div className="p-4 border rounded-md bg-purple-50 dark:bg-purple-900/20">
                  <p className="text-sm text-muted-foreground">CTR</p>
                  <p className="text-2xl font-semibold">
                    {(selectedAd.clicks / Math.max(1, selectedAd.impressions) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
              
              <div className="h-64 flex items-center justify-center border rounded-md bg-gray-50 dark:bg-gray-800">
                <p className="text-muted-foreground">Detailed performance chart will be displayed here</p>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted px-4 py-2">
                  <h4 className="font-medium">Ad Details</h4>
                </div>
                <div className="p-4 space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p>{selectedAd.type.charAt(0).toUpperCase() + selectedAd.type.slice(1)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{selectedAd.location.charAt(0).toUpperCase() + selectedAd.location.slice(1).replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p>{selectedAd.status.charAt(0).toUpperCase() + selectedAd.status.slice(1)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Content</p>
                    <p>{selectedAd.content}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p>{selectedAd.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p>{selectedAd.endDate}</p>
                    </div>
                  </div>
                  
                  {selectedAd.imageUrl && (
                    <div>
                      <p className="text-sm text-muted-foreground">Preview</p>
                      <div className="mt-1 max-h-40 overflow-hidden rounded-md border">
                        <img src={selectedAd.imageUrl} alt="Ad preview" className="w-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdManagement;
