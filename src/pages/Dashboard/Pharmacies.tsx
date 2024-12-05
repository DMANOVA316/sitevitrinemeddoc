import React, { useState } from "react";
import AddPharmacy from "@/components/Pharmacie/AddPharmacy";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Clock } from "lucide-react";

const PharmacyList: React.FC = () => {
    const [data, setData] = useState<Pharmacy[]>([
        {
            id: 1,
            name: "pharmacie 1",
            profile: "profile 1",
            contact: "contact 1",
            address: "address 1",
            province: "province 1",
            region: "region 1",
            district: "district 1",
            commune: "commune 1",
            service: "service 1",
            location: "location 1",
            deGarde: false,
            heureOuverture: {
                debut: "09:00",
                fin: "17:00",
            },
        },
        {
            id: 2,
            name: "pharmacie 2",
            profile: "profile 2",
            contact: "contact 2",
            address: "address 2",
            province: "province 2",
            region: "region 2",
            district: "district 2",
            commune: "commune 2",
            service: "service 2",
            location: "location 2",
            deGarde: true,
            heureOuverture: {
                debut: "08:00",
                fin: "16:00",
            },
        },
    ]);

    const [search, setSearch] = useState("");
    const [filterDeGarde, setFilterDeGarde] = useState<boolean | null>(null);
    const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleDelete = (id: number) => {
        setData(data.filter((item) => item.id !== id));
    };

    const handleEdit = (id: number) => {
        const pharmacyToEdit = data.find((item) => item.id === id);
        if (pharmacyToEdit) {
            setEditingPharmacy(pharmacyToEdit);
            setIsEditDialogOpen(true);
        }
    };

    const handleUpdatePharmacy = (updatedData: Pharmacy) => {
        setData(data.map(item => 
            item.id === updatedData.id ? updatedData : item
        ));
        setIsEditDialogOpen(false);
        setEditingPharmacy(null);
    };

    const toggleDeGarde = (id: number) => {
        setData(data.map((item) =>
            item.id === id
                ? { ...item, deGarde: !item.deGarde }
                : item
        ));
    };

    const filteredData = data.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.address.toLowerCase().includes(search.toLowerCase());

        if (filterDeGarde === null) return matchesSearch;
        return matchesSearch && item.deGarde === filterDeGarde;
    });

    return (
        <div className="container mx-auto p-4">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Modifier la pharmacie</DialogTitle>
                    </DialogHeader>
                    <AddPharmacy 
                        initialData={editingPharmacy} 
                        onSubmit={handleUpdatePharmacy}
                    />
                </DialogContent>
            </Dialog>
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
                        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                            </svg>
                            Nouvelle Pharmacie
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl">
                        <DialogHeader>
                            <DialogTitle>Ajouter une nouvelle pharmacie</DialogTitle>
                        </DialogHeader>
                        <AddPharmacy />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="relative">
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input type="checkbox" className="h-4 w-4" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profile
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nom
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Horaire
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Adresse
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="h-4 w-4" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.profile}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.service}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {item.heureOuverture.debut} - {item.heureOuverture.fin}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="text-gray-600 hover:text-gray-800">
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                                                    </svg>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => console.log("Option 1")}>
                                                        Voir détails
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toggleDeGarde(item.id)}>
                                                        {item.deGarde ? "Retirer de garde" : "Marquer de garde"}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PharmacyList;
