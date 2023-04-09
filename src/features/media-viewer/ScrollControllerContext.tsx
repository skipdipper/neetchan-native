import { useContext, createContext, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';

interface ScrollControllerContextInterface {
  scrollRef: React.MutableRefObject<FlatList | null>;
}

const ScrollControllerContext =
  createContext<ScrollControllerContextInterface | null>(null);

export const useScrollControllerContext = () => {
  const context = useContext(ScrollControllerContext);

  if (context === null) {
    throw new Error(
      'useScrollControllerContext must be used within a ScrollControllerProvider'
    );
  }

  return context;
};

type ScrollContextProps = {
  children: React.ReactNode;
};

/* 
Scroll controller for Gallery Screen to imperatively control scroll position 
of React flatlist components CatalogList and Thread via the ref attribute
*/
export function ScrollControllerProvider({ children }: ScrollContextProps) {
  // TODO: use callback ref instead for more granular control
  const scrollRef = useRef<FlatList | null>(null);

  const value = useMemo(
    () => ({
      scrollRef
    }),
    [scrollRef.current]
  );

  return (
    <ScrollControllerContext.Provider value={value}>
      {children}
    </ScrollControllerContext.Provider>
  );
}
