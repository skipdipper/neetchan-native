import { useContext, createContext, useMemo, useRef } from 'react';


const ModalVisibilityContext = createContext<ModalVisibilityContextInterface | null>(null);

export interface ModalVisibilityContextInterface {
    // modalRef: React.Ref<any>;
    modalRef: any
}

// Custom hook for Modal Visibility state 
export const useModalVisibility = () => useContext(ModalVisibilityContext);

type ModalVisibilityContextProps = {
    children: React.ReactNode,
};
export function ModalVisibilityProvider({ children }: ModalVisibilityContextProps) {
    const modalRef = useRef();

    const value = useMemo(() => ({
        modalRef,
    }), [modalRef.current]);


    return (
        <ModalVisibilityContext.Provider value={value}>
            {children}
        </ModalVisibilityContext.Provider>
    );
}