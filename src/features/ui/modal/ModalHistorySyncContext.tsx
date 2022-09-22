import { useState, useContext, createContext, useMemo, useCallback, useRef, useEffect } from 'react';


export interface ModalHistorySyncContextInterface {
    push: (item: number | Set<number>) => void;
    pop: () => void;
    peek: () => (number | Set<number>);
    size: () => number;
    isEmpty: () => boolean;
    clear: () => void;
}

const ModalHistorySyncContext = createContext<ModalHistorySyncContextInterface | null>(null);

// Custom hook to access ModalHistorySyncContext
export const useModalHistorySyncContext = () => useContext(ModalHistorySyncContext);

type ThreadContextProps = {
    children: React.ReactNode,
};

/*
Synchronous STATELESS Modal History Provider
Implemented with useRef instead of useState therefore method calls are made synchronously
NOT asynchronously as in the case of useState
Asynchronous implementation would be suitable if the Modal is a consumer with state that
is updated Declaritively via useContext and not Imperatively using useImperativeHandle
*/
export function ModalHistorySyncProvider({ children }: ThreadContextProps) {
    // TODO: Array of generic <T> instead

    // State is updated asynchronously, so calling push() then size() immediately after will 
    // not provide current size after push was invoked
    // const [history, sethistory] = useState<(number | Set<number>)[]>([]);

    // Don't need useState because history State is not being consumed by Modal
    // We alternatively useRef to store and update history synchronously

    // Solution to STALE CLOSURE for history if useState Hook is used 
    const historyRef = useRef<(number | Set<number>)[]>([]);

    // Ensure historyRef is always gets latest history state value
    // historyRef.current = history;
    // OR
    // useEffect(() => {
    //     historyRef.current = history;
    // }, [history]);


    const push = useCallback((item: number | Set<number>): void => {
        // sethistory(prev => [...prev, item]);
        historyRef.current.push(item);
    }, []);

    const pop = useCallback((): void => {
        // sethistory(prev => [...prev.slice(0, -1)]);
        historyRef.current.pop();
    }, []);

    const peek = useCallback((): number | Set<number> => {
        // return history[history.length - 1];
        return historyRef.current[historyRef.current.length - 1];
    }, []);
    // [history]

    const size = useCallback((): number => {
        // return history.length;
        return historyRef.current.length;
    }, []);
    // [history]

    const isEmpty = useCallback((): boolean => {
        // return history.length == 0;
        return historyRef.current.length == 0;
    }, []);
    // [history]

    const clear = useCallback((): void => {
        // sethistory([]);
        historyRef.current.splice(0, historyRef.current.length);
    }, []);

    const historyStack = useMemo(() => ({
        push,
        pop,
        peek,
        size,
        isEmpty,
        clear
    }), []);
    // [history]


    return (
        <ModalHistorySyncContext.Provider value={historyStack}>
            {children}
        </ModalHistorySyncContext.Provider>
    )
}