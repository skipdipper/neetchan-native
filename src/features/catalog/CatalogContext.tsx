import { useState, useContext, createContext } from 'react';
import { CatalogPost } from '../../shared/types';


export interface CatalogContextInterface {
    data: CatalogPost[];
    setData: (data: CatalogPost[]) => void;
}

const CatalogContext = createContext<CatalogContextInterface | null>(null);

// Custom hook to access CatalogContext
export const useCatalogContext = () => useContext(CatalogContext);

type CatalogContextProps = {
    children: React.ReactNode,
};

export function CatalogProvider({ children }: CatalogContextProps) {
    const [data, setData] = useState<Array<any>>([]);

    return (
        <CatalogContext.Provider value={{ data, setData }}>
            {children}
        </CatalogContext.Provider>
    )
}