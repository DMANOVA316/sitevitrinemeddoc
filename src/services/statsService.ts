import supabase from "@/utils/supabase";

export type StatsDataType = {
  pharmacies: number;
  contacts: number;
  partenaires: number;
  urgences: number;
};

class StatsService {
  async getStats(): Promise<StatsDataType> {
    try {
      // Fetch all counts in parallel for better performance
      const [
        pharmaciesCount,
        contactsCount,
        partenairesCount,
        urgencesCount
      ] = await Promise.all([
        this.getPharmaciesCount(),
        this.getContactsCount(),
        this.getPartenairesCount(),
        this.getUrgencesCount()
      ]);

      return {
        pharmacies: pharmaciesCount,
        contacts: contactsCount,
        partenaires: partenairesCount,
        urgences: urgencesCount
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  }

  private async getPharmaciesCount(): Promise<number> {
    const { count, error } = await supabase
      .from('pharmacies')
      .select('*', { count: 'exact' });

    if (error) throw error;
    return count || 0;
  }

  private async getContactsCount(): Promise<number> {
    const { count, error } = await supabase
      .from('contactez_nous')
      .select('*', { count: 'exact' });

    if (error) throw error;
    return count || 0;
  }

  private async getPartenairesCount(): Promise<number> {
    const { count, error } = await supabase
      .from('partenaire')
      .select('*', { count: 'exact' });

    if (error) throw error;
    return count || 0;
  }

  private async getUrgencesCount(): Promise<number> {
    const { count, error } = await supabase
      .from('ambulance')
      .select('*', { count: 'exact' });

    if (error) throw error;
    return count || 0;
  }
}

export const statsService = new StatsService();
