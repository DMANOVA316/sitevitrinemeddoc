import useSocialMediaRedux from "@/hooks/use-social-media-redux";

interface SocialMediaProps {
  socialMedia: SocialMedia;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ socialMedia }) => {
  const {
    showRemoveSocialMediaModal,
    showEditSocialMediaModal,
    selectCurrentSocialMedia,
  } = useSocialMediaRedux();

  const handleEdit = () => {
    selectCurrentSocialMedia(socialMedia);
    showEditSocialMediaModal(true);
  };

  const handleRemove = () => {
    selectCurrentSocialMedia(socialMedia);
    showRemoveSocialMediaModal(true);
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-all duration-200 border-b">
      {/* ID */}
      <div className="col-span-1 text-gray-600">{socialMedia.id}</div>

      {/* Name */}
      <div className="col-span-3 font-medium">{socialMedia.nom}</div>

      {/* URL */}
      <div className="col-span-4 truncate">
        <a
          href={socialMedia.lien}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {socialMedia.lien}
        </a>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex justify-end gap-3">
        <button
          className="text-gray-400 hover:text-blue-600 transition-colors"
          title="Modifier"
          onClick={handleEdit}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className="text-gray-400 hover:text-red-600 transition-colors"
          title="Supprimer"
          onClick={handleRemove}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;
