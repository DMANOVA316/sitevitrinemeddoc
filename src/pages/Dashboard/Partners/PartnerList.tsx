import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Partner from "./Partner";
import AddPartner from "@/components/dashboard/Partner/AddPartner";
import EditPartner from "@/components/dashboard/Partner/EditPartner";
import RemovePartner from "@/components/dashboard/Partner/RemovePartner";
import { usePartnerRedux } from "@/hooks/use-partner-redux";
import EmptyData from "@/components/EmptyData";

export default function PartnerList() {
  const { partners, showAddPartnerModal, getPartners } = usePartnerRedux();
  const [researchVal, setResearchVal] = useState("");

  useEffect(() => {
    getPartners();
  }, []);

  const filteredPartners = partners.filter(
    (partner) =>
      partner.nom_partenaire
        .toLowerCase()
        .includes(researchVal.toLowerCase()) ||
      partner.lien.toLowerCase().includes(researchVal.toLowerCase())
  );

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 p-4 bg-white border-b">
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
          onClick={() => showAddPartnerModal(true)}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-500"
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
              <EmptyData
                text="Aucune partenaire"
                tips="Ajouter une partenaire"
              />
            )}
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <Partner key={partner.id} partner={partner} />
          ))
        )}
      </div>

      <AddPartner />
      <EditPartner />
      <RemovePartner />
    </div>
  );
}
