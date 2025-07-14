import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userEmail: string;
  setUserEmail: (email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>(() => {
    const savedEmail = localStorage.getItem('userEmail');
    return savedEmail || '';
  });

  // Save email to localStorage whenever it changes
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
  }, [userEmail]);

  const logout = () => {
    // Clear all stored data
    localStorage.clear();
    setUserEmail('');
  };

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 