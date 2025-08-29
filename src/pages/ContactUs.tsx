import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PageTitle from "@/components/PageTitle";
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
import { FacebookIcon, InstagramIcon, LinkedinIcon ,MessageCircleIcon, TwitterIcon} from "./SocialIcons";

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

const ContactUs: React.FC = () => {
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
    <div className="py-8 sm:py-10 md:py-10 lg:py-14 min-h-screen bg-gradient-to-br from-meddoc-primary to-meddoc-secondary">
      <PageTitle 
        title="Contacts - MEDDoC"
        description="Contactez MEDDoC pour vos besoins en santé à Madagascar. Nous sommes là pour vous accompagner dans vos projets de santé digitale, consulting et formation."
        keywords="contact MEDDoC, nous contacter Madagascar, partenaire santé Madagascar, contact santé digitale, MEDDoC contact"
        canonicalUrl="https://meddoc.mg/contacts"
        ogImage="https://meddoc.mg/og-image-contact.png"
      />
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
                    <p className="text-sm sm:text-base font-medium">+261 38 96 555 44</p>
                    <p className="text-sm sm:text-base font-medium">+261 32 65 031 58</p>
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
                  <a href="https://www.facebook.com/MEDDOCHC"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
                              aria-label="Facebook"
                            >
                              <FacebookIcon />
                            </a>
                  <a href="https://www.instagram.com/meddoc.healthcare/"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
                             aria-label="Instagram"
                           >
                             <InstagramIcon/>
                           </a>
                   <a href="https://wa.me/261326503158"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
                              aria-label="WhatsApp"
                            >
                              <MessageCircleIcon />
                            </a>

                            <a
                              href="https://x.com/MEDDoCMG"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
                              aria-label="X (Twitter)"
                            >
                              <TwitterIcon />
                            </a>
                              <a href="https://www.linkedin.com/company/meddochealthcare/"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110"
                                                  aria-label="LinkedIn"
                                >
                                <LinkedinIcon />
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
                          <SelectItem value="Solutions digitales santé">
                          Solutions digitales santé
                          </SelectItem>
                          <SelectItem value="Community management médical">
                          Community management médical
                          </SelectItem>
                          <SelectItem value="Formations santé">
                            Formations santé
                          </SelectItem>
                          <SelectItem value="Consulting santé et stratégie">
                          Consulting santé et stratégie
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
