import { useState, useContext, createContext } from 'react';

export interface ThreadContextInterface {
  data: Map<number, any>;
  setData: (data: Map<number, any>) => void;
}

const ThreadContext = createContext<ThreadContextInterface | null>(null);

// Custom hook to access ThreadContext
export const useThreadContext = () => useContext(ThreadContext);

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
