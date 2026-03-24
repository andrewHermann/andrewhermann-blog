/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
