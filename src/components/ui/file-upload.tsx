import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  value: string;
  accept?: string;
  onChange: (name: string, value: string) => void;
  onFileChange?: (file: File) => void;
}

export function FileUpload({
  id,
  name,
  label,
  value,
  accept = "image/*",
  onChange,
  onFileChange,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
    setPreviewUrl(e.target.value);
    setSelectedFile(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Créer une URL de prévisualisation pour le fichier
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onChange(name, file.name);
      if (onFileChange) {
        onFileChange(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Nettoyer l'URL de prévisualisation lors du démontage du composant
  useEffect(() => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  // Mettre à jour la prévisualisation lorsque la valeur change
  useEffect(() => {
    if (value && !selectedFile) {
      setPreviewUrl(value);
    }
  }, [value, selectedFile]);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="space-y-4">
        {/* Zone de prévisualisation */}
        {previewUrl && (
          <div className="flex items-center space-x-4">
            <img
              src={previewUrl}
              alt={`Aperçu ${label}`}
              className="h-20 w-50 object-contain rounded-lg border p-2"
            />
            <span className="text-sm text-gray-500">
              {selectedFile ? 'Nouveau fichier sélectionné' : 'Fichier actuel'}
            </span>
          </div>
        )}
        
        {/* Zone de sélection de fichier */}
        <div className="flex gap-2">
          <Input
            id={id}
            name={name}
            value={value}
            onChange={handleUrlChange}
            placeholder="URL ou nom du fichier"
            className="flex-1"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />
          <Button type="button" variant="outline" onClick={handleButtonClick}>
            Parcourir
          </Button>
        </div>
      </div>
    </div>
  );
}
