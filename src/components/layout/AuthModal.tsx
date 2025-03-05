import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  
  // Login form state
  const [loginData, setLoginData] = useState({
    userName: '',
    userPassword: ''
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({
      ...loginData,
      [id === 'email' ? 'userName' : 'userPassword']: value
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterData({
      ...registerData,
      [id.replace('signup-', '')]: value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login({
        userName: loginData.userName,
        userPassword: loginData.userPassword
      });
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      // Error toast is shown in auth service
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(
        registerData.name,
        registerData.email,
        registerData.password
      );
      setActiveTab('login');
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  value={loginData.userName} 
                  onChange={handleLoginChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={loginData.userPassword} 
                  onChange={handleLoginChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
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
          </TabsContent>
          
          <TabsContent value="register" className="mt-0">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={registerData.name} 
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  value={registerData.email} 
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  required 
                  value={registerData.password} 
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  required 
                  value={registerData.confirmPassword} 
                  onChange={handleRegisterChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
