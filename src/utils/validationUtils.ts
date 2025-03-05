
/**
 * Form validation utility functions
 */

// Email validation with regex
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation - at least 8 characters with at least one number and one letter
export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
};

// Password match validation
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

// Name validation - at least 2 characters
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};
