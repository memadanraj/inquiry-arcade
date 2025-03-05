
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateEmail } from '@/utils/validationUtils';

interface LoginFormProps {
  onSubmit: (data: { userName: string; userPassword: string }) => void;
  isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: ''
  });
  const [errors, setErrors] = useState({
    userName: '',
    userPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const field = id === 'email' ? 'userName' : 'userPassword';
    
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      userName: '',
      userPassword: ''
    };
    let isValid = true;

    // Email validation
    if (!formData.userName) {
      newErrors.userName = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.userName)) {
      newErrors.userName = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.userPassword) {
      newErrors.userPassword = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="your@email.com" 
          required 
          value={formData.userName} 
          onChange={handleChange}
          className={errors.userName ? "border-red-500" : ""}
        />
        {errors.userName && (
          <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
        )}
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
          value={formData.userPassword} 
          onChange={handleChange}
          className={errors.userPassword ? "border-red-500" : ""}
        />
        {errors.userPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.userPassword}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
