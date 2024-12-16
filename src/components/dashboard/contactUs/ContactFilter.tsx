import React from "react";

type FilterType = "all" | "viewed" | "unviewed";

interface ContactFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function ContactFilter({
  currentFilter,
  onFilterChange,
}: ContactFilterProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Filtrer les messages
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg font-medium transition-colors w-full sm:w-auto ${
            currentFilter === "all"
              ? "bg-meddoc-primary text-white hover:bg-meddoc-primary"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => onFilterChange("unviewed")}
          className={`px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg font-medium transition-colors w-full sm:w-auto ${
            currentFilter === "unviewed"
              ? "bg-meddoc-primary text-white "
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Non lus
        </button>
        <button
          onClick={() => onFilterChange("viewed")}
          className={`px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg font-medium transition-colors w-full sm:w-auto ${
            currentFilter === "viewed"
              ? "bg-meddoc-primary text-white "
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Lus
        </button>
      </div>
    </div>
  );
}
