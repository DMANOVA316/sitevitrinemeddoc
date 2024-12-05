import React from "react";

const SelectProvince:React.FC<SelectProvinceProps> = ({ provinces, selectedProvince, onSelectProvince }) => {
    return (
        <div className="mb-3">
            <select
                value={selectedProvince}
                onChange={(e) => onSelectProvince(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">-- Sélectionner une province --</option>
                {provinces.map((province) => (
                    <option key={province["@id"]} value={province["@id"]}>
                        {province.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectProvince;
