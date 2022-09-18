import { useState, useContext, createContext, useMemo } from 'react';

export interface SearchContextInterface {
    searchText: string;
    filteredData: Array<any>;
    setSearchText: (data: string) => void;
    setFilteredData: (data: Array<any>) => void;
}

const SearchContext = createContext<SearchContextInterface | null>(null);

// Custom hook to access SearchContext
export const useSearchContext = () => useContext(SearchContext);

type SearchProviderProps = {
    children: React.ReactNode,
};

export function SearchProvider({ children }: SearchProviderProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Array<any>>([]);

    const value = useMemo(() => ({
        searchText, setSearchText, filteredData, setFilteredData
    }), [searchText, filteredData]);

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}