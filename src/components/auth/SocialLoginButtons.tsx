
import React from 'react';
import { Button } from '@/components/ui/button';

const SocialLoginButtons = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button variant="outline" className="w-full">Google</Button>
        <Button variant="outline" className="w-full">GitHub</Button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
