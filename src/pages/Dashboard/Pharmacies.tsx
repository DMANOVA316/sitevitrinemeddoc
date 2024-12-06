import React, { useState, useEffect } from "react";
import AddPharmacy from "@/components/Pharmacie/AddPharmacy";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Clock, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { pharmacyService } from "@/services/pharmacyService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PharmacyList: React.FC = () => {
    const [data, setData] = useState<Pharmacy[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);

    const fetchPharmacies = async () => {
        try {
            const pharmacies = await pharmacyService.getPharmacies();
            setData(pharmacies);
        } catch (error) {
            console.error("Error fetching pharmacies:", error);
            toast.error("Erreur", {
                description: "Impossible de récupérer les pharmacies",
                duration: 3000,
            });
        }
    };

    useEffect(() => {
        fetchPharmacies();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await pharmacyService.deletePharmacy(id);
            setData(data.filter((item) => item.id !== id));
            toast.success("Pharmacie supprimée", {
                description: "La pharmacie a été supprimée avec succès",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error deleting pharmacy:", error);
            toast.error("Erreur", {
                description: "Impossible de supprimer la pharmacie",
                duration: 3000,
            });
        }
    };

    const handleEdit = (pharmacy: Pharmacy) => {
        setEditingPharmacy(pharmacy);
        setIsEditDialogOpen(true);
    };

    const handleUpdatePharmacy = async (updatedData: Pharmacy) => {
        try {
            if (!updatedData.id) {
                throw new Error("ID de la pharmacie manquant");
            }
            
            await pharmacyService.updatePharmacy(
                updatedData.id,
                {
                    nom_pharmacie: updatedData.nom_pharmacie,
                    photo_profil: updatedData.photo_profil,
                    address: updatedData.address,
                    province: updatedData.province,
                    region: updatedData.region,
                    district: updatedData.district,
                    commune: updatedData.commune,
                    service: updatedData.service,
                    de_garde: updatedData.de_garde,
                }, 
                updatedData.contacts,
                updatedData.horaires
            );
            
            setData(data.map(item => item.id === updatedData.id ? updatedData : item));
            setIsEditDialogOpen(false);
            setEditingPharmacy(null);
            toast.success("Pharmacie modifiée", {
                description: "Les modifications ont été enregistrées avec succès",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error updating pharmacy:", error);
            toast.error("Erreur", {
                description: "Impossible de modifier la pharmacie",
                duration: 3000,
            });
        }
    };

    const handleAddPharmacy = async (newData: Pharmacy) => {
        try {
            const pharmacyData = {
                nom_pharmacie: newData.nom_pharmacie,
                photo_profil: newData.photo_profil,
                address: newData.address,
                province: newData.province,
                region: newData.region,
                district: newData.district,
                commune: newData.commune,
                service: newData.service,
                de_garde: newData.de_garde,
                // localisation: newData.localisation
            };
            
            await pharmacyService.addPharmacy(
                pharmacyData,
                newData.contacts || [],
                newData.horaires || []
            );
            
            fetchPharmacies();
            setIsAddDialogOpen(false);
            toast.success("Nouvelle pharmacie", {
                description: "La pharmacie a été ajoutée avec succès",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error adding pharmacy:", error);
            toast.error("Erreur", {
                description: "Impossible d'ajouter la pharmacie",
                duration: 3000,
            });
        }
    };

    const [search, setSearch] = useState("");
    const [filterDeGarde, setFilterDeGarde] = useState<boolean | null>(null);

    const filteredData = data.filter((item) => {
        const matchesSearch = item.nom_pharmacie.toLowerCase().includes(search.toLowerCase()) ||
            item.address.toLowerCase().includes(search.toLowerCase());

        if (filterDeGarde === null) return matchesSearch;
        return matchesSearch && item.de_garde === filterDeGarde;
    });

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterDeGarde(null)}
                            className={`px-4 py-2 rounded-lg border ${
                                filterDeGarde === null
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Toutes les pharmacies
                        </button>
                        <button
                            onClick={() => setFilterDeGarde(true)}
                            className={`px-4 py-2 rounded-lg border ${
                                filterDeGarde === true
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Pharmacies de garde
                        </button>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setIsAddDialogOpen(true)}
                            className="inline-flex items-center justify-center"
                        >
                            Ajouter une pharmacie
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter une nouvelle pharmacie</DialogTitle>
                        </DialogHeader>
                        <AddPharmacy onSubmit={handleAddPharmacy} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Nom
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Adresse
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            De garde
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Horaires
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredData.length > 0 ? filteredData.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {item.photo_profil && (
                                                        <img
                                                            src={item.photo_profil}
                                                            alt={item.nom_pharmacie}
                                                            className="h-10 w-10 rounded-full mr-3"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.nom_pharmacie}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.service}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.de_garde ? "Oui" : "Non"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {item.horaires && item.horaires.length > 0 ? (
                                                        <div className="space-y-1">
                                                            {item.horaires.map((horaire, index) => (
                                                                <div key={index} className="text-sm">
                                                                    {horaire.heure_debut} - {horaire.heure_fin}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500">Non défini</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex justify-end gap-2">
                                                    <Dialog open={isEditDialogOpen && editingPharmacy?.id === item.id} onOpenChange={(open) => {
                                                        setIsEditDialogOpen(open);
                                                        if (!open) setEditingPharmacy(null);
                                                    }}>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => setEditingPharmacy(item)}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                                <span className="sr-only">Modifier</span>
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Modifier la pharmacie</DialogTitle>
                                                            </DialogHeader>
                                                            <AddPharmacy
                                                                pharmacy={editingPharmacy}
                                                                onSubmit={handleUpdatePharmacy}
                                                                isEdit={true}
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Supprimer</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )): (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center">
                                                Aucune pharmacie trouvée.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Modifier la pharmacie</DialogTitle>
                    </DialogHeader>
                    <AddPharmacy
                        pharmacy={editingPharmacy}
                        onSubmit={handleUpdatePharmacy}
                        isEdit={true}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PharmacyList;
