import { useInfoMeddocContext } from "@/contexts/InfoMeddocContext";
import { getFileNameFromPath } from "@/utils/fileUtils";
import { EditSection } from "./EditSection";
import { InfoField } from "./InfoField";

export function GeneralInfoSection() {
  const { info, isLoading, error, setIsEditModalOpen } = useInfoMeddocContext();

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
      onEdit={() => setIsEditModalOpen(true)}
    >
      <div className="mt-4 grid grid-cols-2 gap-4">
        <InfoField label="Titre du site" value={info?.titre_site} />
        <InfoField label="Email" value={info?.email} />
        <InfoField label="Adresse" value={info?.addresse} />
        <InfoField label="Copyright" value={info?.copyrigth} />
        <InfoField 
          label="Logo" 
          value={info?.logo}
          formatter={getFileNameFromPath}
        />
        <InfoField 
          label="Favicon" 
          value={info?.favicon}
          formatter={getFileNameFromPath}
        />
      </div>
    </EditSection>
  );
}
