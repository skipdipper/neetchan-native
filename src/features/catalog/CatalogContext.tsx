import { useState, useContext, createContext } from 'react';


export interface CatalogContextInterface {
    data: Array<any>;
    setData: (data: Array<any>) => void;
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