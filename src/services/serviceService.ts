import supabase from "@/utils/supabase";
import { ServiceType } from "@/types";

const SERVICES_TABLE = "services";

export const serviceService = {
  // Get all services
  getAllServices: async (): Promise<ServiceType[]> => {
    const { data, error } = await supabase.from(SERVICES_TABLE).select("*");

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get a single service by ID
  getServiceById: async (id: number): Promise<ServiceType | null> => {
    const { data, error } = await supabase
      .from(SERVICES_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Create a new service
  createService: async (service: Omit<ServiceType, "id">): Promise<ServiceType> => {
    const { data, error } = await supabase
      .from(SERVICES_TABLE)
      .insert([service])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update an existing service
  updateService: async (
    id: number,
    service: Partial<Omit<ServiceType, "id">>
  ): Promise<ServiceType> => {
    const { data, error } = await supabase
      .from(SERVICES_TABLE)
      .update(service)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a service
  deleteService: async (id: number): Promise<void> => {
    const { error } = await supabase.from(SERVICES_TABLE).delete().eq("id", id);

    if (error) throw new Error(error.message);
  },
};
