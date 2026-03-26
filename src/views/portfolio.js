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

const Portfolio = () => {
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
      <PageFloatingRobot bodyColor="#d0dae4" glowColor="#2563eb" />
      
      <Navbar />
      
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">
            These are not strategy decks. These are live systems, running inside real institutions, built under real constraints. If you are considering AI transformation, this is what execution looks like.
          </p>
        </div>
        
        <div className="content-main">
          <div className="section-label">
            <h2>Active Initiatives</h2>
            <p>
              Live systems, operating inside real institutions, built under real constraints.
            </p>
          </div>

          <div className="section-card" id="ki-v">
            <h2>KI@V – Institutional AI for the Swiss Armed Forces</h2>
            <h3>Goal: Enable responsible AI experimentation inside one of Switzerland&apos;s most sensitive institutional domains.</h3>
            
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
            <h2>COCKPIT – Project Portfolio Intelligence for ASTAB</h2>
            <h3>Goal: Replace a fragmented, manually compiled reporting system with automated portfolio intelligence — across forcefully siloed departments that had never shared data.</h3>

            <h3>My Role:</h3>
            <p>
              I led the full delivery within the Digital Factory Verteidigung (Value Stream Militärverwaltung),
              executed across 5 Program Increments within a 200 kCHF budget for the first epic.
              Automated the import of siloed system exports from across departments, built a custom application
              to replace the manual Excel-based data entry that PMO relied on, and delivered 11 Power BI dashboards
              providing historical visibility into the full project portfolio for the first time.
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>Eliminated the manual PMO reporting cycle — previously compiled from system exports and department-level Excel sheets</li>
              <li>Unified data from siloed departments into a single, automated pipeline</li>
              <li>11 dashboards gave leadership historical portfolio data that had never existed in one place</li>
              <li>Delivered on scope, on budget (200 kCHF), within 5 PIs</li>
            </ul>

            <p>
              <a href="/contact" className="link-primary">→ Contact me to learn more</a>
            </p>
          </div>

          <div className="section-card" id="ttr">
            <h2>TTR Rail Planning – European Coordination (SBB / FTE / RNE)</h2>
            <h3>Goal: Give Europe's train operators a direct role in shaping the digital planning systems that govern them — breaking a structural deadlock between two bodies that had never formally cooperated.</h3>

            <h3>My Role:</h3>
            <p>
              As SBB delegate, I led the FTE side of negotiations with RailNetEurope (RNE) across 150+
              stakeholders representing 28 national rail operators. Defined the technical scope for
              Railway Undertaking interface development within RNE&apos;s Path Coordination System (PCS),
              structured the EU Horizon funding application, and brokered the agreement between
              Forum Train Europe (Bern) and RailNetEurope (Vienna).
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>First-ever formal agreement between Forum Train Europe (FTE) and RailNetEurope (RNE) — two bodies that had been structurally opposed by design</li>
              <li>Railway Undertakings gained the right to develop their own interfaces in RNE&apos;s Path Coordination System — changing the governance model for European rail capacity planning</li>
              <li>Secured a €2M EU Horizon grant (FTE share: €500K) — the first EU grant ever awarded to FTE — to fund that development</li>
              <li>Enabled Rolling Planning to be extended and adapted by the operators who depend on it</li>
            </ul>

            <p>
              <a href="/contact" className="link-primary">→ Contact me to learn more</a>
            </p>
          </div>

          <div className="section-label" id="foundations">
            <h2>Before the Terminology Existed</h2>
            <p>
              The problems that define current AI and digital transformation agendas — unreliable operational
              data, immature analytics tooling, distributed device governance, organisational resistance to
              algorithmic decision support — were present a decade earlier. These projects addressed them
              directly, without the frameworks, the cloud platforms, or the consulting vocabulary that
              followed.
            </p>
            <p>
              The problems were the same. The vocabulary arrived later.
            </p>
          </div>

          <div className="section-card" id="pain-corner">
            <h2>Digital Patient Engagement Platform — Pain Corner</h2>
            <h3>Novartis Consumer Health Switzerland · Multi-partner initiative · 2013</h3>

            <h3>Context:</h3>
            <p>
              Swiss OTC healthcare providers needed a new model for patient education and pharmacy
              partnership — one that operated at scale, in public retail environments, without
              on-site oversight. This initiative established one of the early digitally mediated
              patient-experience platforms in regulated retail healthcare, before the category had a name.
            </p>

            <h3>My Role:</h3>
            <p>
              I led the technical design and nationwide rollout of a pharmacy kiosk platform for
              Novartis Consumer Health. I defined the interaction architecture, designed the secure
              public-use operating environment, and engineered the remote operations model — ensuring
              high availability across a distributed national network without requiring on-site intervention.
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>Designed the patient-facing touchscreen experience for guided information flows on pain management and Voltaren Dolo treatment options — enabling pharmacists to extend advisory services through digital self-service</li>
              <li>Established a hardened kiosk operating environment maintaining content integrity under uncontrolled high-traffic retail conditions</li>
              <li>Designed a custom SMS-based remote recovery mechanism — restoring system availability across the national installation network without dispatch</li>
              <li>Established an early operational model for digitally enabled joint business planning between a pharmaceutical manufacturer and its pharmacy channel partners</li>
            </ul>

            <h3>Recognition:</h3>
            <ul>
              <li><strong>POPAI Award Paris (2013)</strong> — POS Brand Activation category</li>
              <li><strong>OTC Europe Excellence Recognition (2013)</strong> — cross-industry innovation in consumer health</li>
            </ul>
          </div>

          <div className="section-card" id="iot-maximo">
            <h2>Industrial IoT Transformation Programme</h2>
            <h3>Axino Solutions AG · DACH Region · 2013–2016</h3>

            <h3>Context:</h3>
            <p>
              Before cloud-native IoT platforms existed, asset-intensive organisations across the DACH
              region were attempting to move from reactive maintenance to data-driven asset management.
              The data environments were unreliable, the tooling was immature, and the path from sensor
              signal to operational decision required significant architectural groundwork.
            </p>

            <h3>My Role:</h3>
            <p>
              I designed the integration architectures and solution patterns that made real-time equipment
              telemetry operational inside enterprise asset management workflows. I led client engagements
              across the transition from alert-based response to condition-driven maintenance — and, from
              2015, toward early predictive decision support.
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>Designed condition-based maintenance patterns that replaced calendar-based scheduling — capturing live telemetry from heterogeneous sensor environments into IBM Maximo 7.5 / 7.6</li>
              <li>Established integration patterns via the Maximo Integration Framework to ingest non-standard sensor payloads and stabilise unreliable industrial network environments</li>
              <li>Led pilot architectures linking Maximo asset data with IBM Watson IoT (2015–2016) — establishing early organisational foundations for predictive maintenance governance</li>
              <li>Reduced unplanned downtime risk and improved maintenance resource allocation across multiple DACH client operations</li>
            </ul>

            <h3>Certifications:</h3>
            <ul>
              <li><strong>IBM Certified Deployment Professional</strong> — Tivoli Process Automation Engine V7.5 · IBM · Feb 2015</li>
              <li><strong>IBM Certified Infrastructure Deployment Professional</strong> — Maximo Asset Management V7.5 · IBM · Feb 2015</li>
              <li><strong>IBM Certified Support Associate</strong> — Cloud &amp; Smarter Infrastructure Support Provider Tools and Processes · IBM · Feb 2015</li>
            </ul>
          </div>

          <div className="section-label">
            <h2>When the Stakes Are High</h2>
          </div>

          <div className="section-card">
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
