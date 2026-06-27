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

import { Link } from 'react-router-dom'
import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const BehindTheSite = () => {
  const architecturePoints = [
    {
      title: "Hand-built Architecture",
      description: "HTML, CSS, and a light touch of JavaScript"
    },
    {
      title: "Modular Components",
      description: "Deduplicated components and design tokens"
    },
    {
      title: "Version Controlled",
      description: "Hosted publicly on GitHub"
    }
  ]

  const designPrinciples = [
    {
      principle: "Transparency",
      application: "Open-source, inspectable, and reproducible"
    },
    {
      principle: "Pragmatism",
      application: "Minimal dependencies, no unnecessary features"
    },
    {
      principle: "Resilience",
      application: "Minimal moving parts. The frontend is statically served; the backend is lean, self-hosted, and fully under my control with no third-party dependencies in the critical path."
    },
    {
      principle: "Sovereignty",
      application: "Self-hosted infrastructure running independently from cloud dependencies"
    },
    {
      principle: "Sustainability",
      application: "Reuse of legacy hardware, low energy footprint"
    }
  ]

  const philosophyPoints = [
    { text: "No tracking or surveillance by default" },
    { text: "No frameworks I could not fully account for" },
    { text: "No features I could not justify" }
  ]

  const behindSiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Behind the Site - Technical Architecture & Philosophy",
    "description": "How and why this site was built entirely in the open - a statement about transparent, modular, and sustainable digital architecture",
    "url": "https://andrew.cloudhopper.ch/behind-the-site",
    "mainEntity": {
      "@type": "TechArticle",
      "name": "Site Architecture & Digital Infrastructure Philosophy",
      "author": {
        "@type": "Person",
        "name": "Andrew J. Hermann"
      },
      "about": [
        "Open Source Development",
        "Digital Public Infrastructure",
        "Modern Web Architecture",
        "Government Technology",
        "Transparent Systems"
      ]
    }
  }

  const behindSiteBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" },
    { name: "Behind the Site", url: "https://andrew.cloudhopper.ch/behind-the-site" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Behind the Site"
        description="How and why this site was built entirely in the open - a statement about transparent, modular, and sustainable digital architecture that doesn't rely on hype, excess, or complexity."
        keywords="behind the site, open source, transparent architecture, digital infrastructure, sustainable web development, government technology, minimalist design, self-hosted"
        url="https://andrew.cloudhopper.ch/behind-the-site"
        structuredData={behindSiteStructuredData}
        breadcrumbs={behindSiteBreadcrumbs}
      />

      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Behind the Site</h1>
          <p className="page-subtitle">
            How and why this site was built entirely in the open
          </p>
        </div>

        <div className="content-main">
          <div className="section-card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 'var(--font-size-xl)', lineHeight: '1.6', marginBottom: 'var(--space-lg)', maxWidth: '800px', margin: '0 auto var(--space-lg) auto' }}>
              This website is more than just a personal portfolio. It is a quiet statement about how digital systems should be built, especially in the public sector.
            </p>
            <p style={{ fontSize: 'var(--font-size-lg)', maxWidth: '700px', margin: '0 auto' }}>
              Every decision reflects my core working principles: <strong style={{ color: 'var(--color-secondary)' }}>build small</strong>, <strong style={{ color: 'var(--color-secondary)' }}>build openly</strong>, and <strong style={{ color: 'var(--color-secondary)' }}>make it reusable</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2xl)', flexWrap: 'wrap', width: '100%' }}>
            <div className="section-card" style={{ flex: '1 1 400px', minWidth: '0' }}>
              <h2>My Digital Philosophy</h2>
              <p>
                The architecture reflects a position: systems should be inspectable, minimal, and fully accountable. That means:
              </p>

              <div style={{ margin: 'var(--space-xl) 0' }}>
                {philosophyPoints.map((point, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--space-md) 0',
                    borderBottom: index < philosophyPoints.length - 1 ? '1px solid rgba(74, 78, 105, 0.1)' : 'none'
                  }}>
                    <div style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 'var(--space-md)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      &#10003;
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong>{point.text}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ marginTop: 'var(--space-xl)', fontStyle: 'italic', textAlign: 'center', fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
                Clean, versioned, open code. Because <strong>transparency is infrastructure.</strong>
              </p>
            </div>

            <div className="section-card" style={{ flex: '1 1 400px', minWidth: '0' }}>
              <h2>Architecture & Hosting</h2>
              <p style={{ marginBottom: 'var(--space-xl)' }}>
                This site is static by design, and intentionally minimalist in both structure and function.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                {architecturePoints.map((point, index) => (
                  <div key={index} style={{
                    padding: 'var(--space-md)',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: 'var(--border-radius-lg)',
                    border: '1px solid var(--color-accent-1)'
                  }}>
                    <h4 style={{ margin: '0 0 var(--space-xs) 0', color: 'var(--color-primary)', fontSize: 'var(--font-size-base)', fontWeight: 600 }}>{point.title}</h4>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', lineHeight: '1.5' }}>{point.description}</p>
                  </div>
                ))}
              </div>

              <div style={{
                textAlign: 'center',
                padding: 'var(--space-lg)',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--border-radius-lg)',
                border: '1px solid var(--color-accent-1)'
              }}>
                <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', margin: 0 }}>
                  <strong>The most unusual part:</strong><br />
                  It is physically hosted from my home network.
                </p>
              </div>
            </div>
          </div>

          <div className="section-card" style={{ borderLeft: '3px solid var(--color-primary)' }}>
            <h2 style={{ marginBottom: 'var(--space-lg)' }}>The 20-Year-Old Workstation Keeping the Lights On</h2>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-xl)'
            }}>
              <div style={{ padding: 'var(--space-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-lg)', flex: '1 1 180px' }}>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Hardware</div>
                <div style={{ fontWeight: '600' }}>2005 IBM IntelliStation Z Pro</div>
              </div>
              <div style={{ padding: 'var(--space-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-lg)', flex: '1 1 180px' }}>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Processor</div>
                <div style={{ fontWeight: '600' }}>Intel Core 2 Quad @ 2.66GHz</div>
              </div>
              <div style={{ padding: 'var(--space-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-lg)', flex: '1 1 180px' }}>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Age</div>
                <div style={{ fontWeight: '600' }}>Older than the iPhone</div>
              </div>
            </div>

            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', marginBottom: 'var(--space-md)', color: 'var(--color-secondary)' }}>Why?</h3>
            <p>Because it works. Because it is elegant in its simplicity. And because the idea of &quot;modern&quot; is too often confused with &quot;new.&quot;</p>
            <p style={{ fontStyle: 'italic', fontSize: 'var(--font-size-lg)', lineHeight: '1.6', marginTop: 'var(--space-lg)' }}>
              With intentional design, robust systems do not need hyperscale hardware or cloud dependency. They need clarity.
            </p>
          </div>

          <div className="section-card">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>Design Principles</h2>
              <p style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto' }}>
                This site embodies the same principles I apply in my work across government, defence, and AI governance:
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-lg)'
            }}>
              {designPrinciples.map((item, index) => (
                <div key={index} className="shared-card" style={{ flex: '1 1 240px', textAlign: 'center' }}>
                  <h3 style={{
                    margin: '0 0 var(--space-md) 0',
                    color: 'var(--color-primary)',
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: '600'
                  }}>
                    {item.principle}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: '1.6',
                    color: 'var(--color-text-secondary)'
                  }}>
                    {item.application}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2xl)', flexWrap: 'wrap', width: '100%' }}>
            <div className="section-card" style={{ flex: '1 1 400px', minWidth: '0' }}>
              <h2>Lessons From the Build</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', margin: 'var(--space-xl) 0' }}>
                <div style={{ padding: 'var(--space-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-lg)', borderLeft: '3px solid var(--color-primary)' }}>
                  <h3 style={{ margin: '0 0 var(--space-md) 0', color: 'var(--color-primary)', fontSize: 'var(--font-size-lg)' }}>The Reality</h3>
                  <p style={{ margin: 0 }}>Like any real system, this one did not start perfectly. The first version was messy: fragmented stylesheets, inconsistent page logic, and duplicated patterns.</p>
                </div>

                <div style={{ padding: 'var(--space-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-lg)', borderLeft: '3px solid var(--color-secondary)' }}>
                  <h3 style={{ margin: '0 0 var(--space-md) 0', color: 'var(--color-secondary)', fontSize: 'var(--font-size-lg)' }}>The Process</h3>
                  <p style={{ margin: 0 }}>Cleaning it up meant applying the same rigour I use in enterprise architecture: <strong>refactor, simplify, consolidate.</strong></p>
                </div>

                <div style={{ padding: 'var(--space-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-lg)', borderLeft: '3px solid var(--color-primary)' }}>
                  <h3 style={{ margin: '0 0 var(--space-md) 0', color: 'var(--color-secondary)', fontSize: 'var(--font-size-lg)' }}>The Principle</h3>
                  <p style={{ margin: 0, fontStyle: 'italic', fontSize: 'var(--font-size-lg)' }}>Do not reach for complexity when clarity will do.</p>
                </div>
              </div>
            </div>

            <div className="section-card" style={{ flex: '1 1 400px', minWidth: '0' }}>
              <h2>Open Source — Use It as You See Fit</h2>

              <div style={{
                padding: 'var(--space-xl)',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--border-radius-lg)',
                textAlign: 'center',
                margin: 'var(--space-xl) 0'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: 'var(--space-xs) var(--space-md)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  borderRadius: 'var(--border-radius-lg)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-md)'
                }}>
                  GPL v3 Licensed
                </div>
                <p style={{ fontSize: 'var(--font-size-lg)', margin: 'var(--space-md) 0 0 0' }}>
                  You can clone the repo, use the structure, or strip it down for your own site. Attribution is appreciated but not required. Pull requests welcome.
                </p>
              </div>

              <p style={{ marginBottom: 'var(--space-xl)' }}>
                This is how I believe public digital infrastructure should be: <strong>forkable, inspectable, and understandable by design.</strong>
              </p>

              <div style={{ textAlign: 'center' }}>
                <a href="https://github.com/andrewHermann/andrewhermann-blog"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn btn-primary">
                  View the Repository
                </a>
              </div>
            </div>
          </div>

          <div className="section-card" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: 'var(--space-md)' }}>Want to Talk?</h2>
            <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-xl)', maxWidth: '600px', margin: '0 auto var(--space-xl) auto' }}>
              If the approach interests you, get in touch.
            </p>

            <div style={{ marginBottom: 'var(--space-2xl)' }}>
              <Link to="/contact" className="btn btn-secondary">Contact me</Link>
            </div>

            <div style={{
              paddingTop: 'var(--space-xl)',
              borderTop: '1px solid rgba(74, 78, 105, 0.1)'
            }}>
              <h3 style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>Final Note</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
                fontStyle: 'italic',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-lg)',
                lineHeight: '1.6',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <p style={{ margin: 0 }}>Good systems do not brag.</p>
                <p style={{ margin: 0 }}>They run quietly, do their job, and get better through iteration.</p>
                <p style={{ margin: 0 }}><strong>That is what this site is. That is what I build.</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

BehindTheSite.defaultProps = {}

export default BehindTheSite
