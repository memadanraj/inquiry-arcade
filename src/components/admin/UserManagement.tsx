
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
import { MoreHorizontal, Search, UserPlus, Shield, Users } from 'lucide-react';

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', joinDate: '2023-04-12' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', status: 'Active', joinDate: '2023-05-18' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Admin', status: 'Active', joinDate: '2023-02-03' },
  { id: 4, name: 'Emily Wilson', email: 'emily@example.com', role: 'Student', status: 'Suspended', joinDate: '2023-07-22' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Student', status: 'Active', joinDate: '2023-08-10' },
];

// Role options for dropdown
const roleOptions = ['Student', 'Moderator', 'Admin', 'Super Admin'];

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddUser = () => {
    // In a real application, you would add the user to the database
    setIsAddUserOpen(false);
  };
  
  const handleEditUser = () => {
    // In a real application, you would update the user in the database
    setIsEditUserOpen(false);
  };
  
  const handleUserAction = (user: typeof mockUsers[0], action: string) => {
    setSelectedUser(user);
    if (action === 'edit') {
      setIsEditUserOpen(true);
    }
    // Additional actions like delete, suspend, etc. can be added here
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'Suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'Admin':
        return <Badge className="bg-blue-500">Admin</Badge>;
      case 'Moderator':
        return <Badge className="bg-purple-500">Moderator</Badge>;
      case 'Super Admin':
        return <Badge className="bg-amber-500">Super Admin</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">User Management</h2>
          <Badge variant="outline" className="ml-2">{mockUsers.length} Users</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddUserOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-md border">
        <div className="p-4 flex gap-4">
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/3">
            <Users className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">{mockUsers.length} Total Users</h3>
            <p className="text-sm text-muted-foreground">3 new this week</p>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/3">
            <Shield className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">2 Admins, 1 Moderator</h3>
            <p className="text-sm text-muted-foreground">Manage roles & permissions</p>
          </div>
          <div className="bg-muted/50 rounded-md p-4 flex flex-col items-center justify-center w-1/3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-2">1</div>
            <h3 className="font-medium">1 Suspended Account</h3>
            <p className="text-sm text-muted-foreground">Review & manage</p>
          </div>
        </div>
      </div>
      
      <Table>
        <TableCaption>A list of all users in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleUserAction(user, 'edit')}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUserAction(user, 'view')}>
                      View Activity
                    </DropdownMenuItem>
                    {user.status === 'Active' ? (
                      <DropdownMenuItem onClick={() => handleUserAction(user, 'suspend')}>
                        Suspend
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handleUserAction(user, 'activate')}>
                        Activate
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleUserAction(user, 'delete')}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. They will receive an email to set their password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                <Input id="first-name" placeholder="First name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                <Input id="last-name" placeholder="Last name" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="Email address" />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <select id="role" className="w-full p-2 border rounded-md">
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog (similar to Add User but pre-filled) */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Name</label>
                  <Input id="edit-name" defaultValue={selectedUser.name} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
                  <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-role" className="text-sm font-medium">Role</label>
                <select 
                  id="edit-role" 
                  className="w-full p-2 border rounded-md"
                  defaultValue={selectedUser.role}
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                <select 
                  id="edit-status" 
                  className="w-full p-2 border rounded-md"
                  defaultValue={selectedUser.status}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
