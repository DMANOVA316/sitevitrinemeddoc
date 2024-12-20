import React, { useEffect } from "react";
import useContactRedux from "@/hooks/use-contact-redux";
import { formatTimestamp } from "@/utils/dateUtils";
import {
  MoreVertical,
  User,
  Mail,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import ContactFilter from "./ContactFilter";
import ContactMessage from "./ContactMessage";
import RemoveContact from "./RemoveContact";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EmptyData from "@/components/EmptyData";
import supabase from "@/utils/supabase";

export default function ContactsUs() {
  const {
    contacts,
    filter,
    isLoading,
    error,
    setFilterType,
    markAsViewed,
    loadContacts,
  } = useContactRedux();

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  useEffect(() => {
    const channel = supabase
      .channel("notification")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contactez_nous" },
        (payload) => {
          console.log("Received realtime update:", payload);
          // Recharger les contacts quand il y a un changement
          loadContacts();
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
        if (status === "SUBSCRIBED") {
          console.log("Successfully subscribed to realtime updates");
        }
        if (status === "CHANNEL_ERROR") {
          console.error("Failed to subscribe to realtime updates");
        }
      });

    return () => {
      console.log("Cleaning up Supabase subscription");
      supabase.removeChannel(channel);
    };
  }, [loadContacts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-meddoc-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Une erreur est survenue lors du chargement des messages.
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <ContactFilter currentFilter={filter} onFilterChange={setFilterType} />

      <div className="grid gap-3 sm:gap-4">
        {contacts.length === 0 ? (
          <EmptyData
            className="flex flex-col items-center justify-center h-[200px]"
            text="Aucun message trouve"
            tips="Attendez que les utilisateurs nous contactent"
          />
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="group relative p-3 sm:p-4 rounded-lg shadow-lg bg-white transition transform hover:scale-[1.02] duration-200 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {contact.nom}
                      </h3>
                      {!contact.vue && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full shrink-0">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 truncate">
                      {formatTimestamp(contact.date_envoye)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end sm:justify-start gap-2 shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {!contact.vue && (
                        <DropdownMenuItem
                          onClick={() => markAsViewed(contact.id)}
                          className="cursor-pointer flex"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marquer comme lu
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="cursor-pointer flex"
                        onClick={() =>
                          (window.location.href = `mailto:${contact.email}?subject=Re: Message de contact - ${contact.nom}`)
                        }
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Répondre
                      </DropdownMenuItem>
                      <RemoveContact contact={contact} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <ContactMessage contact={contact} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
