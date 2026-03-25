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

import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const BehindTheSite = () => {
  // Architecture points data for dynamic rendering
  const architecturePoints = [
    {
      icon: "🏗️",
      title: "Hand-built Architecture",
      description: "HTML, CSS, and a light touch of JavaScript"
    },
    {
      icon: "🔧", 
      title: "Modular Components",
      description: "Deduplicated components and design tokens"
    },
    {
      icon: "📦",
      title: "Version Controlled",
      description: "Hosted publicly on GitHub"
    }
  ]

  // Design principles data
  const designPrinciples = [
    {
      principle: "Transparency",
      application: "Open-source, inspectable, and reproducible",
      icon: "🔍",
      color: "#10b981"
    },
    {
      principle: "Pragmatism", 
      application: "Minimal dependencies, no unnecessary features",
      icon: "⚡",
      color: "#f59e0b"
    },
    {
      principle: "Resilience",
      application: "Minimal moving parts. The frontend is statically served; the backend is lean, self-hosted, and fully under my control — no third-party dependencies in the critical path.",
      icon: "🛡️",
      color: "#8b5cf6"
    },
    {
      principle: "Sovereignty",
      application: "Self-hosted infrastructure running independently from big tech",
      icon: "🏛️", 
      color: "#ef4444"
    },
    {
      principle: "Sustainability",
      application: "Reuse of legacy hardware, low energy footprint",
      icon: "🌱",
      color: "#06b6d4"
    }
  ]

  // Philosophy points
  const philosophyPoints = [
    { text: "No trackers", icon: "✓" },
    { text: "No frameworks I didn't understand", icon: "✓" },
    { text: "No features I couldn't justify", icon: "✓" }
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
      
      <PageFloatingRobot bodyColor="#d0dae4" glowColor="#2563eb" />
      
      <Navbar />
      <div className="page-content">
        {/* Hero Section */}
        <div className="page-header">
          <h1 className="page-title">Behind the Site</h1>
          <p className="page-subtitle">
            How and why this site was built entirely in the open
          </p>
        </div>
        
        <div className="content-main">
        {/* Intro Statement - Full Width */}
        <div className="section-card" style={{textAlign: 'center', padding: '3rem', background: 'var(--color-accent-2)'}}>
            <p style={{fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto'}}>
              This website is more than just a personal portfolio. It&apos;s a quiet statement about how digital systems should be built—especially in the public sector.
            </p>
            
            <p style={{fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto'}}>
              Every decision reflects my core working principles: <strong style={{color: 'var(--color-secondary)'}}>build small</strong>, <strong style={{color: 'var(--color-secondary)'}}>build openly</strong>, and <strong style={{color: 'var(--color-secondary)'}}>make it reusable</strong>.
            </p>
        </div>

        <div style={{display: 'flex', gap: 'var(--space-2xl)', flexWrap: 'wrap', width: '100%'}}>
          {/* Digital Philosophy - Left side */}
          <div className="section-card" style={{flex: '1 1 400px', minWidth: '0'}}>
            <h2>My Digital Philosophy</h2>
            <p>
              I don&apos;t believe in black-box platforms or overengineered stacks that serve more to impress than to deliver. The modern web has become bloated with dependencies, scripts, and surveillance-by-default. I chose the opposite path:
            </p>
            
            <div style={{margin: '2rem 0'}}>
              {philosophyPoints.map((point, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 0',
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
                    marginRight: '1rem',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {point.icon}
                  </div>
                  <div style={{flex: 1}}>
                    <strong>{point.text}</strong>
                  </div>
                </div>
              ))}
            </div>
            
            <p style={{marginTop: '2rem', fontStyle: 'italic', textAlign: 'center', fontSize: '1.125rem', color: 'var(--color-text-secondary)'}}>
              Just clean, versioned, open code—because <strong>transparency is infrastructure.</strong>
            </p>
          </div>

          {/* Architecture & Hosting - Right side */}
          <div className="section-card" style={{flex: '1 1 400px', minWidth: '0'}}>
            <h2>Architecture & Hosting</h2>
            <p style={{marginBottom: '2rem'}}>
              This site is static by design, and intentionally minimalist in both structure and function.
            </p>
            
            <div style={{display: 'grid', gap: '1rem', marginBottom: '2rem'}}>
              {architecturePoints.map((point, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '1rem',
                  backgroundColor: 'var(--color-accent-2)',
                  borderRadius: '2px',
                  border: '1px solid var(--color-accent-1)'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    marginRight: '1rem',
                    marginTop: '0.25rem'
                  }}>
                    {point.icon}
                  </div>
                  <div>
                    <h4 style={{margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)'}}>{point.title}</h4>
                    <p style={{margin: 0, fontSize: '0.95rem', lineHeight: '1.5'}}>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: 'var(--color-accent-2)',
              borderRadius: '2px',
              border: '1px solid var(--color-accent-1)'
            }}>
              <p style={{fontSize: '1.125rem', fontWeight: '600', margin: 0}}>
                <strong>But the most unusual part?</strong><br />
                It&apos;s physically hosted—yes, really—from my home network.
              </p>
            </div>
          </div>
        </div>

        {/* The IBM Workstation - Full Width Highlight */}
        <div className="section-card" style={{
            background: 'var(--color-accent-2)',
            borderLeft: '3px solid var(--color-primary)',
            padding: '3rem'
          }}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start'}}>
              <div>
                <h2 style={{marginBottom: '1.5rem'}}>The 20-Year-Old Workstation Keeping the Lights On</h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '2px'}}>
                    <div style={{fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem'}}>Hardware</div>
                    <div style={{fontWeight: '600'}}>2005 IBM IntelliStation Z Pro</div>
                  </div>
                  <div style={{padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '2px'}}>
                    <div style={{fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem'}}>Processor</div>
                    <div style={{fontWeight: '600'}}>Intel Core 2 Quad @ 2.66GHz</div>
                  </div>
                  <div style={{padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '2px'}}>
                    <div style={{fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem'}}>Age</div>
                    <div style={{fontWeight: '600'}}>Older than the iPhone</div>
                  </div>
                </div>
                
                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--color-secondary)'}}>Why?</h3>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <p style={{margin: 0}}>Because it works.</p>
                    <p style={{margin: 0}}>Because it&apos;s elegant in its simplicity.</p>
                    <p style={{margin: 0}}>And because I believe the idea of &quot;modern&quot; is too often confused with &quot;new.&quot;</p>
                  </div>
                </div>
                
                <p style={{fontStyle: 'italic', fontSize: '1.125rem', lineHeight: '1.6'}}>
                  This old workstation has outlived trends, toolchains, and fads. It&apos;s never failed me. It quietly proves that with intentional design, robust systems don&apos;t need hyperscale hardware or cloud dependency. They just need clarity.
                </p>
              </div>
              
            </div>
        </div>

        {/* Design Principles - Cards Grid */}
        <div className="section-card" style={{padding: '3rem'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{marginBottom: '1rem'}}>Design Principles</h2>
              <p style={{fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto'}}>
                This site embodies the same principles I apply in my work across government, defense, and AI governance:
              </p>
            </div>
            
            <div style={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem'
            }}>
              {designPrinciples.map((item, index) => (
                <div key={index} style={{
                  padding: '2rem',
                  backgroundColor: 'var(--color-accent-2)',
                  borderRadius: '2px',
                  border: '1px solid var(--color-accent-1)',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  cursor: 'default'
                }} 
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)'
                  e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    margin: '0 0 1rem 0',
                    color: item.color,
                    fontSize: '1.25rem',
                    fontWeight: '600'
                  }}>
                    {item.principle}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: 'var(--color-text-secondary)'
                  }}>
                    {item.application}
                  </p>
                </div>
              ))}
            </div>
        </div>

        <div style={{display: 'flex', gap: 'var(--space-2xl)', flexWrap: 'wrap', width: '100%'}}>
          {/* Lessons Learned */}
          <div className="section-card" style={{flex: '1 1 400px', minWidth: '0'}}>
            <h2>Lessons From the Build</h2>
            
            <div style={{display: 'grid', gap: '1.5rem', margin: '2rem 0'}}>
              <div style={{padding: '1.5rem', backgroundColor: 'var(--color-accent-2)', borderRadius: '2px', borderLeft: '3px solid var(--color-primary)'}}>
                <h3 style={{margin: '0 0 0.75rem 0', color: 'var(--color-primary)', fontSize: '1.125rem'}}>The Reality</h3>
                <p style={{margin: 0}}>Like any real system, this one didn&apos;t start perfectly. The first version was messy—fragmented stylesheets, inconsistent page logic, and duplicated patterns.</p>
              </div>
              
              <div style={{padding: '1.5rem', backgroundColor: 'var(--color-accent-2)', borderRadius: '2px', borderLeft: '3px solid var(--color-secondary)'}}>
                <h3 style={{margin: '0 0 0.75rem 0', color: 'var(--color-secondary)', fontSize: '1.125rem'}}>The Process</h3>
                <p style={{margin: 0}}>Cleaning it up meant applying the same rigor I use in enterprise architecture: <strong>refactor, simplify, consolidate.</strong></p>
              </div>
              
              <div style={{padding: '1.5rem', backgroundColor: 'var(--color-accent-2)', borderRadius: '2px', borderLeft: '3px solid var(--color-primary)'}}>
                <h3 style={{margin: '0 0 0.75rem 0', color: 'var(--color-secondary)', fontSize: '1.125rem'}}>The Principle</h3>
                <p style={{margin: 0, fontStyle: 'italic', fontSize: '1.125rem'}}>Don&apos;t fall for complexity when clarity will do.</p>
              </div>
            </div>
          </div>

          {/* Fork It Section */}
          <div className="section-card" style={{flex: '1 1 400px', minWidth: '0'}}>
            <h2>Open Source — Use It as You See Fit</h2>
            
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--color-accent-2)',
              borderRadius: '2px',
              textAlign: 'center',
              margin: '2rem 0'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: '2px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                GPL v3 Licensed
              </div>
              <p style={{fontSize: '1.125rem', margin: '1rem 0 0 0'}}>
                You can clone the repo, use the structure, or strip it down for your own site. Attribution is nice, but not required. Pull requests welcome.
              </p>
            </div>
            
            <p style={{marginBottom: '2rem'}}>
              This is how I believe public digital infrastructure should be: <strong>forkable, inspectable, and understandable by design.</strong>
            </p>
            
            <div style={{textAlign: 'center'}}>
              <a href="https://github.com/andrewHermann/andrewhermann-blog" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="btn btn-primary">
                View the Repository
              </a>
            </div>
          </div>
        </div>

        {/* Contact & Closing - Full Width */}
        <div className="section-card" style={{textAlign: 'center', padding: '3rem'}}>
            <h2 style={{marginBottom: '1rem'}}>Want to Talk?</h2>
            <p style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto'}}>
              Whether you&apos;re interested in reuse, want to critique the approach, or just like talking infrastructure—get in touch.
            </p>
            
            <div style={{marginBottom: '3rem'}}>
              <a href="/contact" className="btn btn-secondary">Contact me</a>
            </div>
            
            <div style={{
              paddingTop: '2rem',
              borderTop: '1px solid rgba(74, 78, 105, 0.1)'
            }}>
              <h3 style={{marginBottom: '1.5rem', color: 'var(--color-text-secondary)'}}>Final Note</h3>
              <div style={{
                display: 'grid',
                gap: '0.75rem',
                fontStyle: 'italic',
                color: 'var(--color-text-secondary)',
                fontSize: '1.125rem',
                lineHeight: '1.6',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <p style={{margin: 0}}>Good systems don&apos;t brag.</p>
                <p style={{margin: 0}}>They run quietly, do their job, and get better through iteration.</p>
                <p style={{margin: 0}}><strong>That&apos;s what this site is. That&apos;s what I build.</strong></p>
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
