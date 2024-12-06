import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Commune {
    "@id": string;
    name: string;
    district: {
        "@id": string;
        name: string;
    };
}

interface SelectCommuneProps {
    communes: Commune[];
    value: string;
    onChange: (value: string) => void;
}

const SelectCommune: React.FC<SelectCommuneProps> = ({ communes, value, onChange }) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Commune" />
            </SelectTrigger>
            <SelectContent>
                {communes.map((commune) => (
                    <SelectItem key={commune["@id"]} value={commune["@id"]}>
                        {commune.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectCommune;
