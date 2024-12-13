// Fonction pour récupérer les données depuis le localStorage
export const getLocationDataFromLocalStorage = () => {
  const data = localStorage.getItem("locationData");
  return data ? JSON.parse(data) : null;
};

// Fonction pour sauvegarder les données dans le localStorage
export const saveLocationDataToLocalStorage = (data: object) => {
  localStorage.setItem("locationData", JSON.stringify(data));
};

// Fonction pour supprimer les données du localStorage
export const removeLocationDataFromLocalStorage = () => {
  localStorage.removeItem("locationData");
};
