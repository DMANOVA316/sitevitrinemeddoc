import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { DocumentCategory, DocumentFileType } from "@/types/document";
import { Filter, X } from "lucide-react";

interface DocumentFiltersProps {
  onCategoryChange: (category: DocumentCategory | null) => void;
  onFileTypeChange: (fileType: DocumentFileType | null) => void;
  onReset: () => void;
}

/**
 * Composant pour filtrer les documents par catégorie et type de fichier
 */
const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  onCategoryChange,
  onFileTypeChange,
  onReset,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<DocumentFileType | null>(null);

  // Gérer le changement de catégorie
  const handleCategoryChange = (value: string) => {
    // Utiliser un setTimeout pour éviter les mises à jour en boucle
    setTimeout(() => {
      const category = value === "all" ? null : (value as DocumentCategory);
      setSelectedCategory(category);
      onCategoryChange(category);
    }, 0);
  };

  // Gérer le changement de type de fichier
  const handleFileTypeChange = (value: string) => {
    // Utiliser un setTimeout pour éviter les mises à jour en boucle
    setTimeout(() => {
      const fileType = value === "all" ? null : (value as DocumentFileType);
      setSelectedFileType(fileType);
      onFileTypeChange(fileType);
    }, 0);
  };

  // Réinitialiser les filtres
  const handleReset = () => {
    // Utiliser un setTimeout pour éviter les mises à jour en boucle
    setTimeout(() => {
      setSelectedCategory(null);
      setSelectedFileType(null);
      onReset();
    }, 0);
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = selectedCategory !== null || selectedFileType !== null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtres
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 text-muted-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Réinitialiser
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filtre par catégorie */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Catégorie</Label>
          <RadioGroup
            value={selectedCategory === null ? "all" : selectedCategory}
            onValueChange={handleCategoryChange}
            className="space-y-1.5"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="category-all" />
              <Label htmlFor="category-all" className="cursor-pointer">
                Toutes les catégories
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="médecine" id="category-medicine" />
              <Label htmlFor="category-medicine" className="cursor-pointer">
                Médecine
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pharmacie" id="category-pharmacy" />
              <Label htmlFor="category-pharmacy" className="cursor-pointer">
                Pharmacie
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="santé publique" id="category-public-health" />
              <Label htmlFor="category-public-health" className="cursor-pointer">
                Santé publique
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="formation" id="category-training" />
              <Label htmlFor="category-training" className="cursor-pointer">
                Formation
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="autre" id="category-other" />
              <Label htmlFor="category-other" className="cursor-pointer">
                Autre
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Filtre par type de fichier */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Type de fichier</Label>
          <RadioGroup
            value={selectedFileType === null ? "all" : selectedFileType}
            onValueChange={handleFileTypeChange}
            className="space-y-1.5"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="type-all" />
              <Label htmlFor="type-all" className="cursor-pointer">
                Tous les types
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pdf" id="type-pdf" />
              <Label htmlFor="type-pdf" className="cursor-pointer">
                PDF
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="audio" id="type-audio" />
              <Label htmlFor="type-audio" className="cursor-pointer">
                Audio
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="type-video" />
              <Label htmlFor="type-video" className="cursor-pointer">
                Vidéo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="image" id="type-image" />
              <Label htmlFor="type-image" className="cursor-pointer">
                Image
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="type-other" />
              <Label htmlFor="type-other" className="cursor-pointer">
                Autre
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Bouton de réinitialisation */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleReset}
          disabled={!hasActiveFilters}
        >
          Réinitialiser les filtres
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentFilters;
