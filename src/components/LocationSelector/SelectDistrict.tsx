import React from "react";

const SelectDistrict:React.FC<SelectDistrictProps> = ({ districts, selectedDistrict, onSelectDistrict, disabled }) => {
    return (
        <div className="mb-3">
            <select
                value={selectedDistrict}
                onChange={(e) => onSelectDistrict(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!disabled}
            >
                <option value="">-- Sélectionner un district --</option>
                {districts.map((district) => (
                    <option key={district["@id"]} value={district["@id"]}>
                        {district.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectDistrict;
