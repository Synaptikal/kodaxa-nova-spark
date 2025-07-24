import React, { createContext, useContext, useState, ReactNode } from 'react';

// Minimal test version to isolate the React hooks issue
interface TestAuthContextType {
  test: boolean;
}

const TestAuthContext = createContext<TestAuthContextType | undefined>(undefined);

export const useTestAuth = () => {
  const context = useContext(TestAuthContext);
  if (context === undefined) {
    throw new Error('useTestAuth must be used within a TestAuthProvider');
  }
  return context;
};

interface TestAuthProviderProps {
  children: ReactNode;
}

export const TestAuthProvider = ({ children }: TestAuthProviderProps) => {
  console.log('TestAuthProvider rendering...');
  console.log('useState available:', typeof useState);
  
  const [test, setTest] = useState(true);
  
  const value = {
    test,
  };

  return (
    <TestAuthContext.Provider value={value}>
      {children}
    </TestAuthContext.Provider>
  );
};
