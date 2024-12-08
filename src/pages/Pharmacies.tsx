import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, Building2, Search } from "lucide-react";
import { pharmacyService } from "@/services/pharmacyService";

interface Pharmacy {
  id: number;
  nom_pharmacie: string;
  address: string;
  contacts: { numero: string }[];
  horaires: { heure_debut: string; heure_fin: string }[];
  photo_profil: string;
  province: string;
  region: string;
  district: string;
  commune: string;
  de_garde: boolean;
}

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

  const PharmacyCard = ({ pharmacy }: { pharmacy: Pharmacy }) => (
    <Card className="animate-fade-up group hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-meddoc-primary/10 flex items-center justify-center flex-shrink-0">
            {pharmacy.photo_profil ? (
              <img
                src={pharmacy.photo_profil}
                alt={pharmacy.nom_pharmacie}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add('fallback-icon');
                }}
              />
            ) : (
              <Building2 className="w-8 h-8 text-meddoc-primary" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-meddoc-primary group-hover:text-meddoc-primary/80 transition-colors truncate">
              {pharmacy.nom_pharmacie}
            </h3>
            {pharmacy.de_garde && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                De garde
              </span>
            )}
          </div>
        </div>
        <div className="space-y-4 text-gray-600">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="h-5 w-5 text-meddoc-primary/70" />
            <span className="text-sm">{pharmacy.address}</span>
          </div>
          {pharmacy.contacts && pharmacy.contacts.length > 0 && (
            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone className="h-5 w-5 text-meddoc-primary/70 mt-1" />
              <div className="flex flex-col gap-1">
                {pharmacy.contacts.map((contact, index) => (
                  <span key={index} className="text-sm">
                    {contact.numero}
                  </span>
                ))}
              </div>
            </div>
          )}
          {pharmacy.horaires && pharmacy.horaires.length > 0 && (
            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="h-5 w-5 text-meddoc-primary/70 mt-1" />
              <div className="flex flex-col gap-1">
                {pharmacy.horaires.map((horaire, index) => (
                  <span key={index} className="text-sm">
                    {horaire.heure_debut} - {horaire.heure_fin}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="border-t pt-4 mt-4">
            <span className="text-sm font-medium text-meddoc-primary mb-2 block">
              Situation géographique
            </span>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-500">Province</span>
                <p className="font-medium">{pharmacy.province}</p>
              </div>
              {pharmacy.region && (
                <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-500">Région</span>
                  <p className="font-medium">{pharmacy.region}</p>
                </div>
              )}
              {pharmacy.district && (
                <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-500">District</span>
                  <p className="font-medium">{pharmacy.district}</p>
                </div>
              )}
              <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-500">Commune</span>
                <p className="font-medium">{pharmacy.commune}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
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