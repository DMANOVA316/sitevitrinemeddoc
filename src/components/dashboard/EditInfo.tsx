import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Info_page_meddoc } from "@/types";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";
import { toast } from "sonner";

export default function EditInfo() {
  const {
    infoMeddoc,
    showEditInformationModal,
    isEditInformationOpen,
    updateInformations,
    isLoading,
  } = useInfoMeddocRedux();

  const [formData, setFormData] = useState<Info_page_meddoc>({
    id: 0,
    titre_site: "",
    favicon: "",
    logo: "",
    email: "",
    addresse: "",
    copyrigth: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<{
    logo: File | null;
    favicon: File | null;
  }>({
    logo: null,
    favicon: null,
  });

  useEffect(() => {
    if (infoMeddoc) {
      setFormData(infoMeddoc);
    }
  }, [infoMeddoc]);

  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      updateInformations({ ...formData }, selectedFiles);
      toast.success("Informations mis a jours.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de ma mise a jours des informations",
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (name: "logo" | "favicon", file: File) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  return (
    <Dialog
      open={isEditInformationOpen}
      onOpenChange={showEditInformationModal}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier les informations du site</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations générales de votre site web.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Informations générales</TabsTrigger>
            <TabsTrigger value="media">Médias</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit}>
            <TabsContent value="general" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="titre_site">Titre du site</Label>
                <Input
                  id="titre_site"
                  name="titre_site"
                  value={formData.titre_site}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="addresse">Adresse</Label>
                <Input
                  id="addresse"
                  name="addresse"
                  value={formData.addresse}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="copyrigth">Copyright</Label>
                <Input
                  id="copyrigth"
                  name="copyrigth"
                  value={formData.copyrigth}
                  onChange={handleChange}
                />
              </div>
            </TabsContent>
            <TabsContent value="media" className="space-y-4 mt-4">
              <FileUpload
                id="logo"
                name="logo"
                label="Logo du site"
                value={formData.logo}
                onChange={handleFileChange}
                onFileChange={(file) => handleFileSelect("logo", file)}
                accept="image/*"
              />
              <FileUpload
                id="favicon"
                name="favicon"
                label="Favicon"
                value={formData.favicon}
                onChange={handleFileChange}
                onFileChange={(file) => handleFileSelect("favicon", file)}
                accept=".ico,.png"
              />
            </TabsContent>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => showEditInformationModal(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
