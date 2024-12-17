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
    <div className="container max-w-screen-lg mx-auto py-4 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
          Gestion des Services
        </h1>
        <Button
          onClick={() => setIsAddServiceOpen(true)}
          className="w-full md:w-auto bg-green-500 hover:bg-green-600"
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
