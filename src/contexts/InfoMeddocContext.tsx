import React, { createContext, useContext, useState, useEffect } from "react";
import { Info_page_meddoc } from "@/types";
import infoMeddocService from "@/services/infoMeddocService";
import { toast } from "sonner";

interface InfoMeddocContextType {
  info: Info_page_meddoc | null;
  isLoading: boolean;
  error: string | null;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  handleUpdateInfo: (
    info: Info_page_meddoc,
    files?: { logo: File | null; favicon: File | null }
  ) => Promise<void>;
  refreshInfo: () => Promise<void>;
}

const InfoMeddocContext = createContext<InfoMeddocContextType | undefined>(
  undefined
);

export function InfoMeddocProvider({ children }: { children: React.ReactNode }) {
  const [info, setInfo] = useState<Info_page_meddoc | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const refreshInfo = async () => {
    try {
      setIsLoading(true);
      const data = await infoMeddocService.getInfo();
      setInfo(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      toast.error("Erreur lors du chargement des informations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInfo = async (
    updatedInfo: Info_page_meddoc,
    files?: { logo: File | null; favicon: File | null }
  ) => {
    try {
      setIsLoading(true);
      await infoMeddocService.updateInfo(updatedInfo.id, updatedInfo, files);
      await refreshInfo();
      setIsEditModalOpen(false);
      toast.success("Informations mises à jour avec succès");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      toast.error("Erreur lors de la mise à jour des informations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshInfo();
  }, []);

  return (
    <InfoMeddocContext.Provider
      value={{
        info,
        isLoading,
        error,
        isEditModalOpen,
        setIsEditModalOpen,
        handleUpdateInfo,
        refreshInfo,
      }}
    >
      {children}
    </InfoMeddocContext.Provider>
  );
}

export function useInfoMeddocContext() {
  const context = useContext(InfoMeddocContext);
  if (context === undefined) {
    throw new Error(
      "useInfoMeddocContext must be used within a InfoMeddocProvider"
    );
  }
  return context;
}
