import { useState, useContext, createContext, useMemo } from 'react';

interface SearchActiveContextInterface {
  searchActive: boolean;
  setSearchActive: (data: boolean) => void;
}

const SearchActiveContext = createContext<SearchActiveContextInterface | null>(
  null
);

export const useSearchActiveContext = () => {
  const context = useContext(SearchActiveContext);

  if (context === null) {
    throw new Error(
      'useSearchActiveContext must be used within a SearchActiveProvider'
    );
  }

  return context;
};

type SearchActiveProviderProps = {
  children: React.ReactNode;
};

/*
Separate Context complementing SearchContext to avoid Consumer re-render
State indicating if Search Filter is active 
See: https://github.com/facebook/react/issues/15156
*/
export function SearchActiveProvider({ children }: SearchActiveProviderProps) {
  const [searchActive, setSearchActive] = useState<boolean>(false);

  // Memoise value to prevent Consumer - CatalogScreen re-render if value unchanged
  const value = useMemo(
    () => ({
      searchActive,
      setSearchActive
    }),
    [searchActive]
  );

  return (
    <SearchActiveContext.Provider value={value}>
      {children}
    </SearchActiveContext.Provider>
  );
}
