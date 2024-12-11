import { useEffect } from "react";
import { usePharmacyRedux } from "@/hooks/use-pharmacy-redux";
import PharmacyCard from "./PharmacyCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PharmacyList = () => {
  const {
    pharmacies,
    isLoading,
    error,
    getPharmacies,
    setCurrentPharmacy,
    setAddPharmacyOpen,
    setEditPharmacyOpen,
    setRemovePharmacyOpen,
  } = usePharmacyRedux();

  useEffect(() => {
    getPharmacies();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-meddoc-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-600">Une erreur s'est produite lors du chargement des pharmacies.</p>
        <Button onClick={getPharmacies} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pharmacies</h2>
        <Button
          onClick={() => {
            setCurrentPharmacy(null);
            setAddPharmacyOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter une pharmacie
        </Button>
      </div>

      {pharmacies.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune pharmacie trouvée
          </h3>
          <p className="text-gray-500">
            Commencez par ajouter une nouvelle pharmacie.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <PharmacyCard
              key={pharmacy.id}
              pharmacy={pharmacy}
              isEditable
              onEdit={() => {
                setCurrentPharmacy(pharmacy);
                setEditPharmacyOpen(true);
              }}
              onDelete={() => {
                setCurrentPharmacy(pharmacy);
                setRemovePharmacyOpen(true);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PharmacyList;
