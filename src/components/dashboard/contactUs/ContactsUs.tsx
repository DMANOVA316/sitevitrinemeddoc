import React, { useEffect } from "react";
import useContactRedux from "@/hooks/use-contact-redux";
import { formatTimestamp } from "@/utils/dateUtils";
import { CheckCircle, User, Mail } from "lucide-react";
import ContactFilter from "./ContactFilter";
import ContactMessage from "./ContactMessage";

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
    console.log(contacts[0]);
  }, [filter]);

  if (error) {
    return <div className="text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <ContactFilter currentFilter={filter} onFilterChange={setFilterType} />

      <div className="grid gap-6 sm:gap-8">
        {isLoading ? (
          // Skeleton loading state
          <>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="p-4 sm:p-6 rounded-lg shadow-lg bg-white animate-pulse"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200"></div>
                    <div className="space-y-2">
                      <div className="h-5 sm:h-6 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 sm:h-5 bg-gray-200 rounded w-48"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-4 bg-gray-200 rounded w-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 sm:p-6 rounded-lg shadow-lg ${
                contact.vue
                  ? "bg-white"
                  : "bg-gray-50 border-l-4 border-meddoc-primary"
              } transition transform hover:scale-[1.02] duration-200`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {contact.nom}
                    </h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${contact.email}?subject=Re: Message de contact - ${contact.nom}`}
                    className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Répondre</span>
                  </a>
                  {!contact.vue && (
                    <button
                      onClick={() => markAsViewed(contact.id)}
                      className="px-3 sm:px-4 py-2 bg-meddoc-primary text-white rounded-lg hover:bg-meddoc-primary/90 transition flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="sm:hidden">Marquer comme lu</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="mt-4 sm:mt-6">
                  <ContactMessage message={contact.message} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm text-gray-600">
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <strong className="sm:min-w-[100px]">Contact:</strong>
                    {contact.contact}
                  </span>
                  <span className="flex flex-col ml-auto sm:flex-row sm:items-center gap-1 sm:gap-2">
                    {contact.vous_ete || "Status non spécifié"}
                  </span>
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <strong className="sm:min-w-[100px]">Service:</strong>
                    {contact.service}
                  </span>
                  <span className="flex flex-col items-start ml-auto sm:flex-row sm:items-center sm:gap-2">
                    le {formatTimestamp(contact.date_envoye) || "Non spécifié"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
