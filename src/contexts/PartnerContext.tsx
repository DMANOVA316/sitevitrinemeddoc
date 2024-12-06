import usePartner from "@/hooks/use-partner";
import { usePartnerProps } from "@/types";
import { createContext, ReactNode, useContext } from "react";

const PartnerContext = createContext<usePartnerProps | null>(null);

interface partnerProviderProps {
  children: ReactNode;
}

export const PartnerProvider: React.FC<partnerProviderProps> = ({
  children,
}) => {
  const value = usePartner();
  return (
    <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>
  );
};

export const usePartnerContext = (): usePartnerProps => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error("usePartnerContext must be used within a PartnerProvider");
  }
  return context;
};
