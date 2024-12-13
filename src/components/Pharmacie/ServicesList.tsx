import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { SetStateAction } from "react";

const services = [
  "Médicaments sur ordonnance",
  "Médicaments en vente libre",
  "Préparations magistrales",
  "Conseils pharmaceutiques",
  "Éducation thérapeutique",
  "Planification familiale",
  "Vaccinations",
  "Suivi de la tension artérielle et du poids.",
  "Tests rapides",
  "Sevrage tabagique",
  "Cosmétiques et soins",
  "Produits pour bébés",
  "Orthopédie",
  "Équipements médicaux",
  "Location de matériel médical",
  "Accompagnement des femmes enceintes",
  "Recyclage de médicaments",
];

export default function ServicesList({
  value,
  onChange,
}: {
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Service" />
      </SelectTrigger>
      <SelectContent>
        {services.map((service) => (
          <SelectItem key={service} value={service}>
            {service}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
