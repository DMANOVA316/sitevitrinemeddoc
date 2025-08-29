// Générateur de sitemap pour MEDDoC
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (): SitemapUrl[] => {
  const baseUrl = 'https://meddoc.mg';
  const currentDate = new Date().toISOString().split('T')[0];

  const urls: SitemapUrl[] = [
    // Page d'accueil
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    // Pages principales
    {
      loc: `${baseUrl}/qui-sommes-nous`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/contacts`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/app-meddoc`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    // Pages de services
    {
      loc: `${baseUrl}/services/solutions-digitales-sante`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services/consulting-sante-strategie`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services/formations-sante`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services/community-management-medical`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    // Pages utilitaires
    {
      loc: `${baseUrl}/pharmacies-et-pharmacies-de-garde`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/bibliotheque-numerique-sante`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    }
  ];

  return urls;
};

export const generateSitemapXML = (): string => {
  const urls = generateSitemap();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    if (url.changefreq) {
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    }
    if (url.priority) {
      xml += `    <priority>${url.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};
