import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Partner from "./Partner";
import { usePartnerContext } from "@/contexts/PartnerContext";
import AddPartner from "@/components/dashboard/AddPartner";
import EditPartner from "@/components/dashboard/EditPartner";
import RemovePartner from "@/components/dashboard/RemovePartner";

export default function PartnerList() {
  const { partners, isAddPartnerOpen, setIsAddPartnerOpen } = usePartnerContext();
  const [researchVal, setResearchVal] = useState("");

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
        {partners.map((partner) => (
          <Partner partner={partner} key={partner.id} />
        ))}
      </div>

      {/* Modals */}
      <AddPartner />
      <EditPartner />
      <RemovePartner />
    </div>
  );
}
