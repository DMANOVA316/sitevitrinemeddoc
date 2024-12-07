import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import AddNumber from "@/components/dashboard/AddNumber";
import EditNumber from "@/components/dashboard/EditNumber";
import RemoveNumber from "@/components/dashboard/RemoveNumber";
import { useNumberContext } from "@/contexts/NumberContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

export default function NumberList() {
  const {
    numbers,
    isLoading,
    setIsAddNumberOpen,
    setIsEditNumberOpen,
    setIsRemoveNumberOpen,
    setCurrentNumber,
  } = useNumberContext();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredNumbers = useMemo(() => {
    if (!numbers) return [];
    return numbers.filter((number) =>
      number.numero.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [numbers, searchQuery]);

  const handleEdit = (id: number) => {
    const numberToEdit = numbers.find((number) => number.id === id);
    if (numberToEdit) {
      setCurrentNumber(numberToEdit);
      setIsEditNumberOpen(true);
    }
  };

  const handleRemove = (id: number) => {
    const numberToRemove = numbers.find((number) => number.id === id);
    if (numberToRemove) {
      setCurrentNumber(numberToRemove);
      setIsRemoveNumberOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-[250px]" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Liste des contacts</h2>
        <Button onClick={() => setIsAddNumberOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un contact
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-white rounded-md border p-2">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Rechercher un contact..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNumbers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-gray-500">
                  {searchQuery
                    ? "Aucun contact trouvé pour cette recherche"
                    : "Aucun contact disponible"}
                </TableCell>
              </TableRow>
            ) : (
              filteredNumbers.map((number) => (
                <TableRow key={number.id}>
                  <TableCell>{number.numero}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(number.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemove(number.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddNumber />
      <EditNumber />
      <RemoveNumber />
    </div>
  );
}
