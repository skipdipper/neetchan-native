import { useState, useContext, createContext } from 'react';

export interface SearchContextInterface {
    searchText: string;
    filteredData: Array<any>
    setSearchText: (data: string) => void;
    setFilteredData: (data: Array<any>) => void;
}

const SearchContext = createContext<SearchContextInterface | null>(null);

// Custom hook to access SearchContext
export const useSearchContext = () => useContext(SearchContext);

type CatalogContextProps = {
    children: React.ReactNode,
};

export function SearchProvider({ children }: CatalogContextProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Array<any>>([]);

    return (
        <SearchContext.Provider value={{ searchText, setSearchText, filteredData, setFilteredData }}>
            {children}
        </SearchContext.Provider>
    )
}