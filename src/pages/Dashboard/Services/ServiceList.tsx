import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useServiceContext } from "@/contexts/ServiceContext";
import { Pencil, Trash2 } from "lucide-react";

export default function ServiceList() {
  const {
    services,
    setCurrentService,
    setIsEditServiceOpen,
    setIsRemoveServiceOpen,
    isLoading,
  } = useServiceContext();

  const handleEdit = (id: number) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      setCurrentService(service);
      setIsEditServiceOpen(true);
    }
  };

  const handleRemove = (id: number) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      setCurrentService(service);
      setIsRemoveServiceOpen(true);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Lien</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.nom}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.lien}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  onClick={() => handleEdit(service.id)}
                  size="sm"
                  variant="outline"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleRemove(service.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
