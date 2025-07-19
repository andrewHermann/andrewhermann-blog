import React from 'react'

import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './portfolio.css'

const Portfolio = (props) => {
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Portfolio",
    "description": "Andrew J. Hermann's professional portfolio showcasing expertise in organizational strategy, AI innovation, and project management",
    "url": "https://***REMOVED***/portfolio",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Strategic Leadership"
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "name": "AI Innovation"
        }
      ]
    }
  }

  const portfolioBreadcrumbs = [
    { name: "Home", url: "https://***REMOVED***" },
    { name: "Portfolio", url: "https://***REMOVED***/portfolio" }
  ]

  return (
    <div className="portfolio-container">
      <SEO
        title="Professional Portfolio"
        description="View Andrew J. Hermann's professional portfolio showcasing expertise in organizational strategy, project portfolio management, AI innovation, and digital transformation. Discover successful projects and strategic initiatives."
        keywords="portfolio, projects, case studies, organizational strategy, AI innovation, project management, digital transformation, strategic planning"
        url="https://***REMOVED***/portfolio"
        structuredData={portfolioStructuredData}
        breadcrumbs={portfolioBreadcrumbs}
      />
      <Navbar />
      <div className="portfolio-content">
        <div className="portfolio-header">
          <h1 className="portfolio-title">Professional Portfolio</h1>
          <p className="portfolio-subtitle">
            Showcasing strategic leadership and innovation across diverse projects
          </p>
        </div>
        
        <div className="portfolio-grid">
          <div className="portfolio-card">
            <div className="portfolio-card-content">
              <h2>Strategic Organizational Transformation</h2>
              <p>
                Led comprehensive organizational restructuring initiatives that improved operational efficiency by 40% while maintaining service quality and employee satisfaction.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Strategy</span>
                <span className="portfolio-tag">Change Management</span>
                <span className="portfolio-tag">Leadership</span>
              </div>
            </div>
          </div>

          <div className="portfolio-card">
            <div className="portfolio-card-content">
              <h2>AI-Driven Decision Support Systems</h2>
              <p>
                Designed and implemented artificial intelligence solutions for data-driven decision making in public administration, resulting in 25% faster processing times and improved accuracy.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">AI</span>
                <span className="portfolio-tag">Data Analytics</span>
                <span className="portfolio-tag">Public Sector</span>
              </div>
            </div>
          </div>

          <div className="portfolio-card">
            <div className="portfolio-card-content">
              <h2>Project Portfolio Management</h2>
              <p>
                Established enterprise-wide project portfolio management frameworks that increased project success rates by 35% and improved resource allocation efficiency.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">PMO</span>
                <span className="portfolio-tag">Portfolio Management</span>
                <span className="portfolio-tag">Resource Optimization</span>
              </div>
            </div>
          </div>

          <div className="portfolio-card">
            <div className="portfolio-card-content">
              <h2>Digital Transformation Initiatives</h2>
              <p>
                Spearheaded organization-wide digital transformation programs that modernized legacy systems and improved citizen service delivery capabilities.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Digital Transformation</span>
                <span className="portfolio-tag">Process Improvement</span>
                <span className="portfolio-tag">Innovation</span>
              </div>
            </div>
          </div>

          <div className="portfolio-card">
            <div className="portfolio-card-content">
              <h2>Data-Driven Performance Analytics</h2>
              <p>
                Developed comprehensive performance measurement systems using advanced analytics to drive strategic decision-making and continuous improvement.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Analytics</span>
                <span className="portfolio-tag">Performance Management</span>
                <span className="portfolio-tag">KPIs</span>
              </div>
            </div>
          </div>

          <div className="portfolio-card">
            <div className="portfolio-card-content">
              <h2>Cross-Functional Team Leadership</h2>
              <p>
                Successfully managed multi-disciplinary teams across various strategic initiatives, fostering collaboration and delivering exceptional results within budget and timeline constraints.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Team Leadership</span>
                <span className="portfolio-tag">Collaboration</span>
                <span className="portfolio-tag">Results Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

Portfolio.defaultProps = {}

export default Portfolio
