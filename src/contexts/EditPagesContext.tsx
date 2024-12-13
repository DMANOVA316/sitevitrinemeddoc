import { createContext, useContext, useState, ReactNode } from "react";

interface EditPagesContextType {
  isHeaderModalOpen: boolean;
  isLandingPageModalOpen: boolean;
  isFooterModalOpen: boolean;
  setIsHeaderModalOpen: (isOpen: boolean) => void;
  setIsLandingPageModalOpen: (isOpen: boolean) => void;
}

const EditPagesContext = createContext<EditPagesContextType | undefined>(
  undefined
);

export function EditPagesProvider({ children }: { children: ReactNode }) {
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isLandingPageModalOpen, setIsLandingPageModalOpen] = useState(false);
  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);

  return (
    <EditPagesContext.Provider
      value={{
        isHeaderModalOpen,
        isLandingPageModalOpen,
        setIsHeaderModalOpen,
        setIsLandingPageModalOpen,
      }}
    >
      {children}
    </EditPagesContext.Provider>
  );
}

export function useEditPagesContext() {
  const context = useContext(EditPagesContext);
  if (context === undefined) {
    throw new Error(
      "useEditPagesContext must be used within a EditPagesProvider"
    );
  }
  return context;
}
