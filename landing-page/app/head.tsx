import React from 'react';

export default function Head() {
  const title = 'Sailfish Solution — AI SEO Tools (Coming Soon)';
  const description = 'Fast, smart tools for developers — Sailfish Solution.';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sailfish Solution",
    "url": siteUrl,
    "sameAs": []
  };

  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" href="/images/logo.svg" />
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={`${siteUrl}/images/og-image.webp`} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link rel="image_src" href={`${siteUrl}/images/og-image.webp`} />
      {/* Fallbacks for older crawlers */}
      <meta property="og:image:alt" content="Sailfish Solution — Fast, smart SEO tools" />
      <meta name="twitter:image" content={`${siteUrl}/images/og-image.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#ffffff" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
