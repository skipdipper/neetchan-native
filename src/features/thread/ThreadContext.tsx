import { useState, useContext, createContext } from 'react';

interface ThreadContextInterface {
  data: Map<number, any>;
  setData: (data: Map<number, any>) => void;
}

const ThreadContext = createContext<ThreadContextInterface | null>(null);

// Custom hook to access ThreadContext
export const useThreadContext = () => {
  const context = useContext(ThreadContext);

  if (context === null) {
    throw new Error('useThreadContext must be used within a ThreadProvider');
  }

  return context;
};

type ThreadContextProps = {
  children: React.ReactNode;
};

export function ThreadProvider({ children }: ThreadContextProps) {
  const [data, setData] = useState<Map<number, any>>(new Map());

  return (
    <ThreadContext.Provider value={{ data, setData }}>
      {children}
    </ThreadContext.Provider>
  );
}
