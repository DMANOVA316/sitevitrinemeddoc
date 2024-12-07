import { PartnerType } from "@/types";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PartnerCard({ partner }: { partner: PartnerType }) {
  return (
    <Link to={partner.lien} className="group block" target="_blank" rel="noopener noreferrer">
      <Card className="p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center justify-center mb-6">
          <img 
            src={partner.logo} 
            alt={`${partner.nom_partenaire}'s logo`} 
            className="h-16 w-auto object-contain"
          />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-slate-900 group-hover:text-meddoc-primary transition-colors text-center">
          {partner.nom_partenaire}
        </h3>
        <div className="flex items-center justify-center text-meddoc-primary mt-4">
          Visiter le site <ArrowUpRight className="ml-2 h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
}
