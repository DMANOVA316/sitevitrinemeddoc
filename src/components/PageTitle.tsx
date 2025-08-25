import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";
import { getPublicUrl } from "@/utils/supabase";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export interface PageTitleProps {
  isDashboard?: boolean;
  title?: string;
  pageName?: string;
}

function PageTitle({ isDashboard = false, title, pageName }: PageTitleProps) {
  const { infoMeddoc } = useInfoMeddocRedux();
  
  // Construire le titre de la page
  const getPageTitle = () => {
    // Si un titre spécifique est fourni, l'utiliser
    if (title) {
      return title;
    }
    
    // Sinon, construire le titre en fonction des informations disponibles
    if (infoMeddoc?.titre_site) {
      if (pageName) {
        return `${infoMeddoc.titre_site} - ${pageName}`;
      }
      return isDashboard ? `${infoMeddoc.titre_site} - Dashboard` : infoMeddoc.titre_site;
    }
    
    // Titre par défaut si rien d'autre n'est disponible
    return pageName ? `MEDDoC - ${pageName}` : "MEDDoC - Votre partenaire santé à Madagascar";
  };

  useEffect(() => {
    // Mise à jour du favicon
    if (infoMeddoc?.favicon) {
      const faviconUrl = getPublicUrl(infoMeddoc.favicon);
      const link = (document.querySelector("link[rel*='icon']")||
        document.createElement("link")) as HTMLLinkElement;
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = faviconUrl;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  }, [infoMeddoc]);

  return (
    <Helmet>
      <title>{getPageTitle()}</title>
    </Helmet>
  );
}

export default PageTitle;
