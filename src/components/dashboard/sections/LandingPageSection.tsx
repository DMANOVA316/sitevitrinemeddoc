import { useEditPagesContext } from "@/contexts/EditPagesContext";
import { EditSection } from "../EditSection";

export function LandingPageSection() {
  const { setIsLandingPageModalOpen } = useEditPagesContext();

  return (
    <EditSection
      title="Landing Page"
      description="Gérez les informations affichées dans la page d'accueil."
      buttonText="Modifier la landing page"
      onEdit={() => setIsLandingPageModalOpen(true)}
    />
  );
}
