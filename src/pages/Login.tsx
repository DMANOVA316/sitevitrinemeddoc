import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import supabase from "@/utils/supabase";
import { Lock, Mail, User, LogIn } from "lucide-react";
import { SiteLogo } from "@/components/ui/site-logo";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Login attempt with:", values);

      // Connexion avec Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Connexion réussie, Bienvenue !");
      navigate("/dashboard"); // Rediriger vers le tableau de bord après une connexion réussie
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de la connexion";
      toast.error(errorMessage);
    }
  };

  // Function to scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-meddoc-fonce via-sky-500/30 to-meddoc-fonce">
      {/* Decorative Elements - Responsive sizes and positions */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-meddoc-primary/20 rounded-full blur-3xl -ml-24 sm:-ml-32 -mt-24 sm:-mt-32"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-meddoc-secondary/20 rounded-full blur-3xl -mr-24 sm:-mr-32 -mb-24 sm:-mb-32"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-md space-y-6 sm:space-y-8 px-2 xs:px-0"
      >
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Top gradient bar */}
          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-meddoc-primary to-meddoc-secondary"></div>

          <div className="p-5 xs:p-6 sm:p-8 md:p-10">
            {/* Logo - Responsive size */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <SiteLogo imgClassName="h-12 sm:h-14 md:h-16 object-contain" showText={false} />
            </div>

            {/* Header - Responsive text sizes */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-meddoc-fonce mb-1 sm:mb-2">Connexion</h1>
              <p className="text-sm sm:text-base text-gray-500">Connectez-vous à votre compte MEDDoC</p>
            </div>

            {/* Form - Improved spacing for mobile */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center mb-1.5 sm:mb-2">
                        <Mail size={16} className="text-meddoc-primary mr-1.5 sm:mr-2 sm:size-5" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700">Adresse email</span>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="exemple@email.com"
                          type="email"
                          className="bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all rounded-md sm:rounded-lg h-9 sm:h-10 text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center mb-1.5 sm:mb-2">
                        <Lock size={16} className="text-meddoc-primary mr-1.5 sm:mr-2 sm:size-5" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700">Mot de passe</span>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary transition-all rounded-md sm:rounded-lg h-9 sm:h-10 text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm mt-1" />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 sm:mt-3"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-meddoc-primary to-meddoc-secondary hover:from-meddoc-primary/90 hover:to-meddoc-secondary/90 text-white py-2 h-10 sm:h-11 md:h-12 rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                  >
                    <LogIn className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Se connecter
                  </Button>
                </motion.div>
              </form>
            </Form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4 sm:mt-6">
              <a
                href="/forgot-password"
                className="text-meddoc-primary hover:text-meddoc-primary/80 text-xs sm:text-sm font-medium transition-colors"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
