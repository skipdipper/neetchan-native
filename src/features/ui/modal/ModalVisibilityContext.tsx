import { useContext, createContext, useMemo, useRef } from 'react';

interface ModalVisibilityContextInterface {
  // modalRef: React.Ref<any>;
  modalRef: any;
}

const ModalVisibilityContext =
  createContext<ModalVisibilityContextInterface | null>(null);

// Custom hook for Modal Visibility state
export const useModalVisibility = () => {
  const context = useContext(ModalVisibilityContext);
  if (context === null) {
    throw new Error(
      'useModalVisibility must be used within a ModalVisibilityProvider'
    );
  }

  return context;
};

type ModalVisibilityContextProps = {
  children: React.ReactNode;
};
export function ModalVisibilityProvider({
  children
}: ModalVisibilityContextProps) {
  const modalRef = useRef();

  const value = useMemo(
    () => ({
      modalRef
    }),
    [modalRef.current]
  );

  return (
    <ModalVisibilityContext.Provider value={value}>
      {children}
    </ModalVisibilityContext.Provider>
  );
}
