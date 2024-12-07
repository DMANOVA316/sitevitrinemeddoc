import { Button } from "@/components/ui/button";
import { useEditPagesContext } from "@/contexts/EditPagesContext";
import EditHeader from "./EditHeader";
import EditLandingPage from "./EditLandingPage";
import EditFooter from "./EditFooter";

export default function EditPageIndex() {
  const {
    setIsHeaderModalOpen,
    setIsLandingPageModalOpen,
    setIsFooterModalOpen,
  } = useEditPagesContext();

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
          <Button
            onClick={() => setIsHeaderModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Modifier header
          </Button>
          <Button
            onClick={() => setIsLandingPageModalOpen(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            Modifier l'image de fond du landing page
          </Button>
          <Button
            onClick={() => setIsFooterModalOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Modifier le footer
          </Button>
        </div>
      </main>

      <EditHeader />
      <EditLandingPage />
      <EditFooter />
    </div>
  );
}
