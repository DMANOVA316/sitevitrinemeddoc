import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
  type?: 'Organization' | 'MedicalOrganization' | 'WebPage' | 'Service';
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
  services?: string[];
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({
  type = 'MedicalOrganization',
  name = 'MEDDoC',
  description = 'MEDDoC propose des solutions innovantes pour la santé à Madagascar : digital, consulting, formation et community management médical.',
  url = 'https://meddoc.mg',
  logo = 'https://meddoc.mg/logo.png',
  image = 'https://meddoc.mg/og-image.png',
  telephone = '+261 34 12 345 67',
  email = 'contact@meddoc.mg',
  address = {
    addressLocality: 'Antananarivo',
    addressRegion: 'Analamanga',
    addressCountry: 'MG'
  },
  sameAs = [
    'https://facebook.com/MEDDoCMG',
    'https://linkedin.com/company/meddoc-mg',
    'https://x.com/MEDDoCMG'
  ],
  services,
  breadcrumbs
}) => {
  
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      name,
      description,
      url,
      logo,
      image,
      sameAs
    };

    if (type === 'MedicalOrganization' || type === 'Organization') {
      return {
        ...baseSchema,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone,
          email,
          contactType: 'Customer Support',
          areaServed: 'MG',
          availableLanguage: ['fr', 'mg']
        },
        address: {
          '@type': 'PostalAddress',
          ...address
        },
        ...(services && {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Services MEDDoC',
            itemListElement: services.map((service, index) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service
              },
              position: index + 1
            }))
          }
        })
      };
    }

    if (type === 'WebPage') {
      return {
        ...baseSchema,
        '@type': 'WebPage',
        isPartOf: {
          '@type': 'WebSite',
          name: 'MEDDoC',
          url: 'https://meddoc.mg'
        },
        ...(breadcrumbs && {
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.name,
              item: crumb.url
            }))
          }
        })
      };
    }

    return baseSchema;
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(generateSchema(), null, 2)}
      </script>
    </Helmet>
  );
};

export default SchemaOrg;
