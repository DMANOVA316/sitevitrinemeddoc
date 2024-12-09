import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyCard from "@/components/Pharmacie/PharmacyCard";
import { Building2, Search } from "lucide-react";
import { pharmacyService } from "@/services/pharmacyService";

const Pharmacies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const data = await pharmacyService.getPharmacies();
        setPharmacies(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des pharmacies:", error);
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.nom_pharmacie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-meddoc-primary mb-4">
          Recherche de Pharmacies
        </h1>
        <p className="text-gray-600 mb-8">
          Trouvez facilement les pharmacies près de chez vous
        </p>
        <div className="relative max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Rechercher une pharmacie par nom ou adresse..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all" className="px-8">Toutes les pharmacies</TabsTrigger>
              <TabsTrigger value="duty" className="px-8">Pharmacies de garde</TabsTrigger>
            </TabsList>
          </div>

          {loading ? (
            <div className="mt-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meddoc-primary mx-auto"></div>
              <p className="text-gray-500 mt-4">Chargement des pharmacies...</p>
            </div>
          ) : (
            <>
              <TabsContent value="all" className="mt-6">
                <div className="flex flex-col items-center">
                  <div className="grid gap-6 w-full justify-items-center" 
                       style={{ 
                         display: 'grid',
                         gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 384px), 1fr))',
                         maxWidth: '1280px',
                         margin: '0 auto'
                       }}>
                    {filteredPharmacies.length > 0 ? (
                      filteredPharmacies.map((pharmacy) => (
                        <div key={pharmacy.id} className="w-full flex justify-center">
                          <PharmacyCard pharmacy={pharmacy} />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Aucune pharmacie trouvée.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="duty" className="mt-6">
                <div className="flex flex-col items-center">
                  <div className="grid gap-6 w-full justify-items-center"
                       style={{ 
                         display: 'grid',
                         gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 384px), 1fr))',
                         maxWidth: '1280px',
                         margin: '0 auto'
                       }}>
                    {filteredPharmacies
                      .filter((pharmacy) => pharmacy.de_garde)
                      .map((pharmacy) => (
                        <div key={pharmacy.id} className="w-full flex justify-center">
                          <PharmacyCard pharmacy={pharmacy} />
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Pharmacies;