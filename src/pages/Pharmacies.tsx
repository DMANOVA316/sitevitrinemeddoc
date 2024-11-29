import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  isOnDuty: boolean;
  openingHours: string;
}

const mockPharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "Pharmacie ANALAKELY",
    address: "Rue de l'Indépendance, Analakely",
    phone: "+261 20 22 235 54",
    isOnDuty: true,
    openingHours: "24/24",
  },
  {
    id: 2,
    name: "Pharmacie ANKADIFOTSY",
    address: "Route d'Ankadifotsy",
    phone: "+261 20 22 222 07",
    isOnDuty: false,
    openingHours: "8h-20h",
  },
  {
    id: 3,
    name: "Pharmacie MAHAMASINA",
    address: "Avenue de l'Indépendance, Mahamasina",
    phone: "+261 20 22 273 44",
    isOnDuty: true,
    openingHours: "24/24",
  },
];

const Pharmacies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(mockPharmacies);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockPharmacies.filter(
      (pharmacy) =>
        pharmacy.name.toLowerCase().includes(term.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(term.toLowerCase())
    );
    setPharmacies(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-meddoc-primary mb-8">
        Recherche de Pharmacies
      </h1>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Rechercher une pharmacie par nom ou adresse..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-xl"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Toutes les pharmacies</TabsTrigger>
          <TabsTrigger value="duty">Pharmacies de garde</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="animate-fade-up">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{pharmacy.name}</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{pharmacy.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{pharmacy.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{pharmacy.openingHours}</span>
                    </div>
                  </div>
                  {pharmacy.isOnDuty && (
                    <div className="mt-4">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        De garde
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="duty" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pharmacies
              .filter((pharmacy) => pharmacy.isOnDuty)
              .map((pharmacy) => (
                <Card key={pharmacy.id} className="animate-fade-up">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{pharmacy.name}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{pharmacy.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{pharmacy.openingHours}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        De garde
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pharmacies;