import Provinces from './provinces.json';
import Regions from './regions.json';
const BASE_URL = "https://localization.mg-dev.space/api";

export const fetchProvinces = async () => {
    const provinces: Province[] = Provinces;
    return provinces;
};

export const fetchRegions = async () => {
    const regions: Region[] = Regions
    return regions;
};

export const fetchDistricts = async () => {
    const response = await fetch(`${BASE_URL}/districts?page=1`);
    const data = await response.json();
    for (let i = 1; i < Math.floor(data["hydra:totalItems"]/29); i++) {
        const res = await fetch(`${BASE_URL}/districts?page=${i+1}`);
        const dataTemp = await res.json();
        data["hydra:member"] = [...data["hydra:member"],...dataTemp["hydra:member"]];
    }
    return data["hydra:member"] || [];
};

export const fetchCommunes = async () => {
    const response = await fetch(`${BASE_URL}/communes?page=1`);
    const data = await response.json();
    for (let i = 1; i < 57; i++) {
        const res = await fetch(`${BASE_URL}/communes?page=${i+1}`);
        const dataTemp = await res.json();
        data["hydra:member"] = [...data["hydra:member"],...dataTemp["hydra:member"]];
    }
    return data["hydra:member"] || [];
};
