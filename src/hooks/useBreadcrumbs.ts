import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();

  return useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Accueil', url: 'https://meddoc.mg/' }
    ];

    // Map des routes vers des noms lisibles
    const routeNames: Record<string, string> = {
      'qui-sommes-nous': 'À propos',
      'contacts': 'Contacts',
      'app-meddoc': 'APP MEDDoC',
      'services': 'Nos services',
      'solutions-digitales-sante': 'Solutions Digitales Santé',
      'consulting-sante-strategie': 'Consulting Santé et Stratégie',
      'formations-sante': 'Formations Santé',
      'community-management-medical': 'Community Management Médical',
      'pharmacies-et-pharmacies-de-garde': 'Pharmacies',
      'bibliotheque-numerique-sante': 'Bibliothèque'
    };

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        name,
        url: `https://meddoc.mg${currentPath}`
      });
    });

    return breadcrumbs;
  }, [location.pathname]);
};
