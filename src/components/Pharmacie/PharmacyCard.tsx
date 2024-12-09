import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

interface LocationData {
  "@type": string;
  name: string;
}

interface PharmacyCardProps {
  pharmacy: Pharmacy;
}

const PharmacyCard = ({ pharmacy }: PharmacyCardProps) => {
  const [locationData, setLocationData] = useState<{
    province?: LocationData;
    region?: LocationData;
    district?: LocationData;
    commune?: LocationData;
  }>({});

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const responses = await Promise.all([
          pharmacy.province && fetch(`https://localization.mg-dev.space${pharmacy.province}`),
          pharmacy.region && fetch(`https://localization.mg-dev.space${pharmacy.region}`),
          pharmacy.district && fetch(`https://localization.mg-dev.space${pharmacy.district}`),
          pharmacy.commune && fetch(`https://localization.mg-dev.space${pharmacy.commune}`)
        ]);

        const data = await Promise.all(
          responses.map(async (response) => {
            if (response && response.ok) {
              return await response.json();
            }
            return null;
          })
        );

        setLocationData({
          province: data[0],
          region: data[1],
          district: data[2],
          commune: data[3]
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données de localisation:", error);
      }
    };

    fetchLocationData();
  }, [pharmacy.province, pharmacy.region, pharmacy.district, pharmacy.commune]);

  return (
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
                <p className="font-medium">{locationData.province?.name || "Chargement..."}</p>
              </div>
              {pharmacy.region && (
                <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-500">Région</span>
                  <p className="font-medium">{locationData.region?.name || "Chargement..."}</p>
                </div>
              )}
              {pharmacy.district && (
                <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-500">District</span>
                  <p className="font-medium">{locationData.district?.name || "Chargement..."}</p>
                </div>
              )}
              <div className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-500">Commune</span>
                <p className="font-medium">{locationData.commune?.name || "Chargement..."}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyCard;