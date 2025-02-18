import useInfoMeddocRedux from "@/hooks/use-info-meddoc-redux";
import infoMeddocService from "@/services/infoMeddocService";
import { getPublicUrl } from "@/utils/supabase";
import { useEffect, useState } from "react";

export interface PageTitleProps {
  isDashboard: boolean;
}

function PageTitle({ isDashboard }: PageTitleProps) {
  const { infoMeddoc, showEditInformationModal, error, isLoading } =
    useInfoMeddocRedux();

  useEffect(() => {
    const updateInfo = async () => {
      try {
        const data = infoMeddoc;
        // Mise à jour du titre
        if (data?.titre_site) {
          const pageTitle = isDashboard
            ? `${data.titre_site} - Dashboard`
            : data.titre_site;
          document.title = pageTitle;
        }
        // Mise à jour du favicon
        if (data?.favicon) {
          const faviconUrl = getPublicUrl(data.favicon);
          const link = (document.querySelector("link[rel*='icon']") ||
            document.createElement("link")) as HTMLLinkElement;
          link.type = "image/x-icon";
          link.rel = "shortcut icon";
          link.href = faviconUrl;
          document.getElementsByTagName("head")[0].appendChild(link);
        }
      } catch (error) {
        console.error("Error updating site info:", error);
      }
    };

    updateInfo();
  }, [infoMeddoc, isDashboard]);

  return null;
}

export default PageTitle;
