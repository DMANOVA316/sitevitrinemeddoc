interface InfoFieldProps {
  label: string;
  value: string | null | undefined;
  formatter?: (value: string | null | undefined) => string;
}

export function InfoField({ label, value, formatter }: InfoFieldProps) {
  const displayValue = formatter ? formatter(value) : value || 'Non défini';
  
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="mt-1">{displayValue}</p>
    </div>
  );
}
