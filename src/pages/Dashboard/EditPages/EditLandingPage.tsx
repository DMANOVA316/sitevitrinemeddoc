import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

export default function EditLandingPage() {
  const [backgroundImage, setBackgroundImage] = useState<File | null>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      backgroundImage: backgroundImage,
    };
    // send data to server when the server is ready for that XD
    console.log(data);
  };

  return (
    <form
      encType="multipart/form-data"
      className="flex flex-col gap-2 p-5 shadow w-3/4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="font-bold text-center">Modifier le Landing page</h1>
      <Label>Image de fond</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setBackgroundImage((e.target as HTMLInputElement).files![0])
        }
      />
      <Button type="submit">Valider</Button>
    </form>
  );
}
