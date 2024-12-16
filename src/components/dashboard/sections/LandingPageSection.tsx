import useCouvertureRedux from "@/hooks/use-couverture-redux";
import { EditSection } from "../EditSection";

export default function LandingPageSection() {
  const { showEditCouvertureModal } = useCouvertureRedux();
  return (
    <EditSection
      title="Landing page & Couverture"
      description="Modifier la landing page et/ou la couverture"
      buttonText="Modifier la landing page"
      onEdit={() => {
        showEditCouvertureModal(true);
      }}
    />
  );
}
