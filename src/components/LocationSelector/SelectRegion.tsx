import React from "react";

const SelectRegion:React.FC<SelectRegionProps> = ({ regions, selectedRegion, onSelectRegion, disabled }) => {
    return (
        <div className="mb-3">
            <select
                value={selectedRegion}
                onChange={(e) => onSelectRegion(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!disabled}
            >
                <option value="">-- Sélectionner une région --</option>
                {regions.map((region) => (
                    <option key={region["@id"]} value={region["@id"]}>
                        {region.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectRegion;
