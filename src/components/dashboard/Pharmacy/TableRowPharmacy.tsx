import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../../ui/button";

const TableRowPharmacy = ({
  key,
  pharmacy,
  handleEdit,
  handleDelete,
  toggleDeGarde,
}) => {
  return (
    <TableRow key={key} className="relative group min-h-[200px]">
      <TableCell className="px-6 py-4 whitespace-nowrap">
        {pharmacy.photo_profil ? (
          <img
            src={pharmacy.photo_profil}
            alt={pharmacy.nom_pharmacie}
            className="w-12 h-12 object-cover rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement?.classList.add("fallback-icon");
            }}
          />
        ) : (
          <Building2 className="w-8 h-8 text-meddoc-primary" />
        )}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap max-w-[150px]">
        <div className="flex flex-col justify-start items-start">
          <h3 className="truncate max-w-[150px] text-xl font-semibold text-gray-900">
            {pharmacy.nom_pharmacie}
          </h3>
          {pharmacy.de_garde && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
              De garde
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap max-w-[150px]">
        <p className="truncate text-gray-700">{pharmacy.service}</p>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap">
        {pharmacy.horaires && pharmacy.horaires.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex-1 space-y-1">
              {pharmacy.horaires.map((horaire, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {horaire.heure_debut} - {horaire.heure_fin}
                </p>
              ))}
            </div>
          </div>
        )}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap max-w-[150px]">
        {pharmacy.contacts && pharmacy.contacts.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="max-w-[150px] truncate text-gray-700">
                {pharmacy.contacts.map((contact, index) =>
                  index < pharmacy.contacts.length - 1
                    ? contact.numero + " / "
                    : contact.numero
                )}
              </p>
            </div>
          </div>
        )}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap max-w-[150px]">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="max-w-[150px] truncate text-gray-700">
              {pharmacy.address}
            </p>
            <p className="max-w-[150px] truncate text-sm text-gray-500">
              {pharmacy.province && pharmacy.province + ", "}
              {pharmacy.region && pharmacy.region + ","}
              {pharmacy.district && pharmacy.district}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-4">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white"
              onClick={() => handleEdit(pharmacy)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-red-600 hover:text-red-700"
              onClick={() => handleDelete(pharmacy.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-600 hover:text-gray-800">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log("Option 1")}>
                Voir détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleDeGarde(pharmacy.id)}>
                {pharmacy.de_garde ? "Retirer de garde" : "Marquer de garde"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRowPharmacy;
