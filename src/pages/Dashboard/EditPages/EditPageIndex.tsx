import EditHeader from "./EditHeader";
import EditLandingPage from "./EditLandingPage";
import EditInfo from "@/components/dashboard/EditInfo";
import { GeneralInfoSection } from "@/components/dashboard/GeneralInfoSection";
import { ContactsSection } from "@/components/dashboard/sections/ContactsSection";

export default function EditPageIndex() {
  return (
    <div className="">
      <main className="p-6">
        <div>
          <h1 className="text-2xl font-bold">Centre d'édition de page</h1>
          <p className="text-gray-500 mt-1">
            Cette page vous permettra de modifier des textes ou Images affichées
            dans le landing page pour les utilisateurs et visisteurs du site.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <GeneralInfoSection />
          <ContactsSection />
        </div>

        <EditHeader />
        <EditInfo />
      </main>
    </div>
  );
}