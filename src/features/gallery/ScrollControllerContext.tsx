import { useContext, createContext, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';


const ScrollControllerContext = createContext<ScrollControllerContextInterface | null>(null);

export interface ScrollControllerContextInterface {
    scrollRef: React.RefObject<FlatList>;
}

export const useScrollControllerContext = () => useContext(ScrollControllerContext);

type ScrollContextProps = {
    children: React.ReactNode,
};

/* 
Scroll controller for Gallery Screen to imperatively control scroll position 
of React flatlist components CatalogList and Thread via the ref attribute
*/
export function ScrollControllerProvider({ children }: ScrollContextProps) {
    // TODO: use callback ref instead for more granular control
    const scrollRef = useRef<FlatList>(null);

    const value = useMemo(() => ({
        scrollRef,
    }), [scrollRef.current]);


    return (
        <ScrollControllerContext.Provider value={value}>
            {children}
        </ScrollControllerContext.Provider>
    );
}