import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { contactService } from "@/services/contactService";
import { toast } from "sonner";
import useContactRedux from "@/hooks/use-contact-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  contact: z.string().optional(),
  vous_ete: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { contacts, status, error } = useContactRedux();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: Omit<ContactFormData, "date_envoye">) => {
    try {
      setIsSubmitting(true);
      const contactData = {
        nom: data.nom,
        email: data.email,
        contact: data.contact,
        vous_ete: data.vous_ete,
        service: data.service,
        message: data.message,
      };

      await contactService.createContact(contactData);
      toast.success("Nous vous remercions pour votre message.");
      reset();
    } catch (error) {
      console.error("Erreur lors de l'ajout du contact:", error);
      toast.error("Une erreur est survenue lors de l'envoi du message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-meddoc-primary">
        Nous Contacter
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name Section */}
        <Label className="font-semibold mb-4 block text-sm text-gray-700">
          Nom
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              {...register("nom")}
              type="text"
              placeholder="Nom"
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-400"
            />
            {errors.nom && (
              <p className="text-red-500 text-xs">{errors.nom.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="vous_ete"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-gray-100 w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-white-200">
                    <SelectValue placeholder="Vous êtes ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professionnel de santé">
                      Professionnel de santé
                    </SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="autres">Autres</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        {/* Dropdown Section  */}
        <Label className="font-semibold mb-4 block text-sm text-gray-700">
          Service
        </Label>
        <Controller
          name="service"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-gray-100 w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-white-200">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Solutions Numériques">
                  Solutions Numériques
                </SelectItem>
                <SelectItem value="Community Management">
                  Community Management
                </SelectItem>
                <SelectItem value="Services de Conseil">
                  Services de Conseil
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {/* Contact Information Section  */}
        <Label className="font-semibold mb-4 block text-sm text-gray-700">
          Contact Information
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email*"
              className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                <br />
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("contact")}
              type="tel"
              placeholder="Phone"
              className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        {/* Questions / Comments Section  */}
        <div>
          <Label className="font-semibold mb-4 block text-sm text-gray-700">
            Questions / Comments
          </Label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Message*"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-400"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
        </Button>
      </form>
    </div>
  );
};

export default ContactUs;
