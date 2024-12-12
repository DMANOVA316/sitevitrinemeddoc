import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { statsService, type StatsDataType } from '@/services/statsService';
import {
  Building2,
  Phone,
  Users,
  Activity,
  Loader2
} from 'lucide-react';

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsDataType>({
    pharmacies: 0,
    contacts: 0,
    partenaires: 0,
    urgences: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats_data = [
    {
      title: 'Total Pharmacies',
      value: stats.pharmacies,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Contacts',
      value: stats.contacts,
      icon: Phone,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Partenaires',
      value: stats.partenaires,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Urgences',
      value: stats.urgences,
      icon: Activity,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats_data.map((item, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${item.bgColor}`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
