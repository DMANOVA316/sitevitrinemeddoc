import { useEditPagesContext } from "@/contexts/EditPagesContext";
import { EditSection } from "../EditSection";

export function HeaderSection() {
  const { setIsHeaderModalOpen } = useEditPagesContext();

  return (
    <EditSection
      title="Header"
      description="Gérez les informations affichées dans l'en-tête du site."
      buttonText="Modifier le header"
      onEdit={() => setIsHeaderModalOpen(true)}
    />
  );
}
