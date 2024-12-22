import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import LocationSelector from "@/components/LocationSelector/LocationSelector";
import { Label } from "@/components/ui/label";
import { useAmbulanceRedux } from "@/hooks/use-ambulance-redux";
import { toast } from "sonner";

const contactSchema = z.object({
  numero: z.string().min(8, "Le numéro doit contenir au moins 8 caractères"),
});

const ambulanceSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  province: z.string().min(2, "La province est requise"),
  region: z.string().optional(),
  district: z.string().optional(),
  commune: z.string().min(2, "La commune est requise"),
  contacts: z.array(contactSchema),
});

type AmbulanceFormData = z.infer<typeof ambulanceSchema>;

const EditAmbulance = () => {
  const {
    currentAmbulance,
    isEditAmbulanceOpen,
    showEditAmbulanceModal,
    handleUpdateAmbulance,
    loading,
    error,
  } = useAmbulanceRedux();
  const form = useForm<AmbulanceFormData>({
    resolver: zodResolver(ambulanceSchema),
    defaultValues: currentAmbulance,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  const handleLocationChange = (location: {
    province: string;
    region?: string;
    district?: string;
    commune: string;
  }) => {
    form.setValue("province", location.province);
    form.setValue("region", location.region || "");
    form.setValue("district", location.district || "");
    form.setValue("commune", location.commune);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = form.getValues();
      await handleUpdateAmbulance(formData);
      showEditAmbulanceModal(false);
      toast.success("Ajout reussi.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erreur lors de l'ajout"
      );
    }
    form.reset();
  };

  return (
    <Dialog open={isEditAmbulanceOpen} onOpenChange={showEditAmbulanceModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un partenaire</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de l'ambulance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse*</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <LocationSelector
                  onLocationChange={handleLocationChange}
                  initialValues={{
                    province: form.getValues("province"),
                    region: form.getValues("region"),
                    district: form.getValues("district"),
                    commune: form.getValues("commune"),
                  }}
                />
              </div>

              <div className="col-span-2">
                <Label className="block mb-2">Contacts*</Label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name={`contacts.${index}.numero`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Numéro de téléphone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                      className="shrink-0"
                      disabled={index === 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ numero: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un contact
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAmbulance;
