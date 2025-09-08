import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock users database (in a real app, this would be on a server)
  const mockUsers = [
    {
      id: 1,
      email: 'demo@fashionshop.com',
      password: 'demo123',
      name: 'Demo User',
      avatar: null
    },
    {
      id: 2,
      email: 'admin@fashionshop.com',
      password: 'admin123',
      name: 'Admin User',
      avatar: null
    }
  ];

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('fashionShop_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    
    // Find user in mock database
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      // Simulate API call delay only for successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        avatar: foundUser.avatar
      };
      
      setUser(userData);
      localStorage.setItem('fashionShop_user', JSON.stringify(userData));
      setLoading(false);
      return { success: true, user: userData };
    } else {
      // No delay for failed login - show error immediately
      setLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      setLoading(false);
      return { success: false, error: 'User with this email already exists' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now(), // Simple ID generation
      email,
      password,
      name,
      avatar: null
    };
    
    // Add to mock database (in real app, this would be sent to server)
    mockUsers.push(newUser);
    
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar
    };
    
    setUser(userData);
    localStorage.setItem('fashionShop_user', JSON.stringify(userData));
    setLoading(false);
    return { success: true, user: userData };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('fashionShop_user');
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('fashionShop_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
