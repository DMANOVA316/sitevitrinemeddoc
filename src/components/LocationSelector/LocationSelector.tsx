import { useState, useEffect } from "react";
import { fetchProvinces, fetchRegions, fetchDistricts, fetchCommunes } from "../../services/api";
import SelectRegion from "./SelectRegion";
import SelectDistrict from "./SelectDistrict";
import SelectCommune from "./SelectCommune";
import SelectProvince from "./SelectProvince";

const LocationSelector = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [communes, setCommunes] = useState<Commune[]>([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [filteredCommunes, setFilteredCommunes] = useState<Commune[]>([]);

    // Charger les données depuis l'API
    useEffect(() => {
        fetchProvinces().then(setProvinces);
        fetchRegions().then(setRegions);
        fetchDistricts().then(setDistricts);
        fetchCommunes().then(setCommunes);
    }, []);

    // Filtrer les région lorsque la province change
    useEffect(() => {
        const filtered = regions.filter(
            (region) => region.province["@id"] === selectedProvince
        );
        setFilteredRegions(filtered);
        setSelectedRegion("");
        setFilteredDistricts([]);
        setSelectedDistrict("");
        setFilteredCommunes([]);
    }, [selectedProvince, regions]);

    // Filtrer les districts lorsque la région change
    useEffect(() => {
        const filtered = districts.filter(
            (district) => district.region["@id"] === selectedRegion
        );
        setFilteredDistricts(filtered);
        setSelectedDistrict("");
        setFilteredCommunes([]);
    }, [selectedRegion, districts]);

    // Filtrer les communes lorsque le district change
    useEffect(() => {
        const filtered = communes.filter(
            (commune) => commune.district["@id"] === selectedDistrict
        );
        setFilteredCommunes(filtered);
    }, [selectedDistrict, communes]);

    return (
        <div className="mt-5">
            <SelectProvince
                provinces={provinces}
                selectedProvince={selectedProvince}
                onSelectProvince={setSelectedProvince}
            />
            <SelectRegion
                regions={filteredRegions}
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
                disabled={filteredRegions.length > 0}
            />
            <SelectDistrict
                districts={filteredDistricts}
                selectedDistrict={selectedDistrict}
                onSelectDistrict={setSelectedDistrict}
                disabled={filteredDistricts.length > 0}
            />
            <SelectCommune 
                communes={filteredCommunes}
                disabled={filteredCommunes.length > 0}
            />
        </div>
    );
};

export default LocationSelector;
