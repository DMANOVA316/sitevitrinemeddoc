import { useEffect, useState } from "react";
import { ServiceType } from "@/types";
import { serviceService } from "@/services/serviceService";

export default function useService() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [currentService, setCurrentService] = useState<ServiceType | null>(null);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [isRemoveServiceOpen, setIsRemoveServiceOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async (newService: Omit<ServiceType, "id">): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await serviceService.createService(newService);
      await getServices();
      setCurrentService(null);
      setIsAddServiceOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
      console.error("Error adding service:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = async (
    id: number,
    updatedService: Partial<Omit<ServiceType, "id">>
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await serviceService.updateService(id, updatedService);
      await getServices();
      setCurrentService(null);
      setIsEditServiceOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
      console.error("Error updating service:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeService = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await serviceService.deleteService(id);
      await getServices();
      setCurrentService(null);
      setIsRemoveServiceOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
      console.error("Error removing service:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return {
    services,
    currentService,
    setCurrentService,
    isAddServiceOpen,
    setIsAddServiceOpen,
    isEditServiceOpen,
    setIsEditServiceOpen,
    isRemoveServiceOpen,
    setIsRemoveServiceOpen,
    isLoading,
    error,
    addService,
    updateService,
    removeService,
    getServices,
  };
}
