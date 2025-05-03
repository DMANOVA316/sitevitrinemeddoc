import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useNumberRedux from "@/hooks/use-number-redux";
import { Pencil, Trash2 } from "lucide-react";

export default function Number({ number }: { number: Numero_meddoc }) {
  const { showEditNumberModal, showRemoveNumberModal, selectCurrentNumber } =
    useNumberRedux();

  const handleEdit = () => {
    selectCurrentNumber(number);
    showEditNumberModal(true);
  };

  const handleRemove = () => {
    selectCurrentNumber(number);
    showRemoveNumberModal(true);
  };

  return (
    <TableRow>
      <TableCell>
        {number.numero && number.numero.startsWith('+261')
          ? number.numero.replace(/(\+261)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
          : number.numero}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => handleEdit()}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleRemove()}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
