import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Pill,
  Ambulance,
  Handshake,
  FileText,
  Settings,
  LogOut,
  Wrench,
  MessageSquare,
  Share2,
  Image,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Info_page_meddoc } from "@/types";
import { infoMeddocService } from "@/services/infoMeddocService";
import { Skeleton } from "@/components/ui/skeleton";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    }
  };

  const menuItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Gestion MEDDoC",
      items: [
        {
          title: "Page MEDDoC",
          icon: FileText,
          href: "/dashboard/page-meddoc",
        },
        {
          title: "Services",
          icon: Wrench,
          href: "/dashboard/services",
        },
        {
          title: "Contact",
          icon: Contact,
          href: "/dashboard/contact-meddoc",
        },
        {
          title: "Réseaux sociaux",
          icon: Share2,
          href: "/dashboard/reseaux-sociaux",
        },
        {
          title: "Couverture",
          icon: Image,
          href: "/dashboard/couverture",
        },
      ],
    },
    {
      title: "Gestion Santé",
      items: [
        {
          title: "Pharmacies",
          icon: Pill,
          href: "/dashboard/pharmacies",
        },
        {
          title: "Ambulances",
          icon: Ambulance,
          href: "/dashboard/ambulances",
        },
        {
          title: "Urgences",
          icon: MessageSquare,
          href: "/dashboard/urgences",
        },
      ],
    },
    {
      title: "Partenaires",
      icon: Handshake,
      href: "/dashboard/partenaires/list",
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-4 flex justify-center gap-2">
            {isLoading ? (
              <Skeleton className="h-8 w-32 mx-auto" />
            ) : info?.logo ? (
              <img
                src={info.logo}
                alt="MEDDoC Logo"
                className="h-8 object-contain"
              />
            ) : null}
            <h2 className="text-2xl font-bold text-center text-meddoc-primary">
              MEDDoC
            </h2>
          </div>
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {menuItems.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.items ? (
                    <>
                      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
                        {item.title}
                      </h2>
                      <div className="space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.href}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-primary/5"
                              )
                            }
                          >
                            <subItem.icon className="h-4 w-4" />
                            {subItem.title}
                          </NavLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-primary/5"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </NavLink>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="px-3 absolute bottom-4 w-full">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
