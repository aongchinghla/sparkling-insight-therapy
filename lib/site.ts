import type { Article } from '@/data/blog-data';

export const siteUrl = 'https://www.sparklingtherapybd.com';

export const siteConfig = {
  name: 'Sparkling Insight Therapy Point',
  shortName: 'Sparkling Insight',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: 'sparklingtherapybd@gmail.com',
  phoneDisplay: '+880 1902-028787',
  phoneE164: '+8801902028787',
  whatsapp: 'https://wa.me/8801902028787',
  address: {
    streetAddress: 'House No: 395, New Eskaton Road',
    addressLocality: 'Dhaka',
    postalCode: '1000',
    addressCountry: 'BD',
  },
  geo: {
    latitude: 23.7485249,
    longitude: 90.4019931,
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61555970824519',
    'https://www.instagram.com/sparklinginsightbd/',
    'https://www.youtube.com/channel/UCS81ctdUNTss-ddihVl-y4w',
  ],
};

export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    '@id': `${siteUrl}/#business`,
    name: siteConfig.name,
    alternateName: ['Sparkling Insight', 'Sparkling Therapy BD'],
    url: siteUrl,
    logo: siteConfig.logo,
    image: siteConfig.logo,
    email: siteConfig.email,
    telephone: siteConfig.phoneE164,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...siteConfig.geo,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Saturday',
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Dhaka' },
      { '@type': 'Country', name: 'Bangladesh' },
    ],
    medicalSpecialty: [
      'SpeechLanguagePathology',
      'OccupationalTherapy',
      'Physiotherapy',
      'PsychologicalTreatment',
    ],
    sameAs: siteConfig.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteConfig.name,
    alternateName: ['Sparkling Insight', 'Sparkling Therapy BD'],
    url: siteUrl,
    publisher: { '@id': `${siteUrl}/#business` },
    inLanguage: 'en-BD',
  };
}

export function servicesItemListJsonLd(
  serviceItems: Array<{ name: string; slug: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Child therapy services in Dhaka',
    itemListElement: serviceItems.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  };
}

export function serviceJsonLd(service: {
  name: string;
  slug: string;
  desc: string;
}) {
  const cleanName = service.name.replace(/\s*\([^)]*\)\s*/g, '').trim();

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: `${cleanName} in Dhaka`,
    description: service.desc,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Dhaka' },
      { '@type': 'Country', name: 'Bangladesh' },
    ],
    serviceType: cleanName,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.thumbnail,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo,
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  };
}
