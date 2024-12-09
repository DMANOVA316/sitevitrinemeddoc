import { Button } from "@/components/ui/button";
import { useEditPagesContext } from "@/contexts/EditPagesContext";
import { useInfoMeddocContext } from "@/contexts/InfoMeddocContext";
import EditHeader from "./EditHeader";
import EditLandingPage from "./EditLandingPage";
import EditInfo from "@/components/dashboard/EditInfo";
import { GeneralInfoSection } from "@/components/dashboard/GeneralInfoSection";
import { HeaderSection } from "@/components/dashboard/sections/HeaderSection";
import { LandingPageSection } from "@/components/dashboard/sections/LandingPageSection";
import { getFileNameFromPath } from "@/utils/fileUtils";

export default function EditPageIndex() {
  const { setIsHeaderModalOpen, setIsLandingPageModalOpen } = useEditPagesContext();
  const { info, isLoading, error, setIsEditModalOpen } = useInfoMeddocContext();

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
          <HeaderSection />
          <LandingPageSection />
        </div>

        <EditHeader />
        <EditLandingPage />
        <EditInfo />
      </main>
    </div>
  );
}
