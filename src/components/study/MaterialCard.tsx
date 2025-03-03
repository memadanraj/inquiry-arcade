
import React from 'react';
import { BookText, BookOpen, FileText, Calendar, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui/GlassCard';
import { Badge } from '@/components/ui/badge';

export type MaterialType = 'note' | 'solution' | 'oldQuestion' | 'preboard';

export interface MaterialCardProps {
  id: string;
  title: string;
  type: MaterialType;
  subject: string;
  course: string;
  semester?: string;
  year?: string;
  lastUpdated: string;
  popularity: number;
  tags: string[];
  isPremium?: boolean;
  onClick?: () => void;
}

const MaterialCard = ({
  title,
  type,
  subject,
  course,
  semester,
  year,
  lastUpdated,
  tags,
  isPremium = false,
  onClick,
}: MaterialCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'note':
        return <BookText className="h-5 w-5" />;
      case 'solution':
        return <FileText className="h-5 w-5" />;
      case 'oldQuestion':
      case 'preboard':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <BookText className="h-5 w-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'note':
        return 'Notes';
      case 'solution':
        return 'Solution';
      case 'oldQuestion':
        return 'Old Question';
      case 'preboard':
        return 'Preboard';
      default:
        return type;
    }
  };

  return (
    <GlassCard
      className={cn(
        "transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer animate-slide-in-bottom",
        isPremium && "border-amber-200 border-opacity-50"
      )}
      onClick={onClick}
    >
      {isPremium && (
        <div className="absolute -right-8 top-5 rotate-45 bg-amber-500 text-amber-50 text-xs py-1 px-10 shadow-md">
          Premium
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-md",
          type === 'note' && "bg-blue-50 text-blue-500",
          type === 'solution' && "bg-green-50 text-green-500",
          type === 'oldQuestion' && "bg-amber-50 text-amber-500",
          type === 'preboard' && "bg-purple-50 text-purple-500",
        )}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs font-normal">
              {getTypeLabel()}
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal">
              {subject}
            </Badge>
            {isPremium && (
              <Badge variant="outline" className="text-xs font-normal bg-amber-50 text-amber-700 border-amber-200 gap-1">
                <Crown className="h-3 w-3" />
                Premium
              </Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{course}</span>
            {semester && <span>Semester {semester}</span>}
            {year && <span>Year {year}</span>}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{lastUpdated}</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default MaterialCard;
