export default function EmptyData({
  text = "Aucune donnee a afficher",
  tips = "Commencer pas en ajouter",
}: {
  text: string;
  tips: string;
}) {
  return (
    <>
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 9h4m-4 3h4"
        />
      </svg>
      <p className="text-lg">{text}</p>
      <p className="text-sm">{tips}</p>
    </>
  );
}
