import { getFileNameFromPath } from "@/utils/fileUtils";
import { EditSection } from "../EditSection";
import { InfoField } from "../InfoField";
import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";

export function GeneralInfoSection() {
  const { infoMeddoc, isLoading, error, showEditInformationModal } =
    useInfoMeddocRedux();

  if (error) {
    return <p className="text-red-500 mt-2">{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <EditSection
      title="Informations générales"
      description="Gérez les informations de base du site comme le titre, l'email et l'adresse"
      buttonText="Modifier les informations"
      onEdit={() => showEditInformationModal(true)}
    >
      <div className="mt-4 grid grid-cols-2 gap-4">
        <InfoField label="Titre du site" value={infoMeddoc?.titre_site} />
        <InfoField label="Email" value={infoMeddoc?.email} />
        <InfoField label="Adresse" value={infoMeddoc?.addresse} />
        <InfoField label="Copyright" value={infoMeddoc?.copyrigth} />
        <InfoField
          label="Logo"
          value={infoMeddoc?.logo}
          formatter={getFileNameFromPath}
        />
        <InfoField
          label="Favicon"
          value={infoMeddoc?.favicon}
          formatter={getFileNameFromPath}
        />
      </div>
    </EditSection>
  );
}
