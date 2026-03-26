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

const About = () => {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Andrew J. Hermann",
    "description": "Learn about Andrew J. Hermann's background, expertise, and approach to strategic leadership and AI innovation",
    "url": "https://andrew.cloudhopper.ch/about",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "jobTitle": "Strategic Leadership & AI Innovation Expert",
      "description": "Expert in organizational strategy, project portfolio management, and applied artificial intelligence",
      "knowsAbout": [
        "Strategic Leadership",
        "Organizational Strategy", 
        "Artificial Intelligence",
        "Project Portfolio Management",
        "Digital Transformation",
        "Data-Driven Decision Making",
        "Public Administration"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Strategic Leadership Consultant",
        "occupationLocation": {
          "@type": "Country",
          "name": "Switzerland"
        }
      }
    }
  }

  const aboutBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" },
    { name: "About", url: "https://andrew.cloudhopper.ch/about" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="About"
        description="Learn about Andrew J. Hermann's background, expertise in strategic leadership, AI innovation, and approach to organizational transformation. Discover his professional journey and core competencies."
        keywords="about Andrew Hermann, background, expertise, strategic leadership, AI innovation, professional experience, qualifications, organizational transformation"
        url="https://andrew.cloudhopper.ch/about"
        structuredData={aboutStructuredData}
        breadcrumbs={aboutBreadcrumbs}
      />
      
      {/* Floating Robot with blue/sky body color */}
      <PageFloatingRobot bodyColor="#d0dae4" glowColor="#2563eb" />
      
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">About</h1>
          <p className="page-subtitle">
            Two decades of institutional systems work. The background, the approach, and the context.
          </p>
        </div>
        
        <div className="content-main">
          <div className="section-card">
            <h2>Early Foundation</h2>
            <p>My relationship with technology began in 1984, when I was introduced to BASIC programming on an MSX machine during primary school. Within three days I had written my first working program. By the end of that school year, I had built a functioning game — not because it was required, but because the logic was accessible and the feedback was immediate. It was my first encounter with structured systems, and it set the tone for everything that followed.</p>
            
            <p>In the years that followed, I expanded my focus far beyond programming. I built and maintained my own hardware, set up small networks, and began developing systems using Oracle Forms and relational databases. By the time I was in my teens, I had independently introduced myself to Linux, UNIX, HP-UX, and Solaris, navigating these operating systems out of pure interest in how real-world, enterprise-grade systems functioned beneath the surface.</p>
            
            <p>I wasn&apos;t collecting certificates. I was gaining fluency in systems—how they behave under load, how they fail, and how they can be made resilient. That foundational knowledge, acquired outside any formal structure, continues to inform my approach to infrastructure, data management, and digital governance to this day.</p>
          </div>
          
          <div className="section-card">
            <h2>Professional Trajectory</h2>
            <p>Today, I operate within the Swiss federal administration — currently within the Armed Forces — leading cross-functional digital initiatives under institutional and security constraints. The work spans AI governance, portfolio intelligence, and system lifecycle decisions. All of it designed to function under real-world, non-ideal conditions.</p>

            <p>I established COCKPIT, a project portfolio intelligence platform now used across multiple divisions of Army Staff — giving leadership historical visibility into the full portfolio for the first time. I initiated and lead KI@V (AI@Defence), a secure conversational AI platform for administrative workflows in classified domains, and the first AI governance framework of its kind within the Swiss defense administration.</p>

            <p>Earlier in my career, I led the Forum Train Europe side of a structural negotiation with RailNetEurope — coordinating across 150+ stakeholders from 28 national rail operators, brokering the first formal agreement between the two bodies, and securing the first EU Horizon grant ever awarded to FTE. I operated in politically sensitive contexts, often without formal mandate but with measurable outcomes.</p>
          </div>
          
          <div className="section-card">
            <h2>Working Philosophy</h2>
            <p>I approach systems with a mix of pragmatism and skepticism. I don&apos;t deploy technology for its own sake. I look for failure points, simplify where possible, and design for longevity. Many of the environments I work in lack clean interfaces, current documentation, or ideal preconditions. That doesn&apos;t obstruct the work. It defines its boundaries.</p>
            
            <p>I build tools and platforms that can be maintained, understood, and handed off without risk. I avoid vendor lock-in, resist premature optimization, and consider legacy not as a burden, but as a constraint to be respected and navigated. I am not interested in fashionable abstractions. I work on what matters operationally, and I build to institutional scale.</p>
            
            <p>Privately, I continue to maintain my own infrastructure and test new tools on controlled systems. I prefer open-source technology, minimal surface area, and components that fail transparently. I maintain the same standards for private experimentation as I do for public-sector architecture: lean, legible, and reliable.</p>
          </div>
          
          <div className="section-card">
            <h2>Domains of Practice</h2>
            <div>
              <p><strong>Governance of Digital Initiatives</strong> — Establishing the mandates, accountability structures, and decision logic that make cross-institutional programmes function. Not just the technology — the governance that makes it defensible.</p>

              <p><strong>Portfolio Intelligence</strong> — Building the data infrastructure that gives institutional leadership an accurate, current picture of the full portfolio — replacing manual compilation with governed, automated pipelines.</p>

              <p><strong>AI Deployment in Constrained Environments</strong> — Defining the governance model, access logic, and use-case scope that make AI viable in regulated, classified, or legally sensitive institutional contexts.</p>

              <p><strong>Multi-Institutional Coordination</strong> — Structuring and sustaining working relationships across legal, organisational, and political boundaries — at the intersection of defence, transport, and public administration.</p>

              <p><strong>Institutional Modernisation</strong> — Designing change that works within what exists: legacy infrastructure, incomplete documentation, constrained procurement. Extracting value without forcing disruption.</p>
            </div>
          </div>
          
          <div className="section-card">
            <h2>Languages & Context</h2>
            <p>I live and work in Bern, Switzerland, and operate fluently in German and English. I have a working knowledge of French sufficient for professional contexts, though my primary operational languages are German and English. I am fully embedded in the operational realities of the Swiss public sector, including its legal frameworks, procurement regimes, and federated governance. I understand the difference between strategic ambition and institutional bandwidth and how to move one in the direction of the other.</p>
          </div>
          
          <div className="section-card">
            <h2>Final Note</h2>
            <p><em>I don&apos;t aim to disrupt. I aim to stabilize — quietly, precisely, and at scale.</em></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

About.defaultProps = {}

export default About
