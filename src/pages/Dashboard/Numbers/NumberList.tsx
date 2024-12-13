import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import AddNumber from "@/components/dashboard/AddNumber";
import EditNumber from "@/components/dashboard/EditNumber";
import RemoveNumber from "@/components/dashboard/RemoveNumber";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";
import useNumberRedux from "@/hooks/use-number-redux";
import Number from "./Number";

export default function NumberList() {
  const { numeros, isLoading, showAddNumberModal, getNumbers } =
    useNumberRedux();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredNumbers = useMemo(() => {
    if (!numeros) return [];
    return numeros.filter((number) =>
      number.numero.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [numeros, searchQuery]);

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-[250px]" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Liste des contacts</h2>
            <Button
              onClick={() => {
                showAddNumberModal(true);
              }}
            >
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
                    <TableCell
                      colSpan={2}
                      className="text-center text-gray-500"
                    >
                      {searchQuery
                        ? "Aucun contact trouvé pour cette recherche"
                        : "Aucun contact disponible"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNumbers.map((number) => (
                    <Number key={number.id} number={number} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      <AddNumber />
      <EditNumber />
      <RemoveNumber />
    </div>
  );
}
