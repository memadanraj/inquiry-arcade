
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
import { 
  Bell, 
  Calendar, 
  ChevronsUpDown, 
  Clock, 
  FileText, 
  MessageCircle, 
  Plus, 
  Send, 
  Settings, 
  Sparkles, 
  Trash2, 
  Upload, 
  Users,
  Eye,
  Edit
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { toast } from 'sonner';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: "New Study Materials Published",
    content: "We've just published 10 new study materials for BBA 1st Semester. Check them out now!",
    type: "announcement",
    targetAudience: "all",
    priority: "normal",
    status: "sent",
    sentAt: "2024-03-15T14:30:00Z",
    deliveredCount: 2453,
    openCount: 1564,
    clickCount: 782,
  },
  {
    id: 2,
    title: "Reminder: Premium Features Available",
    content: "Don't forget to check out our premium features to enhance your learning experience!",
    type: "reminder",
    targetAudience: "free_users",
    priority: "high",
    status: "sent",
    sentAt: "2024-03-10T09:15:00Z",
    deliveredCount: 1834,
    openCount: 1102,
    clickCount: 513,
  },
  {
    id: 3,
    title: "New Solution Guides for Math 101",
    content: "Step-by-step solution guides for Math 101 are now available for premium users!",
    type: "update",
    targetAudience: "premium",
    priority: "normal",
    status: "draft",
    sentAt: null,
    deliveredCount: 0,
    openCount: 0,
    clickCount: 0,
  },
  {
    id: 4,
    title: "Scheduled Maintenance Notice",
    content: "The platform will be undergoing maintenance on Saturday from 2AM to 4AM UTC. Some features may be temporarily unavailable.",
    type: "system",
    targetAudience: "all",
    priority: "high",
    status: "scheduled",
    scheduledFor: "2024-04-01T02:00:00Z",
    sentAt: null,
    deliveredCount: 0,
    openCount: 0,
    clickCount: 0,
  },
];

// Notification types and audience options
const notificationTypes = [
  { value: "announcement", label: "Announcement" },
  { value: "reminder", label: "Reminder" },
  { value: "update", label: "Content Update" },
  { value: "system", label: "System Notice" },
  { value: "achievement", label: "Achievement" },
];

const audienceOptions = [
  { value: "all", label: "All Users" },
  { value: "free_users", label: "Free Users Only" },
  { value: "premium", label: "Premium Users Only" },
  { value: "inactive", label: "Inactive Users" },
  { value: "new", label: "New Users (< 30 days)" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
];

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const [newNotification, setNewNotification] = useState({
    title: '',
    content: '',
    type: 'announcement',
    targetAudience: 'all',
    priority: 'normal',
    status: 'draft',
    isScheduled: false,
    scheduledDate: '',
    scheduledTime: '',
    sendPush: true,
    sendEmail: false,
    showInApp: true,
  });

  const [settings, setSettings] = useState({
    enablePushNotifications: true,
    enableEmailNotifications: true,
    enableInAppNotifications: true,
    dailyNotificationLimit: 5,
    allowUserCustomization: true,
    digestMode: false,
    digestFrequency: 'daily',
  });

  const handleAddNotification = () => {
    const scheduledForDate = newNotification.isScheduled 
      ? `${newNotification.scheduledDate}T${newNotification.scheduledTime}:00Z` 
      : null;
      
    const newNotificationItem = {
      id: notifications.length + 1,
      title: newNotification.title,
      content: newNotification.content,
      type: newNotification.type,
      targetAudience: newNotification.targetAudience,
      priority: newNotification.priority,
      status: newNotification.isScheduled ? 'scheduled' : 'draft',
      scheduledFor: scheduledForDate,
      sentAt: null,
      deliveredCount: 0,
      openCount: 0,
      clickCount: 0,
    };
    
    setNotifications([...notifications, newNotificationItem]);
    setIsCreateDialogOpen(false);
    toast.success("Notification created successfully");
    
    // Reset form
    setNewNotification({
      title: '',
      content: '',
      type: 'announcement',
      targetAudience: 'all',
      priority: 'normal',
      status: 'draft',
      isScheduled: false,
      scheduledDate: '',
      scheduledTime: '',
      sendPush: true,
      sendEmail: false,
      showInApp: true,
    });
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.success("Notification deleted successfully");
  };

  const handleSendNotification = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {
        ...notification, 
        status: 'sent', 
        sentAt: new Date().toISOString(),
        deliveredCount: Math.floor(Math.random() * 3000) + 1000
      } : notification
    ));
    toast.success("Notification sent successfully");
  };

  const handleSaveSettings = () => {
    setIsSettingsDialogOpen(false);
    toast.success("Notification settings updated successfully");
  };

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(notification => notification.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Notifications Management</h2>
          <p className="text-muted-foreground">Create and manage system notifications</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Notification Settings</DialogTitle>
                <DialogDescription>
                  Configure global notification settings
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enablePush">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Enable push notifications for all users</p>
                  </div>
                  <Switch 
                    id="enablePush" 
                    checked={settings.enablePushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, enablePushNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableEmail">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send important notifications via email</p>
                  </div>
                  <Switch 
                    id="enableEmail" 
                    checked={settings.enableEmailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, enableEmailNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableInApp">In-App Notifications</Label>
                    <p className="text-xs text-muted-foreground">Show notifications within the application</p>
                  </div>
                  <Switch 
                    id="enableInApp" 
                    checked={settings.enableInAppNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, enableInAppNotifications: checked})
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dailyLimit">Daily Notification Limit</Label>
                  <Input 
                    id="dailyLimit" 
                    type="number"
                    min="1"
                    max="20"
                    value={settings.dailyNotificationLimit}
                    onChange={(e) => setSettings({...settings, dailyNotificationLimit: parseInt(e.target.value)})}
                  />
                  <p className="text-xs text-muted-foreground">Maximum notifications a user can receive per day</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowCustomization">User Customization</Label>
                    <p className="text-xs text-muted-foreground">Allow users to customize their notification preferences</p>
                  </div>
                  <Switch 
                    id="allowCustomization" 
                    checked={settings.allowUserCustomization}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, allowUserCustomization: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="digestMode">Digest Mode</Label>
                    <p className="text-xs text-muted-foreground">Bundle multiple notifications together</p>
                  </div>
                  <Switch 
                    id="digestMode" 
                    checked={settings.digestMode}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, digestMode: checked})
                    }
                  />
                </div>
                
                {settings.digestMode && (
                  <div className="space-y-2">
                    <Label htmlFor="digestFrequency">Digest Frequency</Label>
                    <Select 
                      value={settings.digestFrequency}
                      onValueChange={(value) => setSettings({...settings, digestFrequency: value})}
                    >
                      <SelectTrigger id="digestFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>
                  Create a notification to send to users
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Notification Title</Label>
                  <Input 
                    id="title" 
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    placeholder="e.g., New Study Materials Available"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Notification Content</Label>
                  <Textarea 
                    id="content" 
                    value={newNotification.content}
                    onChange={(e) => setNewNotification({...newNotification, content: e.target.value})}
                    placeholder="Enter the notification message"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Notification Type</Label>
                    <Select 
                      value={newNotification.type}
                      onValueChange={(value) => setNewNotification({...newNotification, type: value})}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select 
                      value={newNotification.targetAudience}
                      onValueChange={(value) => setNewNotification({...newNotification, targetAudience: value})}
                    >
                      <SelectTrigger id="audience">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newNotification.priority}
                      onValueChange={(value) => setNewNotification({...newNotification, priority: value})}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="scheduled" 
                      checked={newNotification.isScheduled}
                      onCheckedChange={(checked) => 
                        setNewNotification({...newNotification, isScheduled: checked})
                      }
                    />
                    <Label htmlFor="scheduled">Schedule for later</Label>
                  </div>
                  
                  {newNotification.isScheduled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                      <div className="space-y-2">
                        <Label htmlFor="scheduledDate">Date</Label>
                        <Input 
                          id="scheduledDate" 
                          type="date"
                          value={newNotification.scheduledDate}
                          onChange={(e) => setNewNotification({...newNotification, scheduledDate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scheduledTime">Time</Label>
                        <Input 
                          id="scheduledTime" 
                          type="time"
                          value={newNotification.scheduledTime}
                          onChange={(e) => setNewNotification({...newNotification, scheduledTime: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Delivery Methods</Label>
                  <div className="space-y-2 pl-6">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="sendPush" 
                        checked={newNotification.sendPush}
                        onCheckedChange={(checked) => 
                          setNewNotification({...newNotification, sendPush: checked})
                        }
                      />
                      <Label htmlFor="sendPush">Send push notification</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="sendEmail" 
                        checked={newNotification.sendEmail}
                        onCheckedChange={(checked) => 
                          setNewNotification({...newNotification, sendEmail: checked})
                        }
                      />
                      <Label htmlFor="sendEmail">Send email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="showInApp" 
                        checked={newNotification.showInApp}
                        onCheckedChange={(checked) => 
                          setNewNotification({...newNotification, showInApp: checked})
                        }
                      />
                      <Label htmlFor="showInApp">Show in-app notification</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddNotification} 
                  disabled={!newNotification.title || !newNotification.content || (newNotification.isScheduled && (!newNotification.scheduledDate || !newNotification.scheduledTime))}
                >
                  {newNotification.isScheduled ? "Schedule" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border rounded-md p-4 space-y-1 bg-blue-50 dark:bg-blue-900/20">
          <p className="text-sm text-muted-foreground">Total Notifications</p>
          <p className="text-2xl font-semibold">{notifications.length}</p>
        </div>
        <div className="border rounded-md p-4 space-y-1 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-muted-foreground">Sent</p>
          <p className="text-2xl font-semibold">{notifications.filter(n => n.status === 'sent').length}</p>
        </div>
        <div className="border rounded-md p-4 space-y-1 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-muted-foreground">Scheduled</p>
          <p className="text-2xl font-semibold">{notifications.filter(n => n.status === 'scheduled').length}</p>
        </div>
        <div className="border rounded-md p-4 space-y-1 bg-purple-50 dark:bg-purple-900/20">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="text-2xl font-semibold">{notifications.filter(n => n.status === 'draft').length}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex overflow-x-auto pb-2">
          <div className="flex space-x-1 border-b">
            <button
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Notifications
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'sent' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('sent')}
            >
              Sent
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'scheduled' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'draft' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('draft')}
            >
              Drafts
            </button>
          </div>
        </div>
        
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <GlassCard key={notification.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div className={`p-3 rounded-md ${
                      notification.type === 'announcement' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                      notification.type === 'reminder' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' :
                      notification.type === 'update' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                      notification.type === 'achievement' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' :
                      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {notification.type === 'announcement' ? <Bell className="h-5 w-5" /> : 
                       notification.type === 'reminder' ? <Clock className="h-5 w-5" /> : 
                       notification.type === 'update' ? <FileText className="h-5 w-5" /> :
                       notification.type === 'achievement' ? <Sparkles className="h-5 w-5" /> :
                       <MessageCircle className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg">{notification.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          notification.status === 'sent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          notification.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                          notification.priority === 'normal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.content}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {notification.targetAudience === 'all' ? 'All Users' : 
                           notification.targetAudience === 'free_users' ? 'Free Users' :
                           notification.targetAudience === 'premium' ? 'Premium Users' :
                           notification.targetAudience === 'inactive' ? 'Inactive Users' :
                           'New Users'}
                        </span>
                        
                        {notification.status === 'scheduled' && notification.scheduledFor && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Scheduled for: {new Date(notification.scheduledFor).toLocaleString()}
                          </span>
                        )}
                        
                        {notification.status === 'sent' && notification.sentAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            Sent: {new Date(notification.sentAt).toLocaleString()}
                          </span>
                        )}
                        
                        {notification.status === 'sent' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Upload className="h-3.5 w-3.5" />
                              Delivered: {notification.deliveredCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              Opens: {notification.openCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <ChevronsUpDown className="h-3.5 w-3.5" />
                              CTR: {((notification.clickCount / Math.max(1, notification.openCount)) * 100).toFixed(1)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 md:self-start">
                    {notification.status === 'draft' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 dark:border-green-700"
                        onClick={() => handleSendNotification(notification.id)}
                      >
                        <Send className="h-4 w-4" />
                        Send Now
                      </Button>
                    )}
                    
                    {notification.status === 'draft' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                    
                    {notification.status !== 'sent' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 dark:border-red-700"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No notifications found</h3>
            <p className="text-muted-foreground mt-1 max-w-md">
              There are no notifications in this category. Create a new notification to get started.
            </p>
            <Button 
              className="mt-4" 
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Create Notification
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsManagement;
