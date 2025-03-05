
# API Integration Documentation

This document describes how the backend API endpoints have been integrated into the frontend application.

## Overview

The API integration follows a structured approach:

1. **API Services**: Each controller from the backend API has a corresponding service file in the frontend
2. **Authentication**: JWT-based auth flow with local storage for token persistence
3. **Error Handling**: Centralized error handling via axios interceptors
4. **File Uploads**: Special handling for multipart/form-data requests

## Architecture

### Core Files

- `src/lib/api.ts` - Base API configuration with axios instances and interceptors
- `src/context/AuthContext.tsx` - Authentication state management
- `src/types/api.ts` - TypeScript interfaces for API models
- `src/services/*.ts` - Service files for each API controller

### Service Organization

Services are organized by domain:

- `authService.ts` - Authentication and user management
- `notesService.ts` - Study notes management
- `noticeService.ts` - Notifications and announcements
- `questionService.ts` - Exam questions and tests
- `resultsService.ts` - Exam results
- `solutionService.ts` - Solutions to questions
- `communityService.ts` - Community Q&A
- `mappingService.ts` - Subject mappings and relationships

## Authentication Flow

1. User logs in or registers
2. Token is stored in localStorage
3. Token is automatically added to API requests via interceptors
4. 401 errors trigger automatic logout

## File Upload Handling

File uploads use a dedicated axios instance with multipart/form-data content type:

```typescript
// Example of file upload
const formData = new FormData();
formData.append('file', file);
await fileApi.post('/api/endpoint', formData);
```

## Error Handling

Centralized error handling in API interceptors:
- Displays toast notifications for errors
- Handles auth errors (401)
- Logs errors to console

## Usage Examples

### Authentication

```typescript
// Login
const { login } = useAuth();
await login({ userName: 'user@example.com', userPassword: 'password' });

// Register
const { register } = useAuth();
await register('John Doe', 'user@example.com', 'password');
```

### Data Fetching with React Query

```typescript
// Fetch data with React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['results'],
  queryFn: resultsService.getAllResults
});
```

## Customization

You can modify the API integration by:

1. Updating the base URL in `src/lib/api.ts`
2. Adding or modifying service methods in the service files
3. Adding new types to `src/types/api.ts`
4. Modifying the auth flow in `src/context/AuthContext.tsx`

## Important Notes

- API base URL is currently set to `http://localhost:8081`
- JWT tokens are stored in localStorage as `auth_token`
- User info is stored in localStorage as `user_info`
