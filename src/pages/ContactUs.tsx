import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { contactService } from "@/services/contactService";
import { toast } from "sonner";
import useContactRedux from "@/hooks/use-contact-redux";
import { Mail, Phone, User, MessageSquare, Building, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useScrollToTop from "@/hooks/useScrollToTop";

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
  // Défilement automatique vers le haut lors du chargement de la page
  useScrollToTop();

  const { addContact } = useContactRedux();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <div className="py-8 sm:py-10 md:py-12 lg:py-16 min-h-screen bg-gradient-to-br from-meddoc-primary to-meddoc-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Contact Info */}
            <div className="md:w-1/3 bg-gradient-to-br from-meddoc-fonce to-meddoc-primary p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Contactez-nous</h3>

              <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-75">Email</p>
                    <p className="text-sm sm:text-base font-medium">contact@meddoc.mg</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-75">Téléphone</p>
                    <p className="text-sm sm:text-base font-medium">+261389655544</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                    <Building className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-75">Adresse</p>
                    <p className="text-sm sm:text-base font-medium">Antananarivo, Madagascar</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:mt-16">
                <p className="text-xs sm:text-sm opacity-75">Suivez-nous</p>
                <div className="flex space-x-3 sm:space-x-4 mt-2">
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors hover:scale-110">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors hover:scale-110">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors hover:scale-110">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:w-2/3 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-meddoc-fonce">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* Full Name Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="font-medium text-xs sm:text-sm text-gray-700 flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-meddoc-primary" />
                      Nom
                    </Label>
                    <div className="relative">
                      <Input
                        {...register("nom")}
                        type="text"
                        placeholder="Votre nom"
                        className="w-full bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all"
                      />
                    </div>
                    {errors.nom && (
                      <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label className="font-medium text-xs sm:text-sm text-gray-700 flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-meddoc-primary" />
                      Vous êtes
                    </Label>
                    <Controller
                      name="vous_ete"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-gray-50 w-full border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all">
                            <SelectValue placeholder="Sélectionnez une option" />
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
                {/* Service Section */}
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  <Label className="font-medium text-xs sm:text-sm text-gray-700 flex items-center">
                    <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-meddoc-primary" />
                    Service concerné
                  </Label>
                  <Controller
                    name="service"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-gray-50 w-full border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solutions Numériques">
                            Solutions Numériques
                          </SelectItem>
                          <SelectItem value="Community Management">
                            Community Management
                          </SelectItem>
                          <SelectItem value="Formations">
                            Formations
                          </SelectItem>
                          <SelectItem value="Services de Conseil">
                            Services de Conseil
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {/* Contact Information Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="font-medium text-xs sm:text-sm text-gray-700 flex items-center">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-meddoc-primary" />
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Votre email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label className="font-medium text-xs sm:text-sm text-gray-700 flex items-center">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-meddoc-primary" />
                      Téléphone
                    </Label>
                    <div className="relative">
                      <Input
                        {...register("contact")}
                        type="tel"
                        placeholder="Votre numéro de téléphone"
                        className="w-full bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
                {/* Message Section */}
                <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
                  <Label className="font-medium text-xs sm:text-sm text-gray-700 flex items-center">
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-meddoc-primary" />
                    Votre message
                  </Label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 text-sm focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md sm:rounded-lg text-sm sm:text-base font-medium transition-all flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
