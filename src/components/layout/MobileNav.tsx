
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, BookText, MessageSquare, User, FileText } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Study', path: '/study-materials', icon: BookText },
    { name: 'Q&A', path: '/q-and-a', icon: MessageSquare },
    { name: 'Results', path: '/results', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border/40 z-40">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav;
