import { useToast } from "@/components/ui/use-toast";
import { AppDispatch, RootState } from "@/store";
import { deleteContact, fetchContacts } from "@/store/contactSlice";
import supabase from "@/utils/supabase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook de gestion des notifications de contacts en temps réel
 * Écoute et réagit aux changements de la table des contacts
 */
export const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Sélection de l'état des contacts
  const { contacts, status, error } = useSelector(
    (state: RootState) => state.contact
  );
  const { toast } = useToast();

  // Calculer le nombre de contacts non lus
  const unreadContacts = contacts.filter((contact) => !contact.vue).length;

  // Gestion des erreurs de chargement des contacts
  useEffect(() => {
    if (status === "failed") {
      toast({
        title: "Erreur de chargement",
        description: error || "Impossible de charger les contacts",
        variant: "destructive",
      });
    }
  }, [status, error, toast]);

  // Écoute des changements en temps réel via Supabase
  useEffect(() => {
    const channel = supabase
      .channel("contact-notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contactez_nous" },
        async (payload) => {
          try {
            switch (payload.eventType) {
              case "INSERT":
                toast({
                  title: "Nouveau Message",
                  description: "Un nouveau message a été reçu",
                });
                dispatch(fetchContacts());
                break;

              case "UPDATE":
                if (payload.new.vue !== payload.old.vue) {
                  toast({
                    title: "Statut du Message",
                    description: payload.new.vue
                      ? "Un message a été marqué comme lu"
                      : "Un message a été marqué comme non lu",
                  });
                  dispatch(fetchContacts());
                }
                break;

              case "DELETE":
                toast({
                  title: "Message Supprimé",
                  description: "Un message a été supprimé",
                  variant: "destructive",
                });
                dispatch(deleteContact(payload.old.id));
                break;
            }
          } catch (err) {
            console.error("Erreur lors du traitement de la notification:", err);
            toast({
              title: "Erreur de Notification",
              description:
                "Un problème est survenu lors du traitement de la notification",
              variant: "destructive",
            });
          } finally {
            console.groupEnd();
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          toast({
            title: "Notifications Activées",
            description: "Vous recevrez des mises à jour en temps réel",
          });
        } else if (status === "CHANNEL_ERROR") {
          toast({
            title: "Erreur de Notification",
            description: "Impossible d'activer les notifications en temps réel",
            variant: "destructive",
          });
        }
      });

    // Charger initialement les contacts
    dispatch(fetchContacts());

    // Nettoyage du canal Supabase
    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch, toast]);

  // Retourne les informations de notification
  return {
    unreadContacts,
    totalUnread: unreadContacts,
    contactStatus: status,
  };
};
