import type { Metadata } from 'next';

// Base SEO configuration
export const siteConfig = {
  name: 'Envimerse',
  title: 'Envimerse - Plataforma Multi-POV de Streaming ao Vivo',
  description: 'Experimente eventos ao vivo de múltiplas perspectivas simultaneamente. A primeira plataforma do mundo para streaming multi-ângulo com tecnologia POV revolucionária e óculos inteligentes.',
  url: 'https://envimerse-oqvnkw1oj-eubbbrunos-projects.vercel.app',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/envimerse',
    github: 'https://github.com/eubbbruno/envimerse',
    discord: 'https://discord.gg/envimerse',
  },
  keywords: [
    'Multi-POV',
    'Point of View',
    'Streaming ao Vivo',
    'Múltiplas Perspectivas',
    'Óculos Inteligentes',
    'Ray-Ban Meta',
    'Apple Vision Pro',
    'Oakley Prizm',
    'VR',
    'Virtual Reality',
    'Entertainment',
    'Events',
    'Concerts',
    'Shows ao Vivo',
    'Blockchain',
    'NFT',
    'Web3',
    'Streaming',
    'Tecnologia POV',
    'Transmissão Multi-Ângulo',
  ],
  authors: [
    {
      name: 'Bruno Briote',
      url: 'https://envimerse-oqvnkw1oj-eubbbrunos-projects.vercel.app',
    },
  ],
  creator: 'Bruno Briote',
  publisher: 'Envimerse',
  category: 'Technology',
};

// Default metadata for the application
export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  category: siteConfig.category,
  metadataBase: new URL(siteConfig.url),
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@envimerse',
    site: '@envimerse',
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/logo.png', color: '#8D42EC' },
    ],
  },
  
  // Manifest
  manifest: '/site.webmanifest',
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Other
  alternates: {
    canonical: siteConfig.url,
  },
};

// Page-specific metadata generators
export const generatePageMetadata = (
  title: string,
  description?: string,
  image?: string,
  noIndex?: boolean
): Metadata => ({
  title,
  description: description || siteConfig.description,
  openGraph: {
    title,
    description: description || siteConfig.description,
    images: image ? [image] : [siteConfig.ogImage],
  },
  twitter: {
    title,
    description: description || siteConfig.description,
    images: image ? [image] : [siteConfig.ogImage],
  },
  robots: noIndex ? { index: false, follow: false } : undefined,
});

// Structured data generators
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.github,
    siteConfig.links.discord,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Portuguese'],
  },
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const generateEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image?: string;
  price?: number;
  currency?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'VirtualLocation',
    name: event.location,
    url: siteConfig.url,
  },
  image: event.image || siteConfig.ogImage,
  organizer: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  offers: event.price ? {
    '@type': 'Offer',
    price: event.price,
    priceCurrency: event.currency || 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
  } : undefined,
});

// SEO utilities
export const truncateDescription = (text: string, maxLength = 160): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
};

// Meta tag helpers
export const generateMetaTags = (metadata: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}) => {
  const tags = [];
  
  if (metadata.title) {
    tags.push({ name: 'title', content: metadata.title });
    tags.push({ property: 'og:title', content: metadata.title });
    tags.push({ name: 'twitter:title', content: metadata.title });
  }
  
  if (metadata.description) {
    tags.push({ name: 'description', content: metadata.description });
    tags.push({ property: 'og:description', content: metadata.description });
    tags.push({ name: 'twitter:description', content: metadata.description });
  }
  
  if (metadata.image) {
    tags.push({ property: 'og:image', content: metadata.image });
    tags.push({ name: 'twitter:image', content: metadata.image });
  }
  
  if (metadata.url) {
    tags.push({ property: 'og:url', content: metadata.url });
  }
  
  if (metadata.type) {
    tags.push({ property: 'og:type', content: metadata.type });
  }
  
  return tags;
};

// Breadcrumb schema generator
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// FAQ schema generator
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Product schema for NFT tickets
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  brand: {
    '@type': 'Brand',
    name: siteConfig.name,
  },
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: product.currency,
    availability: `https://schema.org/${product.availability}`,
    seller: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  },
});

export default siteConfig; 