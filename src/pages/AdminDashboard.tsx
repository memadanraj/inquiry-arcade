
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookText, 
  FileQuestion, 
  Award, 
  Bell, 
  Settings, 
  Shield, 
  BarChart2 
} from 'lucide-react';
import { useTheme } from 'next-themes';
import GlassCard from '@/components/ui/GlassCard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { theme, setTheme } = useTheme();

  // Simple metrics for the dashboard
  const metrics = [
    { label: "Total Users", value: "1,234", icon: <Users className="h-5 w-5" />, color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" },
    { label: "Study Materials", value: "328", icon: <BookText className="h-5 w-5" />, color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" },
    { label: "Q&A Posts", value: "967", icon: <FileQuestion className="h-5 w-5" />, color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" },
    { label: "Results Posted", value: "45", icon: <Award className="h-5 w-5" />, color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300" },
  ];

  // Mock recent activities for the dashboard
  const recentActivities = [
    { action: "Posted new result", subject: "Final Examination - BBA", timestamp: "10 minutes ago", user: "Admin" },
    { action: "Approved new study material", subject: "Marketing Strategies", timestamp: "2 hours ago", user: "ContentMod" },
    { action: "Deleted spam question", subject: "Irrelevant post", timestamp: "3 hours ago", user: "SuperAdmin" },
    { action: "Added new admin", subject: "User: professor_smith", timestamp: "Yesterday", user: "SuperAdmin" },
    { action: "Posted system notification", subject: "Upcoming maintenance", timestamp: "2 days ago", user: "Admin" },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your educational platform</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Admin profile and quick actions would go here */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <GlassCard 
            key={index} 
            className="p-4"
            hoverEffect={false}
          >
            <div className="flex items-center gap-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                {metric.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3 lg:col-span-2">
          <GlassCard className="p-0 overflow-hidden" hoverEffect={false}>
            <div className="p-4 border-b border-border/40">
              <h3 className="font-medium">Admin Navigation</h3>
            </div>
            <nav className="p-2">
              <ul className="space-y-1">
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent/50 font-medium">
                    <BarChart2 className="h-4 w-4" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/30 text-muted-foreground hover:text-foreground transition-colors">
                    <Users className="h-4 w-4" />
                    User Management
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/30 text-muted-foreground hover:text-foreground transition-colors">
                    <BookText className="h-4 w-4" />
                    Study Materials
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/30 text-muted-foreground hover:text-foreground transition-colors">
                    <FileQuestion className="h-4 w-4" />
                    Q&A Management
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/30 text-muted-foreground hover:text-foreground transition-colors">
                    <Award className="h-4 w-4" />
                    Results & Grades
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/30 text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/30 text-muted-foreground hover:text-foreground transition-colors">
                    <Shield className="h-4 w-4" />
                    Roles & Permissions
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/30 text-muted-foreground hover:text-foreground transition-colors">
                    <Settings className="h-4 w-4" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </GlassCard>
        </div>
        
        <div className="md:col-span-9 lg:col-span-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <GlassCard className="p-0 overflow-hidden" hoverEffect={false}>
                <div className="p-4 border-b border-border/40">
                  <h3 className="font-medium">Recent Activities</h3>
                </div>
                <div className="p-4">
                  <ul className="divide-y divide-border/40">
                    {recentActivities.map((activity, index) => (
                      <li key={index} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium">{activity.action}</span>
                            <p className="text-muted-foreground text-sm">{activity.subject}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                            <p className="text-xs font-medium">{activity.user}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Additional stats and charts would go here */}
                <GlassCard className="p-4 min-h-[260px]" hoverEffect={false}>
                  <h3 className="font-medium mb-4">User Engagement</h3>
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    <p>Charts and analytics will be displayed here</p>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 min-h-[260px]" hoverEffect={false}>
                  <h3 className="font-medium mb-4">Content Distribution</h3>
                  <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                    <p>Charts and analytics will be displayed here</p>
                  </div>
                </GlassCard>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <GlassCard className="p-4" hoverEffect={false}>
                <h3 className="font-medium mb-4">User Management</h3>
                <p className="text-muted-foreground">
                  User management interface will be implemented here.
                </p>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="content">
              <GlassCard className="p-4" hoverEffect={false}>
                <h3 className="font-medium mb-4">Content Management</h3>
                <p className="text-muted-foreground">
                  Content management interface for study materials and Q&A will be implemented here.
                </p>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="results">
              <GlassCard className="p-4" hoverEffect={false}>
                <h3 className="font-medium mb-4">Results Management</h3>
                <p className="text-muted-foreground">
                  Interface for uploading and managing university/college results as PDF files will be implemented here.
                </p>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
