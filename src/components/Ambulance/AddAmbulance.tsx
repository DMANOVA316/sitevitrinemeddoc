import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Ambulance } from '@/redux/features/ambulanceSlice';
import { Plus, Trash2 } from 'lucide-react';

const contactSchema = z.object({
  numero: z.string().min(8, 'Le numéro doit contenir au moins 8 caractères'),
});

const ambulanceSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  province: z.string().min(2, 'La province est requise'),
  region: z.string().optional(),
  district: z.string().optional(),
  commune: z.string().min(2, 'La commune est requise'),
  contacts: z.array(contactSchema),
});

type AmbulanceFormData = z.infer<typeof ambulanceSchema>;

interface AddAmbulanceProps {
  ambulance?: Ambulance;
  onSubmit: (data: AmbulanceFormData) => void;
}

const AddAmbulance: React.FC<AddAmbulanceProps> = ({ ambulance, onSubmit }) => {
  const form = useForm<AmbulanceFormData>({
    resolver: zodResolver(ambulanceSchema),
    defaultValues: {
      nom: ambulance?.nom || '',
      address: ambulance?.address || '',
      province: ambulance?.province || '',
      region: ambulance?.region || '',
      district: ambulance?.district || '',
      commune: ambulance?.commune || '',
      contacts: ambulance?.contacts || [{ numero: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province*</FormLabel>
                <FormControl>
                  <Input placeholder="Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Région</FormLabel>
                <FormControl>
                  <Input placeholder="Région" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input placeholder="District" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commune"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commune*</FormLabel>
                <FormControl>
                  <Input placeholder="Commune" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Contacts</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ numero: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un contact
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-4">
              <FormField
                control={form.control}
                name={`contacts.${index}.numero`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Numéro {index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {ambulance ? 'Modifier' : 'Ajouter'} l'ambulance
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAmbulance;
