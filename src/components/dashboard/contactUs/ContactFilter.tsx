import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterType = "all" | "unread" | "read";

interface ContactFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filterOptions = [
  { value: "all", label: "Tous les messages" },
  { value: "unread", label: "Non lus" },
  { value: "read", label: "Lus" },
];

export default function ContactFilter({
  currentFilter,
  onFilterChange,
}: ContactFilterProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Messages de contact</h2>
      <Select
        value={currentFilter}
        onValueChange={(value: FilterType) => onFilterChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
