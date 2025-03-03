
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassCard from '../ui/GlassCard';

export interface QuestionCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  answerCount: number;
  voteCount: number;
  tags: string[];
  onClick?: () => void;
}

const QuestionCard = ({
  title,
  content,
  author,
  createdAt,
  answerCount,
  voteCount,
  tags,
  onClick,
}: QuestionCardProps) => {
  return (
    <GlassCard 
      className="transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {content}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground gap-3 mt-2">
            <span className="font-medium text-foreground/80">{author.name}</span>
            <span>asked {formatDistanceToNow(createdAt, { addSuffix: true })}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-end min-w-[80px]">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">{answerCount}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{voteCount}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default QuestionCard;
