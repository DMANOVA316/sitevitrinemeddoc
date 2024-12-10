import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  setAmbulances,
  addAmbulance,
  updateAmbulance,
  deleteAmbulance,
  Ambulance,
} from '@/redux/features/ambulanceSlice';
import AddAmbulance from '@/components/Ambulance/AddAmbulance';
import AmbulanceCard from '@/components/Ambulance/AmbulanceCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Pencil, Trash2 } from 'lucide-react';
import { ambulanceService } from '@/services/ambulanceService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AmbulanceList: React.FC = () => {
  const dispatch = useDispatch();
  const ambulances = useSelector((state: RootState) => state.ambulance.ambulances);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAmbulance, setEditingAmbulance] = useState<Ambulance | null>(null);
  const [search, setSearch] = useState('');

  const fetchAmbulances = async () => {
    try {
      const data = await ambulanceService.getAmbulances();
      dispatch(setAmbulances(data));
    } catch (error) {
      console.error('Error fetching ambulances:', error);
      toast.error('Erreur', {
        description: 'Impossible de récupérer les ambulances',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await ambulanceService.deleteAmbulance(id);
      dispatch(deleteAmbulance(id));
      toast.success('Ambulance supprimée', {
        description: "L'ambulance a été supprimée avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error deleting ambulance:', error);
      toast.error('Erreur', {
        description: "Impossible de supprimer l'ambulance",
        duration: 3000,
      });
    }
  };

  const handleEdit = (ambulance: Ambulance) => {
    setEditingAmbulance(ambulance);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAmbulance = async (updatedData: Ambulance) => {
    try {
      if (!editingAmbulance?.id) {
        throw new Error("ID de l'ambulance manquant");
      }

      const response = await ambulanceService.updateAmbulance(
        editingAmbulance.id,
        updatedData
      );

      dispatch(updateAmbulance(response));
      setIsEditDialogOpen(false);
      setEditingAmbulance(null);
      toast.success('Ambulance modifiée', {
        description: 'Les modifications ont été enregistrées avec succès',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error updating ambulance:', error);
      toast.error('Erreur', {
        description: "Impossible de modifier l'ambulance",
        duration: 3000,
      });
    }
  };

  const handleAddAmbulance = async (newData: Ambulance) => {
    try {
      const response = await ambulanceService.addAmbulance(newData);

      dispatch(addAmbulance(response));
      setIsAddDialogOpen(false);
      toast.success('Nouvelle ambulance', {
        description: "L'ambulance a été ajoutée avec succès",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error adding ambulance:', error);
      toast.error('Erreur', {
        description: "Impossible d'ajouter l'ambulance",
        duration: 3000,
      });
    }
  };

  const filteredData = ambulances.filter((item) => {
    return (
      item.nom.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher une ambulance..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-meddoc-primary/20 focus:border-meddoc-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Ajouter une ambulance</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle ambulance</DialogTitle>
            </DialogHeader>
            <AddAmbulance onSubmit={handleAddAmbulance} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredData.map((ambulance) => (
          <div key={ambulance.id} className="relative group">
            <AmbulanceCard ambulance={ambulance} />
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white"
                onClick={() => handleEdit(ambulance)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white text-red-600 hover:text-red-700"
                onClick={() => handleDelete(ambulance.id!)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier l'ambulance</DialogTitle>
          </DialogHeader>
          {editingAmbulance && (
            <AddAmbulance
              ambulance={editingAmbulance}
              onSubmit={handleUpdateAmbulance}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AmbulanceList;
