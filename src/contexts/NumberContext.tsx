import { createContext, useContext, useState, useEffect } from "react";
import { Numero_meddoc } from "@/types";
import { numberService } from "@/services/numberService";
import { toast } from "sonner";

interface NumberContextType {
  numbers: Numero_meddoc[];
  currentNumber: Numero_meddoc | null;
  isLoading: boolean;
  error: string | null;
  isAddNumberOpen: boolean;
  isEditNumberOpen: boolean;
  isRemoveNumberOpen: boolean;
  setIsAddNumberOpen: (isOpen: boolean) => void;
  setIsEditNumberOpen: (isOpen: boolean) => void;
  setIsRemoveNumberOpen: (isOpen: boolean) => void;
  setCurrentNumber: (number: Numero_meddoc | null) => void;
  handleAddNumber: (number: Omit<Numero_meddoc, "id">) => Promise<void>;
  handleUpdateNumber: (id: number, number: Partial<Omit<Numero_meddoc, "id">>) => Promise<void>;
  handleDeleteNumber: (id: number) => Promise<void>;
  refreshNumbers: () => Promise<void>;
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

export function NumberProvider({ children }: { children: React.ReactNode }) {
  const [numbers, setNumbers] = useState<Numero_meddoc[]>([]);
  const [currentNumber, setCurrentNumber] = useState<Numero_meddoc | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddNumberOpen, setIsAddNumberOpen] = useState(false);
  const [isEditNumberOpen, setIsEditNumberOpen] = useState(false);
  const [isRemoveNumberOpen, setIsRemoveNumberOpen] = useState(false);

  const refreshNumbers = async () => {
    try {
      setIsLoading(true);
      const data = await numberService.getAllNumber();
      if (data) setNumbers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      toast.error("Erreur lors du chargement des numéros");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshNumbers();
  }, []);

  const handleAddNumber = async (number: Omit<Numero_meddoc, "id">) => {
    try {
      setIsLoading(true);
      await numberService.createNumber(number);
      await refreshNumbers();
      setIsAddNumberOpen(false);
      toast.success("Numéro ajouté avec succès");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      toast.error("Erreur lors de l'ajout du numéro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNumber = async (
    id: number,
    number: Partial<Omit<Numero_meddoc, "id">>
  ) => {
    try {
      setIsLoading(true);
      await numberService.updateNumber(id, number);
      await refreshNumbers();
      setIsEditNumberOpen(false);
      toast.success("Numéro mis à jour avec succès");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      toast.error("Erreur lors de la mise à jour du numéro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNumber = async (id: number) => {
    try {
      setIsLoading(true);
      await numberService.deleteNumber(id);
      await refreshNumbers();
      setIsRemoveNumberOpen(false);
      toast.success("Numéro supprimé avec succès");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      toast.error("Erreur lors de la suppression du numéro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NumberContext.Provider
      value={{
        numbers,
        currentNumber,
        isLoading,
        error,
        isAddNumberOpen,
        isEditNumberOpen,
        isRemoveNumberOpen,
        setIsAddNumberOpen,
        setIsEditNumberOpen,
        setIsRemoveNumberOpen,
        setCurrentNumber,
        handleAddNumber,
        handleUpdateNumber,
        handleDeleteNumber,
        refreshNumbers,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
}

export const useNumberContext = () => {
  const context = useContext(NumberContext);
  if (context === undefined) {
    throw new Error("useNumberContext must be used within a NumberProvider");
  }
  return context;
};
