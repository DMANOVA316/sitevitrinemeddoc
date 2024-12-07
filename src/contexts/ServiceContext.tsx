import useService from "@/hooks/use-service";
import { ServiceType } from "@/types";
import { createContext, ReactNode, useContext } from "react";

interface UseServiceProps {
  services: ServiceType[];
  currentService: ServiceType | null;
  setCurrentService: (service: ServiceType | null) => void;
  isAddServiceOpen: boolean;
  setIsAddServiceOpen: (isOpen: boolean) => void;
  isEditServiceOpen: boolean;
  setIsEditServiceOpen: (isOpen: boolean) => void;
  isRemoveServiceOpen: boolean;
  setIsRemoveServiceOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  error: string | null;
  addService: (service: Omit<ServiceType, "id">) => Promise<void>;
  updateService: (
    id: number,
    service: Partial<Omit<ServiceType, "id">>
  ) => Promise<void>;
  removeService: (id: number) => Promise<void>;
  getServices: () => Promise<void>;
}

const ServiceContext = createContext<UseServiceProps | null>(null);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const value = useService();
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export const useServiceContext = (): UseServiceProps => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};
