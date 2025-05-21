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
import { CalendarIcon, Clock, Plus, Search, Trash2, Edit, AlertCircle } from "lucide-react";
import { pharmacyService } from "@/services/pharmacyService";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MultiPharmacyGardeManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const MultiPharmacyGardeManager = ({
  isOpen,
  onClose,
  onSuccess,
}: MultiPharmacyGardeManagerProps) => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [pharmaciesDeGarde, setPharmaciesDeGarde] = useState<Pharmacy[]>([]);
  const [selectedPharmacies, setSelectedPharmacies] = useState<number[]>([]);
  const [dateDebut, setDateDebut] = useState<Date | undefined>(new Date());
  const [dateFin, setDateFin] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ajouter");

  // États pour la modification des périodes de garde
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);
  const [editDateDebut, setEditDateDebut] = useState<Date | undefined>(undefined);
  const [editDateFin, setEditDateFin] = useState<Date | undefined>(undefined);

  // Charger les pharmacies
  useEffect(() => {
    if (isOpen) {
      fetchPharmacies();
    }
  }, [isOpen]);

  const fetchPharmacies = async () => {
    try {
      setIsLoading(true);
      const data = await pharmacyService.getPharmacies();
      setPharmacies(data);

      // Filtrer les pharmacies actuellement de garde
      const now = new Date().toISOString();
      const gardeActuelle = data.filter(p =>
        p.garde && new Date(p.garde.date_debut) <= new Date(now) && new Date(p.garde.date_fin) >= new Date(now)
      );
      setPharmaciesDeGarde(gardeActuelle);
    } catch (error) {
      console.error("Erreur lors du chargement des pharmacies:", error);
      toast.error("Erreur", {
        description: "Impossible de charger les pharmacies",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGardePeriods = async () => {
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

    if (selectedPharmacies.length === 0) {
      toast.error("Erreur", {
        description: "Veuillez sélectionner au moins une pharmacie",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Ajouter la période de garde pour chaque pharmacie sélectionnée
      // Fixer le décalage de fuseau horaire en définissant l'heure à midi
      const debutWithTime = new Date(dateDebut);
      debutWithTime.setHours(12, 0, 0, 0);

      const finWithTime = new Date(dateFin);
      finWithTime.setHours(12, 0, 0, 0);

      const promises = selectedPharmacies.map(id =>
        pharmacyService.addPharmacyGardePeriod(
          id,
          debutWithTime.toISOString(),
          finWithTime.toISOString()
        )
      );

      await Promise.all(promises);

      toast.success("Périodes de garde ajoutées", {
        description: `${selectedPharmacies.length} pharmacies ont été mises de garde avec succès`,
      });

      setSelectedPharmacies([]);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout des périodes de garde:", error);
      toast.error("Erreur", {
        description: "Impossible d'ajouter les périodes de garde",
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

  // Filtrer les pharmacies en fonction du terme de recherche
  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.nom_pharmacie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer la sélection/désélection de toutes les pharmacies
  const toggleSelectAll = () => {
    if (selectedPharmacies.length === filteredPharmacies.length) {
      setSelectedPharmacies([]);
    } else {
      setSelectedPharmacies(filteredPharmacies.map(p => p.id!));
    }
  };

  // Gérer la sélection/désélection d'une pharmacie
  const togglePharmacy = (id: number) => {
    if (selectedPharmacies.includes(id)) {
      setSelectedPharmacies(selectedPharmacies.filter(pId => pId !== id));
    } else {
      setSelectedPharmacies([...selectedPharmacies, id]);
    }
  };

  // Supprimer une période de garde
  const handleDeleteGardePeriod = async (pharmacyId: number, gardeId: number) => {
    try {
      setIsLoading(true);
      await pharmacyService.deletePharmacyGardePeriod(gardeId);
      toast.success("Période de garde supprimée", {
        description: "La période de garde a été supprimée avec succès",
      });
      await fetchPharmacies();
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
  const handleEditGardePeriod = (pharmacy: Pharmacy) => {
    if (pharmacy.garde) {
      setEditingPharmacy(pharmacy);
      setEditDateDebut(new Date(pharmacy.garde.date_debut));
      setEditDateFin(new Date(pharmacy.garde.date_fin));
      setIsEditModalOpen(true);
    }
  };

  // Mettre à jour une période de garde
  const handleUpdateGardePeriod = async () => {
    if (!editingPharmacy || !editingPharmacy.garde || !editDateDebut || !editDateFin) {
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
        editingPharmacy.garde.id!,
        debutWithTime.toISOString(),
        finWithTime.toISOString()
      );

      toast.success("Période de garde mise à jour", {
        description: "La période de garde a été mise à jour avec succès",
      });

      // Fermer le modal et rafraîchir les données
      setIsEditModalOpen(false);
      await fetchPharmacies();
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-meddoc-primary" />
              Gestion des pharmacies de garde
            </DialogTitle>
            <DialogDescription>
              Ajoutez ou supprimez des périodes de garde pour les pharmacies.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ajouter">Ajouter des pharmacies</TabsTrigger>
              <TabsTrigger value="liste">
                Pharmacies de garde
                {pharmaciesDeGarde.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {pharmaciesDeGarde.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ajouter" className="space-y-4 py-4 flex flex-col">
              <div className="flex flex-col gap-4">
                {/* Sélection des dates */}
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

                {/* Périodes prédéfinies */}
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

                {/* Recherche de pharmacies */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher une pharmacie..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Liste des pharmacies */}
                <div className="flex-1">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-meddoc-primary"></div>
                    </div>
                  ) : (
                    <ScrollArea className="max-h-[300px] pr-4">
                      <div className="space-y-1">
                        {/* Option pour sélectionner/désélectionner toutes les pharmacies */}
                        <div className="flex items-center p-2 rounded-md hover:bg-gray-50">
                          <Checkbox
                            id="select-all"
                            checked={selectedPharmacies.length === filteredPharmacies.length && filteredPharmacies.length > 0}
                            onCheckedChange={toggleSelectAll}
                            className="mr-2"
                          />
                          <label htmlFor="select-all" className="text-sm font-medium cursor-pointer flex-1">
                            {selectedPharmacies.length === filteredPharmacies.length
                              ? "Désélectionner tout"
                              : "Sélectionner tout"}
                          </label>
                          <Badge>{filteredPharmacies.length}</Badge>
                        </div>

                        {filteredPharmacies.map((pharmacy) => (
                          <div
                            key={pharmacy.id}
                            className={`flex items-center p-2 rounded-md ${
                              selectedPharmacies.includes(pharmacy.id!) ? "bg-blue-50" : "hover:bg-gray-50"
                            }`}
                          >
                            <Checkbox
                              id={`pharmacy-${pharmacy.id}`}
                              checked={selectedPharmacies.includes(pharmacy.id!)}
                              onCheckedChange={() => togglePharmacy(pharmacy.id!)}
                              className="mr-2"
                            />
                            <label htmlFor={`pharmacy-${pharmacy.id}`} className="cursor-pointer flex-1">
                              <div className="font-medium text-sm">{pharmacy.nom_pharmacie}</div>
                              <div className="text-xs text-gray-500">{pharmacy.address}</div>
                            </label>
                            {pharmacy.de_garde && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                De garde
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 sticky bottom-0 bg-white py-2">
                  <div className="text-sm text-gray-500">
                    {selectedPharmacies.length} pharmacie(s) sélectionnée(s)
                  </div>
                  <Button
                    onClick={handleAddGardePeriods}
                    disabled={isLoading || !dateDebut || !dateFin || selectedPharmacies.length === 0}
                    className="gap-2 bg-meddoc-primary hover:bg-meddoc-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Ajout en cours...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Ajouter les périodes de garde
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="liste" className="py-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-meddoc-primary"></div>
                </div>
              ) : pharmaciesDeGarde.length === 0 ? (
                <div className="text-center py-8 flex flex-col items-center">
                  <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Aucune pharmacie de garde</h3>
                  <p className="text-gray-500 max-w-md">
                    Il n'y a actuellement aucune pharmacie de garde. Utilisez l'onglet "Ajouter des pharmacies" pour en ajouter.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <div className="bg-meddoc-primary/10 p-4 rounded-lg mb-4">
                      <h3 className="font-bold text-meddoc-primary mb-1">Période de garde actuelle</h3>
                      {pharmaciesDeGarde.length > 0 && pharmaciesDeGarde[0].garde && (
                        <p className="text-sm text-gray-600">
                          Du {format(new Date(pharmaciesDeGarde[0].garde.date_debut), "d MMMM yyyy", { locale: fr })} au {format(new Date(pharmaciesDeGarde[0].garde.date_fin), "d MMMM yyyy", { locale: fr })}
                        </p>
                      )}
                    </div>

                    {pharmaciesDeGarde.map((pharmacy) => (
                      <div
                        key={pharmacy.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{pharmacy.nom_pharmacie}</h3>
                            <p className="text-gray-600 text-sm">{pharmacy.address}</p>
                          </div>
                          {pharmacy.garde && (
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditGardePeriod(pharmacy)}
                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                                title="Modifier la période de garde"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => pharmacy.garde && handleDeleteGardePeriod(pharmacy.id!, pharmacy.garde.id!)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                title="Supprimer la période de garde"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {pharmacy.garde && (
                          <div className="mt-2 bg-green-50 p-2 rounded-md text-sm">
                            <div className="font-medium text-green-700">
                              Période de garde: {format(new Date(pharmacy.garde.date_debut), "d MMM yyyy", { locale: fr })} - {format(new Date(pharmacy.garde.date_fin), "d MMM yyyy", { locale: fr })}
                            </div>
                            <div className="text-green-600">
                              {Math.ceil(
                                (new Date(pharmacy.garde.date_fin).getTime() - new Date(pharmacy.garde.date_debut).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              jours
                            </div>
                          </div>
                        )}
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
            {editingPharmacy && (
              <>Modifiez la période de garde pour {editingPharmacy.nom_pharmacie}</>
            )}
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

export default MultiPharmacyGardeManager;
