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
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const About = () => {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Andrew J. Hermann",
    "description": "Andrew J. Hermann — AI platform leadership within the Swiss Armed Forces, federal AI governance at the Federal Chancellery, and institutional coordination across European rail.",
    "url": "https://andrew.cloudhopper.ch/about",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "jobTitle": "Project Manager, AI Platform, Swiss Armed Forces",
      "description": "AI platform leadership and governance within the Swiss federal administration",
      "knowsAbout": [
        "AI Governance",
        "Sovereign AI Platforms",
        "Federal AI Policy",
        "Project Portfolio Management",
        "Multi-Institutional Coordination",
        "Public Administration"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Project Manager",
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
        description="Andrew J. Hermann — AI platform leadership within the Swiss Armed Forces, federal AI governance at the Federal Chancellery, and institutional coordination across European rail."
        keywords="about Andrew Hermann, AI governance, Swiss Armed Forces, Federal Chancellery, sovereign AI, institutional AI, project management"
        url="https://andrew.cloudhopper.ch/about"
        structuredData={aboutStructuredData}
        breadcrumbs={aboutBreadcrumbs}
      />


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
            <h2>Current Work</h2>
            <p>
              I work within the Swiss federal administration. Since December 2022, I have led KI@V as
              Project Manager within the Army Staff. The platform entered active pilot operations
              for the Army Staff in June 2026. It operates within federal infrastructure, certified to Cloud Level III,
              and has been validated economically across three use cases through independent assessment with HSLU.
            </p>
            <p>
              In parallel, I hold a practitioner seat in KI-für-Alle, the Federal Chancellery&apos;s
              cross-agency working group developing the implementation framework for Switzerland&apos;s federal
              AI sub-strategy. I contribute the operational perspective from an AI platform in active use
              across the Defence Group, and have proposed governance positions on evaluation methodology,
              ISO lifecycle standards, and Cloud Level compliance frameworks.
            </p>
          </div>

          <div className="section-card">
            <h2>Earlier Career</h2>
            <p>
              At the Defence Digital Factory, I led the delivery of COCKPIT, a project portfolio intelligence
              platform that replaced manual reporting across ASTAB&apos;s departments with automated, governed
              data pipelines and 11 Power BI dashboards. It gave leadership historical visibility into the
              full portfolio for the first time.
            </p>
            <p>
              Before my current work in the federal administration, I represented SBB as delegate and led
              the Forum Train Europe side of a structural negotiation with RailNetEurope, coordinating
              across 150+ stakeholders from 28 national rail operators. I brokered the first formal
              agreement between the two bodies and secured the first EU Horizon grant ever awarded to FTE.
              The work required sustained coordination across legal, organisational, and political boundaries
              without a formal mandate from either institution.
            </p>
            <p>
              Earlier still, I led the technical design and nationwide rollout of a pharmacy kiosk platform
              for Novartis Consumer Health Switzerland, and designed integration architectures for industrial
              IoT clients across the DACH region working with IBM Maximo asset management environments.
            </p>
          </div>

          <div className="section-card">
            <h2>Working Philosophy</h2>
            <p>
              I approach systems with a mix of pragmatism and skepticism. I do not deploy technology for
              its own sake. I look for failure points, simplify where possible, and design for longevity.
              Many of the environments I work in lack clean interfaces, current documentation, or ideal
              preconditions. That does not obstruct the work. It defines its boundaries.
            </p>
            <p>
              I build tools and platforms that can be maintained, understood, and handed off without risk.
              I avoid vendor lock-in, resist premature optimisation, and treat legacy not as a burden but
              as a constraint to be respected and navigated. I am not interested in fashionable abstractions.
              I work on what matters operationally, and I build to institutional scale.
            </p>
            <p>
              Privately, I continue to maintain my own infrastructure and test new tools on controlled
              systems. I prefer open-source technology, minimal surface area, and components that fail
              transparently. I apply the same standards to private experimentation as to public-sector
              architecture: lean, legible, and reliable.
            </p>
          </div>

          <div className="section-card">
            <h2>Domains of Practice</h2>
            <p><strong>AI Governance in the Public Sector:</strong> Establishing the evaluation frameworks,
            lifecycle standards, and accountability structures that make AI deployment defensible within
            regulated federal environments.</p>

            <p><strong>Governance of Digital Initiatives:</strong> Establishing the mandates, accountability
            structures, and decision logic that make cross-institutional programmes function. Not just the
            technology, but the governance that makes it auditable.</p>

            <p><strong>Portfolio Intelligence:</strong> Building the data infrastructure that gives
            institutional leadership an accurate, current picture of the full portfolio, replacing manual
            compilation with governed, automated pipelines.</p>

            <p><strong>Multi-Institutional Coordination:</strong> Structuring and sustaining working
            relationships across legal, organisational, and political boundaries, at the intersection of
            defence, transport, and public administration.</p>

            <p><strong>Institutional Modernisation:</strong> Designing change that works within what exists:
            legacy infrastructure, incomplete documentation, constrained procurement. Extracting value
            without forcing disruption.</p>
          </div>

          <div className="section-card">
            <h2>Public Engagement</h2>
            <p>
              <strong>AI Lighthouses Programme · Federal Chancellery / Federal AI Network · September 2026 · forthcoming</strong><br />
              KI@V submitted as a candidate for the federal AI Lighthouse programme. If selected, the
              platform will be presented at the federal AI Community event on 14 September 2026.
            </p>
            <p>
              <strong>Federal AI Network · August 2026 · forthcoming</strong><br />
              Video interview (7–8 minutes) on concrete AI implementation measures and challenges
              within the federal administration, for the Federal AI Network.
            </p>
            <p>
              <strong>KI@V Evolve Phase Launch · 1 June 2026 · Bern Barracks</strong><br />
              Presented the platform&apos;s operational results and Evolve Phase roadmap to approximately
              100 representatives from the Army Staff, Training Command, Operations Command, armasuisse,
              the Federal Chancellery, LBA, BIT, and the Federal AI Network.
            </p>
            <p>
              <strong>armasuisse Digital Day · 5 May 2026 · armasuisse, Bern</strong><br />
              Co-presented KI@V with a live RAG demonstration on Army Messages for the defence
              technology community.
            </p>
            <p>
              <strong>IBM Maximo User Conference · 2015 · Frankfurt region</strong><br />
              Presented on predictive maintenance integration patterns at the annual IBM Maximo
              user conference, during client engagements across the DACH region.
            </p>
          </div>

          <div className="section-card">
            <h2>Languages and Context</h2>
            <p>
              I live and work in Bern, Switzerland, and operate fluently in German and English. I have a
              working knowledge of French sufficient for professional contexts. I am fully embedded in the
              operational realities of the Swiss public sector, including its legal frameworks, procurement
              regimes, and federated governance. I understand the difference between strategic ambition and
              institutional bandwidth, and how to move one in the direction of the other.
            </p>
          </div>

          <div className="section-card">
            <h2>Background</h2>
            <p>
              My relationship with technology began in 1984, when I was introduced to BASIC programming on
              an MSX machine during primary school. Within three days I had written my first working program.
              By the end of that school year, I had built a functioning game, not because it was required,
              but because the logic was accessible and the feedback was immediate.
            </p>
            <p>
              In the years that followed, I built and maintained my own hardware, set up small networks, and
              developed systems using Oracle Forms and relational databases. By my teens I had independently
              worked with Linux, UNIX, HP-UX, and Solaris, navigating enterprise-grade operating systems
              out of pure interest in how they functioned beneath the surface.
            </p>
            <p>
              I was not collecting certificates. I was gaining fluency in systems: how they behave under
              load, how they fail, and how they can be made resilient. That foundational knowledge continues
              to inform my approach to infrastructure, data management, and digital governance.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

About.defaultProps = {}

export default About
