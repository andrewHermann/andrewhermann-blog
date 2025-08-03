import React from 'react'

import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const BehindTheSite = (props) => {
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
      application: "Static architecture with no backend, no database, no failpoints", 
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
      
      <PageFloatingRobot bodyColor="#10b981" glowColor="#34d399" />
      
      <Navbar />
      <div className="page-content">
        {/* Hero Section */}
        <div className="page-header">
          <h1 className="page-title">Behind the Site</h1>
          <p className="page-subtitle">
            How and why this site was built entirely in the open
          </p>
        </div>
        
        {/* Intro Statement - Full Width */}
        <div style={{width: '100%', marginBottom: '2rem'}}>
          <div className="section-card" style={{textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(52, 211, 153, 0.02))'}}>
            <p style={{fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto'}}>
              This website is more than just a personal portfolio. It's a quiet statement about how digital systems should be built—especially in the public sector.
            </p>
            
            <p style={{fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto'}}>
              Every decision reflects my core working principles: <strong style={{color: '#10b981'}}>build small</strong>, <strong style={{color: '#10b981'}}>build openly</strong>, and <strong style={{color: '#10b981'}}>make it reusable</strong>.
            </p>
          </div>
        </div>

        <div className="card-grid">
          {/* Digital Philosophy - Left side */}
          <div className="section-card">
            <h2>My Digital Philosophy</h2>
            <p>
              I don't believe in black-box platforms or overengineered stacks that serve more to impress than to deliver. The modern web has become bloated with dependencies, scripts, and surveillance-by-default. I chose the opposite path:
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
                    backgroundColor: '#10b981',
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
            
            <p style={{marginTop: '2rem', fontStyle: 'italic', textAlign: 'center', fontSize: '1.125rem', color: '#4A4E69'}}>
              Just clean, versioned, open code—because <strong>transparency is infrastructure.</strong>
            </p>
          </div>

          {/* Architecture & Hosting - Right side */}
          <div className="section-card">
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
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    marginRight: '1rem',
                    marginTop: '0.25rem'
                  }}>
                    {point.icon}
                  </div>
                  <div>
                    <h4 style={{margin: '0 0 0.5rem 0', color: '#4A4E69'}}>{point.title}</h4>
                    <p style={{margin: 0, fontSize: '0.95rem', lineHeight: '1.5'}}>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              border: '1px solid #fbbf24'
            }}>
              <p style={{fontSize: '1.125rem', fontWeight: '600', margin: 0}}>
                <strong>But the most unusual part?</strong><br />
                It's physically hosted—yes, really—from my home network.
              </p>
            </div>
          </div>
        </div>

        {/* The IBM Workstation - Full Width Highlight */}
        <div style={{width: '100%', margin: '3rem 0'}}>
          <div className="section-card" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.05))',
            borderLeft: '4px solid #10b981',
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
                  <div style={{padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px'}}>
                    <div style={{fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem'}}>Hardware</div>
                    <div style={{fontWeight: '600'}}>2005 IBM IntelliStation Z Pro</div>
                  </div>
                  <div style={{padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px'}}>
                    <div style={{fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem'}}>Processor</div>
                    <div style={{fontWeight: '600'}}>Intel Core 2 Quad @ 2.66GHz</div>
                  </div>
                  <div style={{padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px'}}>
                    <div style={{fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem'}}>Age</div>
                    <div style={{fontWeight: '600'}}>Older than the iPhone</div>
                  </div>
                </div>
                
                <div style={{marginBottom: '2rem'}}>
                  <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#10b981'}}>Why?</h3>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <p style={{margin: 0}}>Because it works.</p>
                    <p style={{margin: 0}}>Because it's elegant in its simplicity.</p>
                    <p style={{margin: 0}}>And because I believe the idea of "modern" is too often confused with "new."</p>
                  </div>
                </div>
                
                <p style={{fontStyle: 'italic', fontSize: '1.125rem', lineHeight: '1.6'}}>
                  This old workstation has outlived trends, toolchains, and fads. It's never failed me. It quietly proves that with intentional design, robust systems don't need hyperscale hardware or cloud dependency. They just need clarity.
                </p>
              </div>
              
              <div style={{
                fontSize: '4rem',
                color: '#10b981',
                opacity: 0.7,
                textAlign: 'center'
              }}>
                🖥️
              </div>
            </div>
          </div>
        </div>

        {/* Design Principles - Cards Grid */}
        <div style={{width: '100%', marginBottom: '3rem'}}>
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
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
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
                    color: '#4B5563'
                  }}>
                    {item.application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-grid">
          {/* Lessons Learned */}
          <div className="section-card">
            <h2>Lessons From the Build</h2>
            
            <div style={{display: 'grid', gap: '1.5rem', margin: '2rem 0'}}>
              <div style={{padding: '1.5rem', backgroundColor: '#fef2f2', borderRadius: '8px', borderLeft: '4px solid #ef4444'}}>
                <h3 style={{margin: '0 0 0.75rem 0', color: '#dc2626', fontSize: '1.125rem'}}>The Reality</h3>
                <p style={{margin: 0}}>Like any real system, this one didn't start perfectly. The first version was messy—fragmented stylesheets, inconsistent page logic, and duplicated patterns.</p>
              </div>
              
              <div style={{padding: '1.5rem', backgroundColor: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #0284c7'}}>
                <h3 style={{margin: '0 0 0.75rem 0', color: '#0284c7', fontSize: '1.125rem'}}>The Process</h3>
                <p style={{margin: 0}}>Cleaning it up meant applying the same rigor I use in enterprise architecture: <strong>refactor, simplify, consolidate.</strong></p>
              </div>
              
              <div style={{padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '8px', borderLeft: '4px solid #10b981'}}>
                <h3 style={{margin: '0 0 0.75rem 0', color: '#10b981', fontSize: '1.125rem'}}>The Principle</h3>
                <p style={{margin: 0, fontStyle: 'italic', fontSize: '1.125rem'}}>Don't fall for complexity when clarity will do.</p>
              </div>
            </div>
          </div>

          {/* Fork It Section */}
          <div className="section-card">
            <h2>Fork It. Remix It. Use It.</h2>
            
            <div style={{
              padding: '2rem',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              textAlign: 'center',
              margin: '2rem 0'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                MIT Licensed
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
                📁 View the Repository
              </a>
            </div>
          </div>
        </div>

        {/* Contact & Closing - Full Width */}
        <div style={{width: '100%', marginTop: '3rem'}}>
          <div className="section-card" style={{textAlign: 'center', padding: '3rem'}}>
            <h2 style={{marginBottom: '1rem'}}>Want to Talk?</h2>
            <p style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto'}}>
              Whether you're interested in reuse, want to critique the approach, or just like talking infrastructure—get in touch.
            </p>
            
            <div style={{marginBottom: '3rem'}}>
              <a href="/contact" className="btn btn-secondary">Contact me</a>
            </div>
            
            <div style={{
              paddingTop: '2rem',
              borderTop: '1px solid rgba(74, 78, 105, 0.1)'
            }}>
              <h3 style={{marginBottom: '1.5rem', color: '#4A4E69'}}>Final Note</h3>
              <div style={{
                display: 'grid',
                gap: '0.75rem',
                fontStyle: 'italic',
                color: '#6B7280',
                fontSize: '1.125rem',
                lineHeight: '1.6',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <p style={{margin: 0}}>Good systems don't brag.</p>
                <p style={{margin: 0}}>They run quietly, do their job, and get better through iteration.</p>
                <p style={{margin: 0}}><strong>That's what this site is. That's what I build.</strong></p>
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
