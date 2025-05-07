import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CreateDocumentDTO, DocumentCategory, DocumentFileType } from "@/types/document";
import useDocumentUpload from "@/hooks/use-document-upload";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, FileUp, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface AddDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (document: CreateDocumentDTO, file: File) => Promise<boolean>;
}

/**
 * Composant pour ajouter un nouveau document
 */
const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DocumentCategory>("autre");
  const [fileType, setFileType] = useState<DocumentFileType>("other");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    isUploading,
    uploadProgress,
    uploadError,
    validateFile,
    fileType: detectedFileType,
  } = useDocumentUpload();

  // Réinitialiser le formulaire
  const resetForm = () => {
    setTitle("");
    setCategory("autre");
    setFileType("other");
    setIsPublic(false);
    setSelectedFile(null);
    setError(null);
  };

  // Gérer la fermeture du dialogue
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Gérer la sélection d'un fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Valider le fichier
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Détecter automatiquement le type de fichier
      const detectedType = detectedFileType as DocumentFileType;
      if (detectedType) {
        setFileType(detectedType);
      }
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    if (!title.trim()) {
      setError("Veuillez saisir un titre pour le document");
      return;
    }

    if (!selectedFile) {
      setError("Veuillez sélectionner un fichier");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Créer le document
      const newDocument: CreateDocumentDTO = {
        title: title.trim(),
        file_url: "", // Sera rempli par le service
        file_type: fileType,
        is_public: isPublic,
        category,
      };

      // Ajouter le document
      const success = await onAdd(newDocument, selectedFile);
      if (success) {
        toast.success("Document ajouté avec succès");
        handleClose();
      }
    } catch (error) {
      setError(error.message || "Une erreur s'est produite lors de l'ajout du document");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau document</DialogTitle>
          <DialogDescription>
            Ajoutez un document à la bibliothèque numérique. Les documents peuvent être des PDF, des
            fichiers audio, des vidéos ou des images.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Titre du document */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre du document</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez le titre du document"
              required
            />
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as DocumentCategory)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="médecine">Médecine</SelectItem>
                <SelectItem value="pharmacie">Pharmacie</SelectItem>
                <SelectItem value="santé publique">Santé publique</SelectItem>
                <SelectItem value="formation">Formation</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type de fichier */}
          <div className="space-y-2">
            <Label htmlFor="fileType">Type de fichier</Label>
            <Select value={fileType} onValueChange={(value) => setFileType(value as DocumentFileType)}>
              <SelectTrigger id="fileType">
                <SelectValue placeholder="Sélectionnez un type de fichier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Visibilité */}
          <div className="flex items-center justify-between">
            <Label htmlFor="isPublic" className="cursor-pointer">
              Document public
            </Label>
            <Switch
              id="isPublic"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              aria-label="Document public"
            />
          </div>

          {/* Upload de fichier */}
          <div className="space-y-2">
            <Label htmlFor="file">Fichier</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-meddoc-primary file:text-white hover:file:bg-meddoc-primary/90"
                required
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => document.getElementById("file")?.click()}
                title="Sélectionner un fichier"
              >
                <FileUp className="h-4 w-4" />
              </Button>
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Fichier sélectionné: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Upload en cours: {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
          </div>

          {/* Message d'erreur */}
          {(error || uploadError) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || uploadError}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || !selectedFile}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ajout en cours...
                </>
              ) : (
                "Ajouter le document"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;
