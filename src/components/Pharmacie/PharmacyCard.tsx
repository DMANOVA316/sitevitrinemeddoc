import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, Building2 } from "lucide-react";
interface PharmacyCardProps {
  pharmacy: Pharmacy;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PharmacyCard = ({
  pharmacy,
  isEditable,
  onEdit,
  onDelete,
}: PharmacyCardProps) => {
  return (
    <Card className="w-full h-full animate-fade-up group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Nom de la pharmacie */}
          <div className="flex items-center gap-6">
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
            <div className="flex flex-col justify-start items-start">
              <h3 className="text-xl font-semibold text-gray-900">
                {pharmacy.nom_pharmacie}
              </h3>
              {pharmacy.de_garde && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  De garde
                </span>
              )}
            </div>
            {isEditable && (
              <div className="flex gap-2">
                <button
                  onClick={onEdit}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Adresse */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <p className="text-gray-700">{pharmacy.address}</p>
              <p className="text-sm text-gray-500">
                {pharmacy.province && pharmacy.province + ", "}
                {pharmacy.region && pharmacy.region + ","}
                {pharmacy.district && pharmacy.district}
              </p>
            </div>
          </div>

          {/* Contacts */}
          {pharmacy.contacts && pharmacy.contacts.length > 0 && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500 mt-1" />
              <div className="flex-1">
                {pharmacy.contacts.map((contact, index) => (
                  <p key={index} className="text-gray-700">
                    {contact.numero}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Horaires */}
          {pharmacy.horaires && pharmacy.horaires.length > 0 && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div className="flex-1 space-y-1">
                {pharmacy.horaires.map((horaire, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {horaire.heure_debut} - {horaire.heure_fin}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyCard;
