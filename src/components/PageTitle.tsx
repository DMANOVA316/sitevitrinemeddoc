import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";
import { getPublicUrl } from "@/utils/supabase";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export interface PageTitleProps {
  isDashboard?: boolean;
  title?: string;
  pageName?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

function PageTitle({ 
  isDashboard = false, 
  title, 
  pageName, 
  description, 
  keywords,
  canonicalUrl,
  ogImage
}: PageTitleProps) {
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

  // Construire la description de la page
  const getPageDescription = () => {
    if (description) {
      return description;
    }
    // infoMeddoc n'a pas de propriété description, donc on utilise la valeur par défaut
    return "MEDDoC propose des solutions innovantes pour la santé à Madagascar : digital, consulting, formation et community management médical.";
  };

  // Construire les mots-clés de la page
  const getPageKeywords = () => {
    if (keywords) {
      return keywords;
    }
    // infoMeddoc n'a pas de propriété keywords, donc on utilise la valeur par défaut
    return "santé Madagascar, médecine Madagascar, solutions digitales santé, consulting santé et stratégie, formation santé, community management médical";
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
      <html lang="fr" />
      <title>{getPageTitle()}</title>
      <meta name="description" content={getPageDescription()} />
      <meta name="keywords" content={getPageKeywords()} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={getPageTitle()} />
      <meta property="og:description" content={getPageDescription()} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="MEDDoC" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:alt" content={getPageTitle()} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getPageTitle()} />
      <meta name="twitter:description" content={getPageDescription()} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImage && <meta name="twitter:image:alt" content={getPageTitle()} />}
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </Helmet>
  );
}

export default PageTitle;
