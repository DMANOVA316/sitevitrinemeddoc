import React, { useState } from "react";
import LocationSelector from "../LocationSelector/LocationSelector";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddPharmacyProps {
    initialData?: Pharmacy | null;
    onSubmit?: (data: Pharmacy) => void;
}

const AddPharmacy: React.FC<AddPharmacyProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState<Pharmacy>(
        initialData || {
            id: Math.floor(Math.random() * 1000),
            name: "",
            profile: "",
            contact: "",
            address: "",
            province: "",
            region: "",
            district: "",
            commune: "",
            service: "",
            location: "",
            deGarde: false,
            heureOuverture: {
                debut: "",
                fin: "",
            },
        }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    {/* Colonne de gauche */}
                    <div className="space-y-6">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                Nom de la pharmacie
                            </Label>
                            <Input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                Profile
                            </Label>
                            <Input
                                type="file"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        profile: e.target.files?.[0]?.name || "",
                                    })
                                }
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                Contact
                            </Label>
                            <Input
                                type="text"
                                value={formData.contact}
                                onChange={(e) =>
                                    setFormData({ ...formData, contact: e.target.value })
                                }
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                Adresse
                            </Label>
                            <Input
                                type="text"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                Service
                            </Label>
                            <Input
                                type="text"
                                value={formData.service}
                                onChange={(e) =>
                                    setFormData({ ...formData, service: e.target.value })
                                }
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                Location
                            </Label>
                            <Input
                                type="text"
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">
                                De garde
                            </Label>
                            <Input
                                type="checkbox"
                                checked={formData.deGarde}
                                onChange={(e) =>
                                    setFormData({ ...formData, deGarde: e.target.checked })
                                }
                                className="w-4 h-4 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Heures d'ouverture */}
                        <div className="space-y-4">
                            <Label className="block text-sm font-medium text-gray-700">
                                Heures d'ouverture
                            </Label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="heureDebut" className="block text-xs text-gray-600">
                                        Heure de début
                                    </Label>
                                    <Input
                                        id="heureDebut"
                                        type="time"
                                        value={formData.heureOuverture.debut}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            heureOuverture: {
                                                ...formData.heureOuverture,
                                                debut: e.target.value
                                            }
                                        })}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="heureFin" className="block text-xs text-gray-600">
                                        Heure de fin
                                    </Label>
                                    <Input
                                        id="heureFin"
                                        type="time"
                                        value={formData.heureOuverture.fin}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            heureOuverture: {
                                                ...formData.heureOuverture,
                                                fin: e.target.value
                                            }
                                        })}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colonne de droite */}
                    <div className="space-y-6">
                        <LocationSelector
                            // formData={formData}
                            // setFormData={setFormData}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => console.log("Annuler")}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Enregistrer", formData);
                        }}
                    >
                        Enregistrer
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddPharmacy;
