# Error Handling System

This directory contains the comprehensive error handling system for the OREBI Shopping application.

## Components

### ErrorBoundary.js
- **Purpose**: Catches JavaScript errors anywhere in the component tree
- **Features**:
  - Displays user-friendly error messages
  - Provides retry functionality
  - Shows error details in development mode
  - Graceful fallback UI

### Toast.js
- **Purpose**: Displays temporary notification messages
- **Types**: success, error, warning, info
- **Features**:
  - Auto-dismiss after configurable duration
  - Multiple positioning options
  - Smooth animations
  - Manual dismiss option

### ToastContainer.js
- **Purpose**: Manages multiple toast notifications
- **Features**:
  - Renders all active toasts
  - Handles toast removal

## Hooks

### useToast.js
- **Purpose**: Provides toast notification functionality
- **Methods**:
  - `showSuccess(message, options)`
  - `showError(message, options)`
  - `showWarning(message, options)`
  - `showInfo(message, options)`
  - `clearAll()`

## Context

### ToastContext.js
- **Purpose**: Provides toast functionality throughout the app
- **Features**:
  - Global toast state management
  - Context provider for components

## Usage Examples

### Basic Toast Usage
```javascript
import { useToast } from '../hooks/useToast';

const MyComponent = () => {
  const { showSuccess, showError } = useToast();
  
  const handleAction = () => {
    try {
      // Some action
      showSuccess('Action completed successfully!');
    } catch (error) {
      showError('Action failed. Please try again.');
    }
  };
};
```

### Error Boundary Usage
```javascript
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## Integration

The error handling system is integrated into the main App component and provides:
- Global error catching
- Toast notifications
- Enhanced user feedback
- Better form validation
- Redux error handling

## Error Message Guidelines

### Good Error Messages
- ✅ "Please enter a valid email address (e.g., user@example.com)"
- ✅ "Password must contain at least one uppercase letter, one lowercase letter, and one number"
- ✅ "Failed to add item to cart. Please try again."

### Bad Error Messages
- ❌ "Invalid input"
- ❌ "Error occurred"
- ❌ "Something went wrong"

## Best Practices

1. **Be Specific**: Tell users exactly what went wrong
2. **Be Helpful**: Provide guidance on how to fix the issue
3. **Be Consistent**: Use similar language and tone across the app
4. **Be Timely**: Show errors immediately when they occur
5. **Be Dismissible**: Allow users to close error messages
6. **Be Accessible**: Ensure error messages are screen reader friendly
