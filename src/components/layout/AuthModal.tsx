
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleLogin = async (data: { userName: string; userPassword: string }) => {
    setIsLoading(true);
    
    try {
      await login(data);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      // Error toast is shown in auth service
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(
        data.name,
        data.email,
        data.password
      );
      setActiveTab('login');
      toast.success('Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration error:', error);
      // Error toast is shown in auth service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] backdrop-blur-xl bg-white/95 dark:bg-gray-900/95">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Welcome to StudyNotes
          </DialogTitle>
          <DialogDescription className="text-center">
            Your personal study companion
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-0">
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            <SocialLoginButtons />
          </TabsContent>
          
          <TabsContent value="register" className="mt-0">
            <RegisterForm onSubmit={handleSignup} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
