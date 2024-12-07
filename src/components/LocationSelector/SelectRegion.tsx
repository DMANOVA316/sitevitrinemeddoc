import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Region {
  "@id": string;
  name: string;
  province: {
    "@id": string;
    name: string;
  };
}

interface SelectRegionProps {
  regions: Region[];
  value: string;
  onChange: (value: string) => void;
}

const SelectRegion: React.FC<SelectRegionProps> = ({
  regions,
  value,
  onChange,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Région" />
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region["@id"]} value={region["@id"]}>
            {region.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectRegion;
