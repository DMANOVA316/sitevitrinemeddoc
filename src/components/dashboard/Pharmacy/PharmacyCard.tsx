import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";

interface PharmacyCardProps {
  pharmacy: Pharmacy;
}

const PharmacyCard = ({ pharmacy }: PharmacyCardProps) => {
  return (
    <Card className="w-full h-full group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border border-gray-100 rounded-xl">
      {/* Status Bar - Green for duty pharmacies */}
      {pharmacy.de_garde && (
        <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-500 w-full"></div>
      )}

      {/* Regular Bar for non-duty pharmacies */}
      {!pharmacy.de_garde && (
        <div className="h-1.5 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary w-full"></div>
      )}

      <CardContent className="p-5 sm:p-6">
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

                {/* External Link Button */}
                <button className="text-gray-400 hover:text-meddoc-primary transition-colors p-1 rounded-full hover:bg-gray-50">
                  <ExternalLink className="w-4 h-4" />
                </button>
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
              <p className="text-sm text-gray-700 font-medium">
                {pharmacy.address}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {pharmacy.province && pharmacy.province}
                {pharmacy.region && pharmacy.province && ", "}
                {pharmacy.region && pharmacy.region}
                {pharmacy.district &&
                  (pharmacy.province || pharmacy.region) &&
                  ", "}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyCard;
