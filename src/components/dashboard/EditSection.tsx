import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface EditSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onEdit: () => void;
  children?: ReactNode;
}

export function EditSection({
  title,
  description,
  buttonText,
  onEdit,
  children,
}: EditSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
        <Button 
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-500"
        >
          {buttonText}
        </Button>
      </div>
      {children}
    </div>
  );
}
