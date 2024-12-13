import { Button } from "@/components/ui/button";
import { ServiceProvider, useServiceContext } from "@/contexts/ServiceContext";
import { Plus } from "lucide-react";
import AddService from "./AddService";
import EditService from "./EditService";
import RemoveService from "./RemoveService";
import ServiceList from "./ServiceList";

export default function Services() {
  const { setIsAddServiceOpen } = useServiceContext();

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Services</h1>
        <Button
          onClick={() => setIsAddServiceOpen(true)}
          className="bg-green-500 hover:bg-green-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un service
        </Button>
      </div>

      <ServiceList />
      <AddService />
      <EditService />
      <RemoveService />
    </div>
  );
}
