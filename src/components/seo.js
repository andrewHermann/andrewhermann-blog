import React from 'react'
import { Helmet } from 'react-helmet'

const SEO = ({ 
  title, 
  description, 
  keywords = "", 
  image = "/ah-logo.png",
  url = "https://andrew.cloudhopper.ch",
  type = "website",
  structuredData = null,
  breadcrumbs = null,
  canonical = null
}) => {
  const defaultTitle = "Andrew J. Hermann - Strategic Leadership & AI Innovation Expert"
  const defaultDescription = "Expert in organizational strategy, project portfolio management, data-driven decision-making, and applied artificial intelligence in public administration."
  const defaultKeywords = "Andrew Hermann, organizational strategy, project management, artificial intelligence, public administration, strategic leadership, AI innovation"
  
  const pageTitle = title ? `${title} - Andrew J. Hermann` : defaultTitle
  const pageDescription = description || defaultDescription
  const pageKeywords = keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords
  const pageUrl = url || "https://andrew.cloudhopper.ch"
  const canonicalUrl = canonical || pageUrl
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Andrew J. Hermann" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Andrew J. Hermann" />
      <meta property="og:image" content={`https://andrew.cloudhopper.ch${image}`} />
      <meta property="og:image:alt" content={title || "Andrew J. Hermann"} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@andrewhermann" />
      <meta name="twitter:creator" content="@andrewhermann" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`https://andrew.cloudhopper.ch${image}`} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumbs Structured Data */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": crumb.url
            }))
          })}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
