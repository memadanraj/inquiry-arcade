
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from './UserManagement';
import StudyMaterialsManagement from './StudyMaterialsManagement';
import QAManagement from './QAManagement';
import ResultsManagement from './ResultsManagement';
import AdManagement from './AdManagement';
import SubscriptionManagement from './SubscriptionManagement';
import NotificationsManagement from './NotificationsManagement';
import LeaderboardManagement from './LeaderboardManagement';
import SecurityManagement from './SecurityManagement';

const AdminLayout: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, content, and system settings</p>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-9 w-full">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="study-materials">Materials</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="p-4 border rounded-md mt-4">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="study-materials" className="p-4 border rounded-md mt-4">
          <StudyMaterialsManagement />
        </TabsContent>
        
        <TabsContent value="qa" className="p-4 border rounded-md mt-4">
          <QAManagement />
        </TabsContent>
        
        <TabsContent value="results" className="p-4 border rounded-md mt-4">
          <ResultsManagement />
        </TabsContent>

        <TabsContent value="ads" className="p-4 border rounded-md mt-4">
          <AdManagement />
        </TabsContent>

        <TabsContent value="subscriptions" className="p-4 border rounded-md mt-4">
          <SubscriptionManagement />
        </TabsContent>

        <TabsContent value="notifications" className="p-4 border rounded-md mt-4">
          <NotificationsManagement />
        </TabsContent>

        <TabsContent value="leaderboard" className="p-4 border rounded-md mt-4">
          <LeaderboardManagement />
        </TabsContent>

        <TabsContent value="security" className="p-4 border rounded-md mt-4">
          <SecurityManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminLayout;
