
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from './UserManagement';
import StudyMaterialsManagement from './StudyMaterialsManagement';
import QAManagement from './QAManagement';
import ResultsManagement from './ResultsManagement';

const AdminLayout: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, content, and system settings</p>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="study-materials">Study Materials</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default AdminLayout;
