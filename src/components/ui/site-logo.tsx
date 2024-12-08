import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Info_page_meddoc } from "@/types";
import { infoMeddocService } from "@/services/infoMeddocService";
import { Skeleton } from "@/components/ui/skeleton";
import { getPublicUrl } from "@/utils/supabase";

interface SiteLogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
  showText?: boolean;
  to?: string;
}

export function SiteLogo({
  className = "",
  imgClassName = "h-8 object-contain",
  textClassName = "text-2xl font-bold text-meddoc-primary ml-3",
  showText = true,
  to = "/",
}: SiteLogoProps) {
  const [info, setInfo] = useState<Info_page_meddoc | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setIsLoading(true);
        const data = await infoMeddocService.getInfo();
        setInfo(data);
      } catch (error) {
        console.error("Error fetching site info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const LogoContent = () => (
    <div className="flex items-center">
      {isLoading ? (
        <Skeleton className="h-8 w-32" />
      ) : (
        <>
          {info?.logo && (
            <img
              src={getPublicUrl(info.logo)}
              alt={info?.titre_site || "MEDDoC Logo"}
              className={imgClassName}
            />
          )}
          {showText && (
            <span className={textClassName}>
              {info?.titre_site || "MEDDoC"}
            </span>
          )}
        </>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={`flex items-center ${className}`}>
        <LogoContent />
      </Link>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <LogoContent />
    </div>
  );
}
