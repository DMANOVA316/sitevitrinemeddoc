import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function PartnerCard({ partner }: { partner: PartnerType }) {
  return (
    <Link
      to={partner.lien}
      className="group block w-full"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-4 flex flex-col items-center space-y-6">
          <div className="w-full aspect-[3/2] relative overflow-hidden rounded-lg bg-white">
            <img
              src={partner.logo}
              alt={`${partner.nom_partenaire}'s logo`}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
         
        </div>
      </Card>
    </Link>
  );
}
