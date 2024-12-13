import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface District {
  "@id": string;
  name: string;
  region: {
    "@id": string;
    name: string;
  };
}

interface SelectDistrictProps {
  districts: District[];
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const SelectDistrict: React.FC<SelectDistrictProps> = ({
  districts,
  value,
  onChange,
  disabled,
}) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="District" />
      </SelectTrigger>
      <SelectContent>
        {districts.map((district) => (
          <SelectItem key={district["@id"]} value={district["@id"]}>
            {district.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDistrict;
