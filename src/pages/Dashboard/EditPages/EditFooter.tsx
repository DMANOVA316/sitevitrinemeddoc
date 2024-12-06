import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";

const EditFooter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [copyright, setCopyright] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      services: services,
      email: email,
      tel: tel,
      address: address,
      copyright: copyright,
    };
    // send data to server when the server is ready for that XD
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-2 p-5 shadow w-3/4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="font-bold text-center">Modifier le Footer</h1>
      <Label>Titre du site</Label>
      <Input
        type="text"
        name="title"
        placeholder="Titre du site"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Label>Descriptions</Label>
      <Input
        type="text"
        name="description"
        placeholder="Description du site"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Label>Nos services</Label>
      <Textarea
        name="services"
        placeholder="Liste des services"
        className="resize-none"
        value={services}
        onChange={(e) => setServices(e.target.value)}
        required
      ></Textarea>

      <Label>Contacts</Label>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        name="tel"
        placeholder="Numero telephone"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        required
      />
      <Input
        type="text"
        name="address"
        placeholder="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <Label>Copyright</Label>
      <Input
        type="text"
        placeholder="Copyright"
        value={copyright}
        onChange={(e) => setCopyright(e.target.value)}
        required
      />

      <Button type="submit">Valider</Button>
    </form>
  );
};

export default EditFooter;
