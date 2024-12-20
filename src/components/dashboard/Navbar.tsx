import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useContactRedux from "@/hooks/use-contact-redux";
import supabase from "@/utils/supabase";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationPopover } from "./Notifications/NotificationPopover";

export default function Navbar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Use the existing contact hook
  const {
    contacts: notifications,
    loadContacts,
    markAsViewed,
    removeContact,
  } = useContactRedux();

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Filter unread notifications
  const unreadNotifications = notifications.filter((n) => !n.vue);

  const handleMarkAsRead = async (id: string) => {
    await markAsViewed(Number(id));
  };

  const handleClearNotification = async (id: string) => {
    await removeContact(Number(id));
  };

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

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <SiteLogo to="/dashboard" className="mr-4" /> */}
        <div className="flex-1">
          {/* <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-8" />
          </div> */}
        </div>
        <div className="flex items-center gap-4">
          <NotificationPopover
            notifications={notifications.map((n) => ({
              id: n.id.toString(),
              title: `Message de ${n.nom}`,
              description: n.message,
              timestamp: new Date(n.date_envoye),
              read: n.vue,
            }))}
            onMarkAsRead={handleMarkAsRead}
            onClearNotification={handleClearNotification}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
