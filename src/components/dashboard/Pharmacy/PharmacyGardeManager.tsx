import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock, Plus, Trash2, Edit } from "lucide-react";
import { pharmacyService } from "@/services/pharmacyService";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";

interface PharmacyGardeManagerProps {
  pharmacy: Pharmacy;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface GardePeriod {
  id?: number;
  id_pharmacies: number;
  date_debut: Date;
  date_fin: Date;
}

const PharmacyGardeManager = ({
  pharmacy,
  isOpen,
  onClose,
  onSuccess,
}: PharmacyGardeManagerProps) => {
  const [activeTab, setActiveTab] = useState("ajouter");
  const [gardePeriods, setGardePeriods] = useState<GardePeriod[]>([]);
  const [dateDebut, setDateDebut] = useState<Date | undefined>(new Date());
  const [dateFin, setDateFin] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [isLoading, setIsLoading] = useState(false);

  // États pour la modification des périodes de garde
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<GardePeriod | null>(null);
  const [editDateDebut, setEditDateDebut] = useState<Date | undefined>(undefined);
  const [editDateFin, setEditDateFin] = useState<Date | undefined>(undefined);

  // Charger les périodes de garde existantes
  useEffect(() => {
    if (isOpen && pharmacy.id) {
      fetchGardePeriods();
    }
  }, [isOpen, pharmacy.id]);

  const fetchGardePeriods = async () => {
    try {
      setIsLoading(true);
      const periods = await pharmacyService.getPharmacyGardePeriods(pharmacy.id!);
      setGardePeriods(
        periods.map((p) => ({
          ...p,
          date_debut: new Date(p.date_debut),
          date_fin: new Date(p.date_fin),
        }))
      );
    } catch (error) {
      console.error("Erreur lors du chargement des périodes de garde:", error);
      toast.error("Erreur", {
        description: "Impossible de charger les périodes de garde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGardePeriod = async () => {
    if (!dateDebut || !dateFin) {
      toast.error("Erreur", {
        description: "Veuillez sélectionner des dates valides",
      });
      return;
    }

    if (dateDebut > dateFin) {
      toast.error("Erreur", {
        description: "La date de début doit être antérieure à la date de fin",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Fixer le décalage de fuseau horaire en définissant l'heure à midi
      const debutWithTime = new Date(dateDebut);
      debutWithTime.setHours(12, 0, 0, 0);

      const finWithTime = new Date(dateFin);
      finWithTime.setHours(12, 0, 0, 0);

      await pharmacyService.addPharmacyGardePeriod(
        pharmacy.id!,
        debutWithTime.toISOString(),
        finWithTime.toISOString()
      );
      toast.success("Période de garde ajoutée", {
        description: "La période de garde a été ajoutée avec succès",
      });
      await fetchGardePeriods();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la période de garde:", error);
      toast.error("Erreur", {
        description: "Impossible d'ajouter la période de garde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGardePeriod = async (gardeId: number) => {
    try {
      setIsLoading(true);
      await pharmacyService.deletePharmacyGardePeriod(gardeId);
      toast.success("Période de garde supprimée", {
        description: "La période de garde a été supprimée avec succès",
      });
      await fetchGardePeriods();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la suppression de la période de garde:", error);
      toast.error("Erreur", {
        description: "Impossible de supprimer la période de garde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Ouvrir le modal de modification d'une période de garde
  const handleEditGardePeriod = (period: GardePeriod) => {
    setEditingPeriod(period);
    setEditDateDebut(period.date_debut);
    setEditDateFin(period.date_fin);
    setIsEditModalOpen(true);
  };

  // Mettre à jour une période de garde
  const handleUpdateGardePeriod = async () => {
    if (!editingPeriod || !editingPeriod.id || !editDateDebut || !editDateFin) {
      toast.error("Erreur", {
        description: "Données manquantes pour la mise à jour",
      });
      return;
    }

    if (editDateDebut > editDateFin) {
      toast.error("Erreur", {
        description: "La date de début doit être antérieure à la date de fin",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Fixer le décalage de fuseau horaire en définissant l'heure à midi
      const debutWithTime = new Date(editDateDebut);
      debutWithTime.setHours(12, 0, 0, 0);

      const finWithTime = new Date(editDateFin);
      finWithTime.setHours(12, 0, 0, 0);

      await pharmacyService.updatePharmacyGardePeriod(
        editingPeriod.id,
        debutWithTime.toISOString(),
        finWithTime.toISOString()
      );

      toast.success("Période de garde mise à jour", {
        description: "La période de garde a été mise à jour avec succès",
      });

      // Fermer le modal et rafraîchir les données
      setIsEditModalOpen(false);
      await fetchGardePeriods();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la période de garde:", error);
      toast.error("Erreur", {
        description: "Impossible de mettre à jour la période de garde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour ajouter rapidement une période prédéfinie
  const addPredefinedPeriod = (days: number) => {
    const start = new Date();
    const end = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    setDateDebut(start);
    setDateFin(end);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-meddoc-primary" />
              Gestion des périodes de garde
            </DialogTitle>
            <DialogDescription>
              Gérez les périodes pendant lesquelles {pharmacy.nom_pharmacie} est de garde.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ajouter">Ajouter une période</TabsTrigger>
              <TabsTrigger value="historique">
                Historique
                {gardePeriods.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {gardePeriods.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ajouter" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-debut">Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateDebut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateDebut ? (
                          format(dateDebut, "PPP", { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateDebut}
                        onSelect={setDateDebut}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-fin">Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateFin && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFin ? (
                          format(dateFin, "PPP", { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFin}
                        onSelect={setDateFin}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Périodes prédéfinies</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPredefinedPeriod(1)}
                  >
                    1 jour
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPredefinedPeriod(3)}
                  >
                    3 jours
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPredefinedPeriod(7)}
                  >
                    1 semaine
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPredefinedPeriod(14)}
                  >
                    2 semaines
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPredefinedPeriod(30)}
                  >
                    1 mois
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddGardePeriod}
                className="w-full"
                disabled={isLoading || !dateDebut || !dateFin}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter cette période de garde
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="historique" className="py-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-meddoc-primary"></div>
                </div>
              ) : gardePeriods.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune période de garde enregistrée
                </div>
              ) : (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-3">
                    {gardePeriods.map((period) => (
                      <div
                        key={period.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {format(period.date_debut, "PPP", { locale: fr })} -{" "}
                            {format(period.date_fin, "PPP", { locale: fr })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.ceil(
                              (period.date_fin.getTime() - period.date_debut.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            jours
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditGardePeriod(period)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                            title="Modifier la période de garde"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => period.id && handleDeleteGardePeriod(period.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            title="Supprimer la période de garde"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de modification des dates de garde */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-meddoc-primary" />
              Modifier la période de garde
            </DialogTitle>
            <DialogDescription>
              Modifiez les dates de début et de fin de la période de garde
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-date-debut">Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="edit-date-debut"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editDateDebut && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editDateDebut ? (
                      format(editDateDebut, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={editDateDebut}
                    onSelect={setEditDateDebut}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-date-fin">Date de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="edit-date-fin"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editDateFin && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editDateFin ? (
                      format(editDateFin, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={editDateFin}
                    onSelect={setEditDateFin}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleUpdateGardePeriod}
              disabled={isLoading || !editDateDebut || !editDateFin}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Mise à jour...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Mettre à jour
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PharmacyGardeManager;
