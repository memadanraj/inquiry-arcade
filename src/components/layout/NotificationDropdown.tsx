
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CheckCircle, MessageSquare, Bell, BookText, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Notification types
type NotificationType = 'answer' | 'upvote' | 'achievement' | 'material' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  timestamp: string;
}

interface NotificationDropdownProps {
  onClose: () => void;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'answer',
    title: 'New Answer',
    message: 'User123 answered your question about calculus limits',
    link: '/q-and-a/question-1',
    isRead: false,
    timestamp: '10m ago',
  },
  {
    id: '2',
    type: 'upvote',
    title: 'Upvote Received',
    message: 'Your answer received 5 upvotes',
    link: '/q-and-a/question-2',
    isRead: false,
    timestamp: '2h ago',
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement Unlocked',
    message: 'You earned the "Knowledge Sharer" badge',
    link: '/profile#achievements',
    isRead: true,
    timestamp: '1d ago',
  },
  {
    id: '4',
    type: 'material',
    title: 'New Study Material',
    message: 'New BBA Semester 4 Finance notes are available',
    link: '/study-materials/finance',
    isRead: true,
    timestamp: '2d ago',
  },
];

const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-dropdown')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'answer':
      case 'upvote':
        return <MessageSquare className="h-4 w-4" />;
      case 'achievement':
        return <Award className="h-4 w-4" />;
      case 'material':
        return <BookText className="h-4 w-4" />;
      case 'system':
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="notification-dropdown absolute right-0 mt-2 w-80 rounded-md shadow-lg glass border border-border/40 z-50"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Notifications</h3>
          <Button variant="ghost" size="sm" className="text-xs">
            Mark all as read
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[350px] overflow-y-auto">
          {mockNotifications.map((notification) => (
            <Link 
              key={notification.id} 
              to={notification.link}
              className={cn(
                "block p-3 rounded-md transition-colors hover:bg-accent/50",
                !notification.isRead && "bg-accent/30"
              )}
              onClick={onClose}
            >
              <div className="flex gap-3">
                <div className={cn(
                  "mt-0.5 p-1.5 rounded-full",
                  notification.type === 'answer' && "bg-blue-100 text-blue-500",
                  notification.type === 'upvote' && "bg-green-100 text-green-500",
                  notification.type === 'achievement' && "bg-amber-100 text-amber-500",
                  notification.type === 'material' && "bg-purple-100 text-purple-500",
                  notification.type === 'system' && "bg-gray-100 text-gray-500",
                )}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 pt-2 border-t border-border/40">
          <Link 
            to="/notifications"
            className="text-center block text-sm text-primary hover:underline"
            onClick={onClose}
          >
            View all notifications
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
