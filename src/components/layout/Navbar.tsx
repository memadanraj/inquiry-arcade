
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { BookOpen, BookText, MessageSquare, User, Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import AuthModal from './AuthModal';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Study Materials', path: '/study-materials', icon: BookText },
    { name: 'Q&A', path: '/q-and-a', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border/40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-semibold text-xl tracking-tight text-primary">StudyNotes</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {showSearch ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 250, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <Input
                    type="search"
                    placeholder="Search study materials..."
                    className="w-full"
                    autoFocus
                    onBlur={() => setShowSearch(false)}
                  />
                </motion.div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </AnimatePresence>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(prev => !prev)}
                aria-label="Notifications"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1.5 flex h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              {showNotifications && (
                <NotificationDropdown 
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            <div className="hidden md:flex">
              <Link 
                to="/profile"
                aria-label="Profile"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" })
                )}
              >
                <User className="h-5 w-5" />
              </Link>
            </div>

            <Link
              to="/leaderboard"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden md:inline-flex"
              )}
            >
              Rankings
            </Link>

            <Button 
              variant="default" 
              size="sm"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
};

export default Navbar;
