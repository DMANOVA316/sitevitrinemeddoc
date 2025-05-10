import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';

/**
 * Hook personnalisé pour gérer l'état d'authentification
 * @returns Un objet contenant l'état d'authentification et les informations de session
 */
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Récupérer la session actuelle
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Erreur lors de la récupération de la session:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    getSession();

    // Nettoyer l'abonnement
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    isAuthenticated,
    isLoading,
    user: session?.user || null
  };
};

export default useAuth;
