import { Label } from "@/components/ui/label";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";
import { PHARMACY_SERVICES } from "@/constants/pharmacy";
import {
  servicesFormArrayToString,
  servicesStringToFormArray,
} from "@/utils/servicesUtils";

// Convert the services array to MultiSelectOption format
const serviceOptions: MultiSelectOption[] = PHARMACY_SERVICES.map(
  (service) => ({
    label: service,
    value: service,
  })
);

interface ServicesListProps {
  value?: string | null;
  onChange: (value: string) => void;
  className?: string;
}

export default function ServicesList({
  value,
  onChange,
  className,
}: ServicesListProps) {
  // Convert string value to array for the multi-select component
  const selectedServices = servicesStringToFormArray(value);

  // Handle changes from the multi-select component
  const handleSelectionChange = (selectedArray: string[]) => {
    // Convert array back to string for storage
    const servicesString = servicesFormArrayToString(selectedArray);
    onChange(servicesString);
  };

  return (
    <div className={className}>
      <Label className="text-sm font-medium text-gray-700">Services</Label>
      <MultiSelect
        options={serviceOptions}
        selected={selectedServices}
        onChange={handleSelectionChange}
        placeholder="Sélectionner les services (optionnel)..."
        className="mt-1"
      />
    </div>
  );
}
