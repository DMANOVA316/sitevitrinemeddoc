import EditHeader from "./EditHeader";
import EditLandingPage from "./EditLandingPage";
import EditInfo from "@/components/dashboard/EditInfo";
import { GeneralInfoSection } from "@/components/dashboard/GeneralInfoSection";
import { ContactsSection } from "@/components/dashboard/sections/ContactsSection";

export default function EditPageIndex() {
  return (
    <div className="min-h-screen">
      <main className="p-4 md:p-6 max-w-screen-lg mx-auto">
        {/* En-tête */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Centre d'édition de page
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Cette page vous permettra de modifier des textes ou Images affichées
            dans le landing page pour les utilisateurs et visiteurs du site.
          </p>
        </div>

        {/* Sections principales */}
        <div className="mt-8 space-y-6">
          <GeneralInfoSection />
          <ContactsSection />
        </div>

        {/* Autres composants */}
        <div className="mt-6 space-y-4">
          <EditHeader />
          <EditLandingPage />
          <EditInfo />
        </div>
      </main>
    </div>
  );
}
