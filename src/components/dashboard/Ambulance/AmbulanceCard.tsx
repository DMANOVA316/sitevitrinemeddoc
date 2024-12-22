import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { Ambulance } from "@/store/ambulanceSlice";

interface AmbulanceCardProps {
  ambulance: Ambulance;
}

const AmbulanceCard: React.FC<AmbulanceCardProps> = ({ ambulance }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {ambulance.nom}
            </h3>
            <div className="flex items-center text-gray-500 gap-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{ambulance.address}</span>
            </div>

            {ambulance.contacts && ambulance.contacts.length > 0 && (
              <div className="flex items-center text-gray-500 gap-1">
                <Phone className="h-4 w-4" />
                <span className="text-sm">
                  {ambulance.contacts.map((contact, index) => (
                    <span key={index}>
                      {contact.numero}
                      {index < ambulance.contacts.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4 md:mt-0 mt-4">
            <div className="flex flex-wrap gap-2">
              {ambulance.province && (
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {ambulance.province}
                </span>
              )}
              {ambulance.region && (
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {ambulance.region}
                </span>
              )}
              {ambulance.commune && (
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {ambulance.commune}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbulanceCard;
