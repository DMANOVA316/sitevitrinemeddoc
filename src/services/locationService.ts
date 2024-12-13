import Provinces from "./provinces.json";
import Regions from "./regions.json";

const BASE_URL = "https://localization.mg-dev.space/api";

class LocationService {
  async fetchProvinces(): Promise<Province[]> {
    return Provinces; // Donnees en json
  }

  async fetchRegions(): Promise<Region[]> {
    return Regions; // Donnees en json
  }

  async fetchDistricts(): Promise<District[]> {
    const districts = await this.fetchPaginatedData<District>(
      `${BASE_URL}/districts`,
    );
    return districts;
  }

  async fetchCommunes(): Promise<Commune[]> {
    const communes = await this.fetchPaginatedData<Commune>(
      `${BASE_URL}/communes`,
    );
    return communes;
  }

  private async fetchPaginatedData<T>(url: string): Promise<T[]> {
    const response = await fetch(`${url}?page=1`);
    const data = await response.json();
    const totalItems = data["hydra:totalItems"];
    const totalPages = Math.ceil(totalItems / data["hydra:member"].length);

    for (let i = 2; i <= totalPages; i++) {
      const res = await fetch(`${url}?page=${i}`);
      const pageData = await res.json();
      data["hydra:member"].push(...pageData["hydra:member"]);
    }
    return data["hydra:member"];
  }
}

export const locationService = new LocationService();
