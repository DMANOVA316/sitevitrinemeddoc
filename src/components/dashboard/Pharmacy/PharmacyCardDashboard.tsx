import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, Building2, Wrench, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface PharmacyCardDashboardProps {
  pharmacy: Pharmacy;
  handleEdit: (pharmacy: Pharmacy) => void;
  handleDelete: (id: number) => void;
  toggleDeGarde: (id: number) => void;
}

const PharmacyCardDashboard = ({ 
  pharmacy, 
  handleEdit, 
  handleDelete, 
  toggleDeGarde 
}: PharmacyCardDashboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="w-full h-full group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white border border-gray-100 rounded-xl relative">
        {/* Status Bar - Green for duty pharmacies */}
        {pharmacy.de_garde && (
          <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-500 w-full"></div>
        )}

        {/* Regular Bar for non-duty pharmacies */}
        {!pharmacy.de_garde && (
          <div className="h-1.5 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary w-full"></div>
        )}

        {/* Action Buttons - Visible on hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm"
            onClick={() => handleEdit(pharmacy)}
          >
            <Pencil className="h-4 w-4 text-meddoc-primary" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white shadow-sm text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleDelete(pharmacy.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-5">
          <div className="space-y-4">
            {/* Pharmacy Header with Logo and Name */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {pharmacy.photo_profil ? (
                  <div className="w-14 h-14 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <img
                      src={pharmacy.photo_profil}
                      alt={pharmacy.nom_pharmacie}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement?.classList.add("bg-blue-50");
                        target.parentElement?.classList.add("flex");
                        target.parentElement?.classList.add("items-center");
                        target.parentElement?.classList.add("justify-center");
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center shadow-sm border border-gray-100">
                    <Building2 className="w-8 h-8 text-meddoc-primary" />
                  </div>
                )}

                {/* Duty Badge */}
                {pharmacy.de_garde && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs">
                    <Clock className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {pharmacy.nom_pharmacie}
                    </h3>
                    {pharmacy.de_garde && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                        De garde
                      </span>
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-400 hover:text-meddoc-primary transition-colors p-1 rounded-full hover:bg-gray-50">
                      <MoreHorizontal className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(pharmacy)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleDeGarde(pharmacy.id)}>
                        <Clock className="mr-2 h-4 w-4" />
                        {pharmacy.de_garde ? "Retirer de garde" : "Marquer de garde"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(pharmacy.id)}
                        className="text-red-600 hover:text-red-700 focus:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 w-full"></div>

            {/* Service */}
            {pharmacy.service && (
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-meddoc-primary">
                  <Wrench className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{pharmacy.service}</p>
                </div>
              </div>
            )}

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-meddoc-primary">
                <MapPin className="w-full h-full" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-medium">{pharmacy.address}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {pharmacy.province && pharmacy.province}
                  {pharmacy.region && pharmacy.province && ", "}
                  {pharmacy.region && pharmacy.region}
                  {pharmacy.district && (pharmacy.province || pharmacy.region) && ", "}
                  {pharmacy.district && pharmacy.district}
                </p>
              </div>
            </div>

            {/* Contacts */}
            {pharmacy.contacts && pharmacy.contacts.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-meddoc-primary">
                  <Phone className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {pharmacy.contacts.map((contact) => (
                      <a
                        key={contact.id}
                        href={`tel:${contact.numero}`}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-meddoc-primary text-xs font-medium hover:bg-blue-100 transition-colors"
                      >
                        {contact.numero}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Hours - Simplified for dashboard */}
            {pharmacy.horaires && pharmacy.horaires.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-meddoc-primary">
                  <Clock className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 mb-1">Horaires d'ouverture</p>
                  <div className="grid grid-cols-1 gap-1">
                    {pharmacy.horaires.slice(0, 2).map((horaire, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 text-xs">
                          {horaire.jour || "Tous les jours"}
                        </span>
                        <span className="text-gray-800 text-xs font-medium bg-gray-50 px-2 py-0.5 rounded">
                          {horaire.heure_debut} - {horaire.heure_fin}
                        </span>
                      </div>
                    ))}
                    {pharmacy.horaires.length > 2 && (
                      <p className="text-xs text-meddoc-primary">+{pharmacy.horaires.length - 2} autres horaires</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PharmacyCardDashboard;
