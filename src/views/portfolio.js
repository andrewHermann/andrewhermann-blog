import React from 'react'

import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Portfolio = (props) => {
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Portfolio",
    "description": "Andrew J. Hermann's professional portfolio showcasing expertise in organizational strategy, AI innovation, and project management",
    "url": "https://andrew.cloudhopper.ch/portfolio"
  }

  const portfolioBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" },
    { name: "Portfolio", url: "https://andrew.cloudhopper.ch/portfolio" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Professional Portfolio"
        description="View Andrew J. Hermann's professional portfolio showcasing expertise in organizational strategy, project portfolio management, AI innovation, and digital transformation. Discover successful projects and strategic initiatives."
        keywords="portfolio, projects, case studies, organizational strategy, AI innovation, project management, digital transformation, strategic planning"
        url="https://andrew.cloudhopper.ch/portfolio"
        structuredData={portfolioStructuredData}
        breadcrumbs={portfolioBreadcrumbs}
      />
      
      {/* Floating Robot with purple/violet body color */}
      <PageFloatingRobot bodyColor="#7c3aed" glowColor="#a78bfa" />
      
      <Navbar />
      
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">
            I work on high-stakes transformation projects at the intersection of AI, data strategy, 
            and institutional reform—especially in the public sector.
          </p>
          <p className="page-subtitle">
            Here are selected examples that reflect my approach and results:
          </p>
        </div>
        
        <div className="card-grid">
          <div className="section-card" id="ki-v">
            <h2>KI@V – Institutional AI for the Swiss Armed Forces</h2>
            <h3>Goal: Enable responsible AI experimentation inside one of Switzerland's most sensitive institutional domains.</h3>
            
            <h3>My Role:</h3>
            <p>
              I initiated and led the KI@V innovation project across ASTAB, armasuisse, and RUAG. 
              Designed the MVP architecture, negotiated access to sensitive datasets, and defined use case 
              logic across 11 sub-organisations.
            </p>
            
            <h3>Impact:</h3>
            <ul>
              <li>Established the first AI governance logic for conversational systems within the Swiss defense administration</li>
              <li>Built a federated working group across ASTAB, LBA, Kdo Cyber, and GS-VBS</li>
              <li>Achieved 150+ active users within six months of MVP phase</li>
            </ul>
            
            <p>
              <a href="/contact" className="link-primary">→ Contact me to learn more</a>
            </p>
          </div>

          <div className="section-card" id="cockpit">
            <h2>COCKPIT – Project Portfolio Dashboard for ASTAB</h2>
            <h3>Goal: Bring clarity and control to 40+ strategic initiatives within the Swiss Army digital transformation program.</h3>
            
            <h3>My Role:</h3>
            <p>
              I designed and implemented a Power BI–driven reporting cockpit. Led data governance alignment 
              across four departments, restructured source data logic, and defined KPIs for data quality and performance.
            </p>
            
            <h3>Impact:</h3>
            <ul>
              <li>Tripled the update rate of reporting</li>
              <li>Unified fragmented portfolio data into a single source of truth</li>
              <li>Provided leadership with real-time insights for strategic steering</li>
            </ul>
            
            <p>
              <a href="/contact" className="link-primary">→ View dashboard overview</a>
            </p>
          </div>

          <div className="section-card" id="ttr">
            <h2>TTR Rail Planning – European Coordination (SBB / RNE)</h2>
            <h3>Goal: Align 150+ European stakeholders on a unified model for international rail capacity planning.</h3>
            
            <h3>My Role:</h3>
            <p>
              As SBB delegate, I co-led digital transformation coordination with RailNetEurope. 
              Defined planning logic for cross-border digital timetabling and brokered a historic funding 
              agreement between FTE (Bern) and RNE (Vienna).
            </p>
            
            <h3>Impact:</h3>
            <ul>
              <li>Reached consensus on future planning architecture</li>
              <li>Structured cooperation between 28 national rail operators</li>
              <li>Enabled implementation of pre-planning logic (Rolling Planning) at scale</li>
            </ul>
            
            <p>
              <a href="/contact" className="link-primary">→ Read project summary</a>
            </p>
          </div>

          <div className="section-card" id="ai-policy">
            <h2>🛡️ AI Policy Briefing – Swiss Public Sector</h2>
            <h3>Goal: Prepare senior decision-makers for realistic, domain-specific AI adoption.</h3>
            
            <h3>My Role:</h3>
            <p>
              Authored and presented policy briefings on the state of large language models, with a focus on 
              strategic risks and operational constraints in sensitive domains. Advised on internal capability 
              building and procurement logic.
            </p>
            
            <h3>Impact:</h3>
            <ul>
              <li>Supported AI policy alignment in key federal domains</li>
              <li>Helped shape the discussion around national LLM infrastructure</li>
              <li>Highlighted risks of vendor lock-in and model opacity</li>
            </ul>
            
            <p>
              <a href="/contact" className="link-primary">→ Let's talk AI strategy</a>
            </p>
          </div>

          <div className="section-card">
            <h2>🪜 What's next?</h2>
            <p>
              I work best in environments where the stakes are high, the context is messy, 
              and the end goal is institutional clarity.
            </p>
            <p>
              If that sounds like your reality:
            </p>
            <p>
              <a href="/contact" className="btn btn-primary">→ Get in touch</a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

Portfolio.defaultProps = {}

export default Portfolio
