import React, { useEffect, useState } from "react";
import { pharmacyService } from "@/services/pharmacyService";
import { Button } from "@/components/ui/button";

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const data = await pharmacyService.getPharmacies();
        setPharmacies(data);
      } catch (error) {
        console.error("Erreur de récupération des pharmacies", error);
      }
    };

    fetchPharmacies();
  }, []);

  return (
    <div>
      <h2>Liste des pharmacies</h2>
      <Button className="bg-meddoc-primary">Ajouter une pharmacie</Button>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Province</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map((pharmacy) => (
            <tr key={pharmacy.id}>
              <td>{pharmacy.name}</td>
              <td>{pharmacy.address}</td>
              <td>{pharmacy.province}</td>
              <td>
                <Button>Modifier</Button>
                <Button className="bg-red-500">Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacyList;
