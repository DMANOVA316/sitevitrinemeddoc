import { usePartnerRedux } from "@/hooks/use-partner-redux";
import { PartnerType } from "@/types";

interface PartnerProps {
  partner: PartnerType;
}

const Partner: React.FC<PartnerProps> = ({ partner }) => {
  const { selectCurrentPartner, showEditPartnerModal, showRemovePartnerModal } =
    usePartnerRedux();

  const handleEdit = () => {
    selectCurrentPartner(partner);
    showEditPartnerModal(true);
  };

  const handleRemove = () => {
    selectCurrentPartner(partner);
    showRemovePartnerModal(true);
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-all duration-200 border-b">
      {/* ID */}
      <div className="col-span-1 text-gray-600">{partner.id}</div>

      {/* Logo */}
      <div className="col-span-2">
        {partner.logo && (
          <img
            src={partner.logo}
            alt={`Logo ${partner.nom_partenaire}`}
            className="h-10 w-10 object-contain rounded-full"
          />
        )}
      </div>

      {/* Name */}
      <div className="col-span-3 font-medium">{partner.nom_partenaire}</div>

      {/* URL */}
      <div className="col-span-4 truncate">
        <a
          href={partner.lien}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {partner.lien}
        </a>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex justify-end gap-2">
        <button
          onClick={handleEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Partner;
