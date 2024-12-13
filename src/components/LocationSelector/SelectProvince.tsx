import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Province {
  "@id": string;
  name: string;
}

interface SelectProvinceProps {
  provinces: Province[];
  value: string;
  onChange: (value: string) => void;
}

const SelectProvince: React.FC<SelectProvinceProps> = ({
  provinces,
  value,
  onChange,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Province" />
      </SelectTrigger>
      <SelectContent>
        {provinces.map((province) => (
          <SelectItem key={province["@id"]} value={province["@id"]}>
            {province.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectProvince;
