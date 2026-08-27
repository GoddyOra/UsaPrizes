// Shared JSON-LD builders for Phase 5 (structured data). Each returns a plain object with its
// own "@context" so it can be dropped straight into a <script type="application/ld+json">.

const SITE_NAME = 'USA Prizes';
const SITE_URL = 'https://usaprizes.com';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.href, SITE_URL).toString(),
    })),
  };
}

// itemReviewed is marked up as an Organization (the operator), not a Product/LocalBusiness --
// this is an editorial review of a third-party service, the same pattern review-aggregator
// sites use, not a self-review of something we sell (which is what Google's structured-data
// guidelines actually restrict).
export function reviewSchema(params: {
  itemName: string;
  ratingValue: number;
  reviewBody: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: params.itemName,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: params.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: params.reviewBody,
    datePublished: params.datePublished,
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(params: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}
