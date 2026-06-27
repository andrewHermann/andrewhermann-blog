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

const Portfolio = () => {
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Portfolio",
    "description": "Andrew Hermann's portfolio: AI platform development within the Swiss Armed Forces, federal AI governance at Federal Chancellery level, and institutional coordination across European rail.",
    "url": "https://andrew.cloudhopper.ch/portfolio"
  }

  const portfolioBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" },
    { name: "Portfolio", url: "https://andrew.cloudhopper.ch/portfolio" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Portfolio"
        description="Andrew Hermann's portfolio: AI platform development within the Swiss Armed Forces, federal AI governance at the Federal Chancellery, and institutional coordination across European rail."
        keywords="portfolio, KI@V, Swiss Armed Forces, Federal Chancellery, AI governance, sovereign AI, institutional AI, ASTAB, armasuisse"
        url="https://andrew.cloudhopper.ch/portfolio"
        structuredData={portfolioStructuredData}
        breadcrumbs={portfolioBreadcrumbs}
      />


      <Navbar />

      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">
            Sovereign AI in the Swiss Armed Forces. Active governance contribution at the Federal Chancellery. Institutional coordination at European scale.
          </p>
          <div className="page-lang-switcher">
            <span className="lang-active">EN</span>
            <span className="lang-sep"> | </span>
            <Link to="/portfolio/de" className="lang-link">DE</Link>
          </div>
        </div>

        <div className="content-main">
          <div className="section-label">
            <h2>Active Work</h2>
            <p>
              Ongoing AI platform operations within the Swiss Armed Forces and policy contribution at Federal Chancellery level.
            </p>
          </div>

          <div className="section-card" id="ki-v">
            <h2>KI@V: Sovereign AI Platform, Swiss Armed Forces</h2>
            <h3>Goal: Establish a production-grade AI platform for the Defence Group, hosted within federal infrastructure, certified to Cloud Level III, and operating across the organizational boundaries of ASTAB, armasuisse, and RUAG.</h3>

            <h3>My Role:</h3>
            <p>
              I initiated KI@V in December 2022 as Project Manager within ASTAB and continue to lead the project.
              Following Evolve Phase approval in May 2026, the platform entered active pilot operations for ASTAB in June 2026.
            </p>
            <p>
              I designed the platform architecture, built the governance structure across ASTAB, armasuisse, and RUAG
              (including a 15-member steering committee spanning business, product, and technical dimensions), and led
              the economic validation with HSLU using the NIST AI RMF 2023 and UTAUT2 frameworks.
            </p>
            <p>
              The platform delivers three capabilities: a RAG-based AI assistant with page-level citation over internal
              knowledge bases; N8N-based workflow automation for agentic processes; and a hybrid retrieval infrastructure
              (BM25 + vector retrieval, semantic reranking) tested against Fedlex, Curia Vista, Simap, and Army Messages.
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>Evolve Phase approved by the ASTAB Innovation Board on 6 May 2026, with full funding secured for service setup and pilot operations</li>
              <li>700+ users as of June 2026, following the Evolve Phase launch event at the Bern barracks attended by approximately 100 representatives from ASTAB, Training Command, Operations Command, armasuisse, Federal Chancellery, LBA, BIT, and the Federal AI Network</li>
              <li>Validated ROI across three use cases (CV matching, personnel recruitment, SAP procurement), with demonstrated payback confirmed through independent economic validation with HSLU</li>
              <li>1,940 working hours recovered across validated use cases</li>
              <li>Submitted as AI Lighthouses candidate for the federal AI Community event on 14 September 2026</li>
              <li>Co-presented at the armasuisse Digital Day, 5 May 2026, with a live RAG demonstration on Army Messages</li>
              <li>6+ internal initiatives now build on KI@V rather than creating parallel solutions; AISE (Training Command) has identified KI@V as the service layer for specialist applications in LBA and Training Command</li>
            </ul>

          </div>

          <div className="section-card" id="ki-fuer-alle">
            <h2>KI-für-Alle: Federal AI Governance</h2>
            <h3>Federal Chancellery · Cross-agency working group · Stream 1 (Technology &amp; FinOps) · Since early 2026</h3>

            <h3>Context:</h3>
            <p>
              KI-für-Alle is the Federal Chancellery&apos;s cross-agency working group developing the implementation
              framework for Switzerland&apos;s federal AI sub-strategy. Stream 1 addresses the technical architecture
              and financial operating model for AI across the federal administration.
            </p>

            <h3>My Role:</h3>
            <p>
              I hold a practitioner seat in Stream 1, contributing the operational perspective from KI@V, a sovereign
              AI platform within the Defence Group with validated ROI across three use cases and active pilot operations
              since June 2026.
            </p>

            <h3>Contributions:</h3>
            <ul>
              <li>Proposed a maturity-staged evaluation approach for the WIPRO evaluation framework: entry phase (11 criteria) and maturity phase (all 16 criteria), with project readiness anchored in lifecycle stage rather than use case type</li>
              <li>Introduced a two-gate ISO lifecycle model (ISO/IEC 23894 as a mandatory gate before MVP funding, ISO/IEC 42001 before production), giving the evaluation framework an internationally auditable backbone</li>
              <li>Drafted a capability-model governance paper repositioning AI from system-centric to capability-model framing, with mandatory interoperability requirements for GenAI platforms offered to other federal units and a Cloud Level scoping standard</li>
              <li>Developed a Cloud Level compliance framework classifying GenAI project types by Cloud Level requirements and legal implications under the Data Protection Act Art. 21, 22, and 35</li>
              <li>Contributed to the group&apos;s AI FinOps discussion, analysing usage-based pricing transitions and Omnigent (Databricks) as a reference pattern for cost governance at architecture level</li>
            </ul>

          </div>

          <div className="section-card" id="cockpit">
            <h2>COCKPIT: Project Portfolio Intelligence for ASTAB</h2>
            <h3>Goal: Replace a fragmented, manually compiled reporting system with automated portfolio intelligence across siloed departments within ASTAB.</h3>

            <h3>My Role:</h3>
            <p>
              I led the full delivery within the Defence Digital Factory (Military Administration value stream),
              executed across 5 Program Increments within a fixed budget for the first epic.
              Automated the import of siloed system exports from across departments, built a custom application
              to replace the manual Excel-based data entry that PMO relied on, and delivered 11 Power BI dashboards
              providing historical visibility into the full project portfolio for the first time.
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>Eliminated the manual PMO reporting cycle, previously compiled from system exports and department-level Excel sheets</li>
              <li>Unified data from siloed departments into a single, automated pipeline</li>
              <li>11 dashboards gave leadership historical portfolio data that had never existed in one place</li>
              <li>Delivered on scope, on budget, within 5 PIs</li>
            </ul>

          </div>

          <div className="section-card" id="ttr">
            <h2>TTR Rail Planning: European Coordination (SBB / FTE / RNE)</h2>
            <h3>Goal: Give Europe&apos;s train operators a direct role in shaping the digital planning systems that govern them, and break a structural deadlock between two bodies that had never formally cooperated.</h3>

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
              <li>First formal agreement between Forum Train Europe (FTE) and RailNetEurope (RNE), two bodies that had been structurally opposed by design</li>
              <li>Railway Undertakings gained the right to develop their own interfaces in RNE&apos;s Path Coordination System, changing the governance model for European rail capacity planning</li>
              <li>Secured an EU Horizon grant (the first EU grant ever awarded to FTE) to fund that development</li>
              <li>Enabled Rolling Planning to be extended and adapted by the operators who depend on it</li>
            </ul>

          </div>

          <div className="section-label" id="foundations">
            <h2>Before the Terminology Existed</h2>
            <p>
              The problems that define current AI and digital transformation agendas (unreliable operational
              data, immature analytics tooling, distributed device governance, organisational resistance to
              algorithmic decision support) were present a decade earlier. These projects addressed them
              directly, without the frameworks, the cloud platforms, or the consulting vocabulary that
              followed.
            </p>
            <p>
              The problems were the same. The vocabulary arrived later.
            </p>
          </div>

          <div className="section-card" id="pain-corner">
            <h2>Digital Patient Engagement Platform: Pain Corner</h2>
            <h3>Novartis Consumer Health Switzerland · Multi-partner initiative · 2013</h3>

            <h3>Context:</h3>
            <p>
              Swiss OTC healthcare providers needed a new model for patient education and pharmacy
              partnership that operated at scale, in public retail environments, without on-site oversight.
              This initiative established one of the early digitally mediated patient-experience platforms
              in regulated retail healthcare, before the category had a name.
            </p>

            <h3>My Role:</h3>
            <p>
              I led the technical design and nationwide rollout of a pharmacy kiosk platform for
              Novartis Consumer Health. I defined the interaction architecture, designed the secure
              public-use operating environment, and engineered the remote operations model, ensuring
              high availability across a distributed national network without requiring on-site intervention.
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>Designed the patient-facing touchscreen experience for guided information flows on pain management and Voltaren Dolo treatment options, enabling pharmacists to extend advisory services through digital self-service</li>
              <li>Established a hardened kiosk operating environment maintaining content integrity under uncontrolled high-traffic retail conditions</li>
              <li>Designed a custom SMS-based remote recovery mechanism, restoring system availability across the national installation network without dispatch</li>
              <li>Established an early operational model for digitally enabled joint business planning between a pharmaceutical manufacturer and its pharmacy channel partners</li>
            </ul>

            <h3>Recognition:</h3>
            <ul>
              <li><strong>POPAI Award Paris (2013)</strong>: POS Brand Activation category</li>
              <li><strong>OTC Europe Excellence Recognition (2013)</strong>: cross-industry innovation in consumer health</li>
            </ul>
          </div>

          <div className="section-card" id="iot-maximo">
            <h2>Industrial IoT Transformation Programme</h2>
            <h3>Axino Solutions AG · DACH Region · 2013-2016</h3>

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
              across the transition from alert-based response to condition-driven maintenance, and from
              2015 toward early predictive decision support.
            </p>

            <h3>Impact:</h3>
            <ul>
              <li>Designed condition-based maintenance patterns that replaced calendar-based scheduling, capturing live telemetry from heterogeneous sensor environments into IBM Maximo 7.5 / 7.6</li>
              <li>Established integration patterns via the Maximo Integration Framework to ingest non-standard sensor payloads and stabilise unreliable industrial network environments</li>
              <li>Led pilot architectures linking Maximo asset data with IBM Watson IoT (2015-2016), establishing early organisational foundations for predictive maintenance governance</li>
              <li>Reduced unplanned downtime risk and improved maintenance resource allocation across multiple DACH client operations</li>
            </ul>

          </div>

          <div className="section-card">
            <p>
              If you are working on AI implementation or governance within the Swiss federal
              administration, I am available for a conversation.
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
