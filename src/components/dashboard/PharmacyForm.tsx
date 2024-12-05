import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pharmacyService } from "@/services/pharmacyService";
import { toast } from "sonner";

const PharmacyForm = ({ pharmacy, onSave }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: pharmacy || {},
  });

  const onSubmit = async (data: any) => {
    try {
      if (pharmacy) {
        await pharmacyService.updatePharmacy(pharmacy.id, data);
        toast.success("Pharmacie mise à jour");
      } else {
        await pharmacyService.addPharmacy(data);
        toast.success("Pharmacie ajoutée");
      }
      onSave();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("name")} placeholder="Nom" />
      <Input {...register("address")} placeholder="Adresse" />
      <Input {...register("province")} placeholder="Province" />
      <Button type="submit">Enregistrer</Button>
    </form>
  );
};

export default PharmacyForm;
