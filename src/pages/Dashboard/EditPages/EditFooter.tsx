import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditPagesContext } from "@/contexts/EditPagesContext";

const EditFooter = () => {
  const { isFooterModalOpen, setIsFooterModalOpen } = useEditPagesContext();
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [addresse, setAddresse] = useState("");
  const [copyright, setCopyright] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: email,
      contact: contact,
      addresse: addresse,
      copyright: copyright,
    };
    // send data to server when the server is ready for that XD
    console.log(data);
    setIsFooterModalOpen(false);
  };

  return (
    <Dialog open={isFooterModalOpen} onOpenChange={setIsFooterModalOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <form>
          <DialogHeader>
            <DialogTitle>Modifier le Footer</DialogTitle>
          </DialogHeader>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Téléphone</Label>
            <Input
              type="tel"
              name="contact"
              placeholder="Téléphone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Adresse</Label>
            <Input
              type="text"
              name="address"
              placeholder="Adresse"
              value={addresse}
              onChange={(e) => setAddresse(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Copyright</Label>
            <Input
              type="text"
              name="copyright"
              placeholder="Copyright"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFooterModalOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFooter;
