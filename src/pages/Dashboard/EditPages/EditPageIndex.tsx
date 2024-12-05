import { Link } from "react-router-dom";

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
        <div className="mt-6 space-x-4 flex flex-wrap items-center justify-start gap-2">
          <Link
            to={"/dashboard/page-meddoc/header"}
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Modifier header
          </Link>
          <Link
            to={"/dashboard/page-meddoc/footer"}
            className="py-2 px-4 bg-green-500 text-white rounded-md"
          >
            Modifier l'image de fond du landing page
          </Link>
          <Link
            to={"/dashboard/page-meddoc/landing-page"}
            className="py-2 px-4 bg-yellow-500 text-white rounded-md"
          >
            Modifier le footer
          </Link>
        </div>
      </main>
    </div>
  );
}
