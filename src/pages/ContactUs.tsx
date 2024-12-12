import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { contactService } from '@/services/contactService';
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  contact: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const contactData = {
        nom: data.nom,
        email: data.email,
        contact: data.contact,
        service: data.service,
        message: data.message,
      };

      await contactService.addContact(contactData);
      toast.success("Nous vous remercions pour votre message.");

      // Réinitialiser les valeurs du formulaire
      reset();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-xl border border-gray-200">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Nous Contacter</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Nom</label>
              <Input type="text" {...register('nom')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <Input type="email" {...register('email')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Contact</label>
              <Input type="text" {...register('contact')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Service</label>
              <Select {...register('service')}>
                <SelectTrigger className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="service1" value={"service1"}>
                    Solutions Numériques
                  </SelectItem>
                  <SelectItem key="service2" value="service2">
                    Community Management
                  </SelectItem>
                  <SelectItem key="service3" value="service3">
                    Services de Conseil
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Message</label>
              <Textarea {...register('message')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={4} />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-sm">Envoyer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
