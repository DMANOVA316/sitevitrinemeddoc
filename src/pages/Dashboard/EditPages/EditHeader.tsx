import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Header {
  title: string;
  service1: string;
  service2: string;
  service3: string;
  logo: globalThis.File | null;
}

const EditHeader = () => {
  const [formData, setFormData] = useState<Header>({
    title: "",
    service1: "",
    service2: "",
    service3: "",
    logo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form className="p-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Colonne de gauche */}
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Titre du site
              </Label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Nos services {">"} Option 1
              </Label>
              <Input
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    service1: e.target.files?.[0]?.name || "",
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Nos services {">"} Option 2
              </Label>
              <Input
                type="text"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    service2: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Nos services {">"} Option 3
              </Label>
              <Input
                type="text"
                value={formData.service3}
                onChange={(e) =>
                  setFormData({ ...formData, service3: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Logo du site
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    logo: e.target.files?.[0] || null,
                  })
                }
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => console.log("Annuler")}
              >
                Annuler
              </Button>
              <div>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Enregistrer", formData);
                  }}
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </form>
    </div>
  );
};

export default EditHeader;
