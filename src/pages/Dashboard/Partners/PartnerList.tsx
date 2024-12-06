import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Partner from "./Partner";
import { usePartnerContext } from "@/contexts/PartnerContext";
import AddPartner from "@/components/dashboard/AddPartner";
import EditPartner from "@/components/dashboard/EditPartner";
import RemovePartner from "@/components/dashboard/RemovePartner";

export default function PartnerList() {
  const { partners, isAddPartnerOpen, setIsAddPartnerOpen } =
    usePartnerContext();
  const [researchVal, setResearchVal] = useState("");

  const filteredPartners = partners.filter(
    (partner) =>
      partner.nom_partenaire
        .toLowerCase()
        .includes(researchVal.toLowerCase()) ||
      partner.lien.toLowerCase().includes(researchVal.toLowerCase())
  );

  return (
    <div className="flex flex-col shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex gap-4 flex-1">
          <Input
            type="text"
            placeholder="Rechercher un partenaire..."
            value={researchVal}
            onChange={(e) => setResearchVal(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button
          onClick={() => setIsAddPartnerOpen(true)}
          className="bg-blue-600 hover:bg-blue-500"
        >
          Ajouter un partenaire
        </Button>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
        <div className="col-span-1">ID</div>
        <div className="col-span-2">Logo</div>
        <div className="col-span-3">Nom</div>
        <div className="col-span-4">Site web</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className="bg-white">
        {filteredPartners.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            {researchVal ? (
              <>
                <svg
                  className="w-16 h-16 mb-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-lg">Aucun partenaire trouvé</p>
                <p className="text-sm">
                  Aucun résultat pour la recherche "{researchVal}"
                </p>
              </>
            ) : (
              <>
                <svg
                  className="w-16 h-16 mb-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 9h4m-4 3h4"
                  />
                </svg>
                <p className="text-lg">Pas encore de partenaire</p>
                <p className="text-sm">
                  Cliquez sur "Ajouter un partenaire" pour commencer
                </p>
              </>
            )}
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <Partner partner={partner} key={partner.id} />
          ))
        )}
      </div>

      {/* Modals */}
      <AddPartner />
      <EditPartner />
      <RemovePartner />
    </div>
  );
}
