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
import { useInfoMeddocContext } from "@/contexts/InfoMeddocContext";
import { Info_page_meddoc } from "@/types";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditInfo() {
  const { info, isEditModalOpen, setIsEditModalOpen, handleUpdateInfo } =
    useInfoMeddocContext();

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
    if (info) {
      setFormData(info);
    }
  }, [info]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdateInfo(formData, selectedFiles);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
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
                onClick={() => setIsEditModalOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
