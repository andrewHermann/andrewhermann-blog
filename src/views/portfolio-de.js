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
import PageFloatingRobot from '../components/PageFloatingRobot'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const PortfolioDe = () => {
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Portfolio",
    "description": "Andrew Hermanns Portfolio — souveräne KI-Plattformentwicklung innerhalb der Schweizer Armee, KI-Governance auf Ebene der Bundeskanzlei und institutionelle Koordination im europäischen Schienenverkehr.",
    "url": "https://andrew.cloudhopper.ch/portfolio/de"
  }

  const portfolioBreadcrumbs = [
    { name: "Startseite", url: "https://andrew.cloudhopper.ch" },
    { name: "Portfolio", url: "https://andrew.cloudhopper.ch/portfolio/de" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Portfolio"
        description="Andrew Hermanns Portfolio — souveräne KI-Plattformentwicklung innerhalb der Schweizer Armee, KI-Governance auf Ebene der Bundeskanzlei und institutionelle Koordination im europäischen Schienenverkehr."
        keywords="Portfolio, KI@V, Schweizer Armee, Bundeskanzlei, KI-Governance, souveräne KI, ASTAB, armasuisse"
        url="https://andrew.cloudhopper.ch/portfolio/de"
        structuredData={portfolioStructuredData}
        breadcrumbs={portfolioBreadcrumbs}
      />

      <PageFloatingRobot bodyColor="#d0dae4" glowColor="#2563eb" />

      <Navbar />

      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">
            KI-Plattformbetrieb innerhalb der Schweizer Armee und Beiträge zur KI-Governance auf
            Bundesebene — sowie institutionelle Koordination im europäischen Schienenverkehr.
          </p>
          <div className="page-lang-switcher">
            <Link to="/portfolio" className="lang-link">EN</Link>
            <span className="lang-sep"> | </span>
            <span className="lang-active">DE</span>
          </div>
        </div>

        <div className="content-main">
          <div className="section-label">
            <h2>Laufende Projekte</h2>
            <p>
              Laufender KI-Plattformbetrieb innerhalb der Schweizer Armee sowie Beiträge zur
              Governance auf Ebene der Bundeskanzlei.
            </p>
          </div>

          <div className="section-card" id="ki-v">
            <h2>KI@V – Souveräne KI-Plattform, Schweizer Armee</h2>
            <h3>Ziel: Aufbau einer produktionstauglichen KI-Plattform für die Gruppe Verteidigung — betrieben innerhalb der Bundesinfrastruktur, zertifiziert nach Cloud-Stufe III und funktionsfähig über Organisationsgrenzen hinweg, die zuvor noch nie Daten oder Werkzeuge gemeinsam genutzt hatten.</h3>

            <h3>Meine Rolle:</h3>
            <p>
              Ich initiierte KI@V im Dezember 2022 als Projektleiter innerhalb des ASTAB und führte das
              Projekt bis zum MVP. Seit Januar 2026 bin ich als Business Analyst bei der Digital Factory
              Verteidigung (Armeestab) tätig und verantworte die operative Weiterentwicklung der Plattform
              sowie die Evolve-Phase.
            </p>
            <p>
              Ich entwarf die Plattformarchitektur, baute die Governance-Struktur über ASTAB, armasuisse
              und RUAG auf — einschliesslich einer 15-köpfigen Steuergruppe aus Business-, Produkt- und
              Technikverantwortlichen — und leitete die Wirtschaftlichkeitsvalidierung mit der HSLU nach
              NIST AI RMF 2023 und UTAUT2.
            </p>
            <p>
              Die Plattform umfasst drei Fähigkeiten: einen RAG-basierten KI-Assistenten mit seitengenauer
              Quellenangabe über interne Wissensbasen; eine N8N-basierte Workflow-Automatisierung für
              agentische Prozesse; und eine hybride Retrievalinfrastruktur (BM25 + Vektorsuche, semantisches
              Reranking), getestet auf Fedlex, Curia Vista, Simap und den Armeebotschaften.
            </p>

            <h3>Ergebnisse:</h3>
            <ul>
              <li>Evolve-Phase genehmigt durch den Innovationsboard ASTAB am 6. Mai 2026: CHF 352&apos;000 gesichert (CHF 121&apos;000 Restguthaben Grundvertrag + CHF 231&apos;000 Service-Setup und Pilotbetrieb)</li>
              <li>700+ Nutzende per Juni 2026 — nach dem Lancierungsanlass der Evolve-Phase in der Mannschaftskaserne Bern mit rund 100 Teilnehmenden aus ASTAB, Kdo Ausbildung, Kdo Op, armasuisse, Bundeskanzlei, LBA, BIT und dem KI-Netzwerk Bund</li>
              <li>MVP-Investition: CHF 268&apos;000. Validierter ROI über drei Anwendungsfälle: CV-Abgleich (~CHF 80&apos;000 jährliche Einsparung, 16 Monate Amortisation), Personalgewinnung (~CHF 155&apos;000, 18 Monate), SAP-Beschaffung (~CHF 75&apos;000, 24 Monate); durchschnittliche Amortisation 19 Monate</li>
              <li>1&apos;940 Arbeitsstunden zurückgewonnen über die validierten Anwendungsfälle</li>
              <li>Eingereicht als Kandidatur für die KI-Leuchttürme an der nationalen KI-Community-Veranstaltung vom 14. September 2026, mit Präsentation bei Bundeskanzler Viktor Rossi</li>
              <li>Ko-Präsentation am armasuisse Digital Day, 5. Mai 2026, mit Live-RAG-Demonstration auf den Armeebotschaften</li>
              <li>6 oder mehr interne Initiativen bauen nun auf KI@V auf, statt parallele Lösungen zu entwickeln; AISE (Kdo Ausbildung) hat KI@V als Service-Schicht für Fachanwendungen in LBA und Kdo Ausbildung identifiziert</li>
            </ul>

          </div>

          <div className="section-card" id="ki-fuer-alle">
            <h2>KI-für-Alle – KI-Governance auf Bundesebene</h2>
            <h3>Bundeskanzlei · Ämterübergreifende Arbeitsgruppe · Stream 1 (Technologie &amp; FinOps) · Seit Frühjahr 2026</h3>

            <h3>Kontext:</h3>
            <p>
              KI-für-Alle ist die ämterübergreifende Arbeitsgruppe der Bundeskanzlei, die den
              Umsetzungsrahmen für die Teilstrategie Künstliche Intelligenz des Bundes erarbeitet.
              Koordiniert von Isabelle Rottmann, befasst sich Stream 1 mit der technischen Architektur
              und dem finanziellen Betriebsmodell für KI in der Bundesverwaltung.
            </p>

            <h3>Meine Rolle:</h3>
            <p>
              Ich halte einen Praktikersitz in Stream 1. KI@V — die einzige produktionstaugliche souveräne
              KI-Plattform innerhalb der Gruppe Verteidigung, mit validiertem ROI über drei Anwendungsfälle
              und Evolve-Phase-Genehmigung durch den Innovationsboard ASTAB — bildet die operative
              Evidenzbasis für die Governance-Positionen, die ich in der Arbeitsgruppe einbringe.
            </p>

            <h3>Beiträge:</h3>
            <ul>
              <li>Vorschlag einer reifegestuften Evaluationsmethodik für das WIPRO-Bewertungsraster: Einstiegsphase (11 Kriterien) und Reifephase (alle 16 Kriterien), mit Projektreife verankert im Lebenszyklusstadium statt im Anwendungsfalltyp</li>
              <li>Einführung eines Zwei-Gate-ISO-Lebenszyklusmodells — ISO/IEC 23894 als obligatorisches Gate vor der MVP-Finanzierung, ISO/IEC 42001 vor dem Produktivbetrieb — das dem Bewertungsraster ein international prüfbares Fundament gibt</li>
              <li>Entwurf eines Capability-Model-Governance-Papiers, das KI von einem system- zu einem fähigkeitszentrierten Rahmen verschiebt, mit obligatorischen Interoperabilitätsanforderungen für GenKI-Plattformen, die anderen Bundesstellen zur Nutzung angeboten werden, und einem Cloud-Stufen-Scoping-Standard</li>
              <li>Entwicklung eines Cloud-Stufen-Compliance-Rahmens zur Klassifikation von GenKI-Projekttypen nach Cloud-Stufen-Anforderungen und rechtlichen Implikationen gemäss DSG Art. 21, 22 und 35</li>
              <li>Beiträge zur FinOps-Diskussion der Arbeitsgruppe, mit Analyse des Übergangs zu nutzungsbasierter Preisgestaltung und Omnigent (Databricks) als Referenzmodell für Cost-Governance auf Architekturebene</li>
            </ul>

          </div>

          <div className="section-card" id="cockpit">
            <h2>COCKPIT – Projektportfolio-Intelligence für den ASTAB</h2>
            <h3>Ziel: Ersatz eines fragmentierten, manuell erstellten Berichtswesens durch automatisierte Portfolio-Intelligence — über zwangsläufig isolierte Departemente hinweg, die zuvor noch nie Daten geteilt hatten.</h3>

            <h3>Meine Rolle:</h3>
            <p>
              Ich leitete die gesamte Umsetzung innerhalb der Digital Factory Verteidigung (Value Stream
              Militärverwaltung), ausgeführt über 5 Program Increments im Rahmen eines 200 kCHF-Budgets für
              das erste Epic. Ich automatisierte den Import isolierter Systemexporte aus verschiedenen
              Departementen, baute eine massgeschneiderte Anwendung als Ersatz für die manuelle Excel-basierte
              Dateneingabe des PMO und lieferte 11 Power-BI-Dashboards, die erstmals eine historische Sicht
              auf das gesamte Projektportfolio ermöglichten.
            </p>

            <h3>Ergebnisse:</h3>
            <ul>
              <li>Elimination des manuellen PMO-Berichtszyklus — bisher aus Systemexporten und departementsinternen Excel-Dateien zusammengestellt</li>
              <li>Vereinheitlichung der Daten aus isolierten Departementen in einer automatisierten Pipeline</li>
              <li>11 Dashboards gaben der Führung historische Portfoliodaten, die es bisher noch nie an einem Ort gegeben hatte</li>
              <li>Im Scope, im Budget (200 kCHF), innerhalb von 5 PIs geliefert</li>
            </ul>

          </div>

          <div className="section-card" id="ttr">
            <h2>TTR-Trassenvergabe – Europäische Koordination (SBB / FTE / RNE)</h2>
            <h3>Ziel: Europäischen Eisenbahnverkehrsunternehmen eine direkte Mitgestaltungsrolle bei den digitalen Planungssystemen zu verschaffen, die über sie verfügen — und eine strukturelle Blockade zwischen zwei Gremien zu überwinden, die noch nie formell zusammengearbeitet hatten.</h3>

            <h3>Meine Rolle:</h3>
            <p>
              Als SBB-Delegierter leitete ich die FTE-Seite der Verhandlungen mit RailNetEurope (RNE)
              über 150+ Stakeholder aus 28 nationalen Eisenbahnverkehrsunternehmen. Ich definierte den
              technischen Umfang für die Entwicklung von Railway-Undertaking-Schnittstellen im Path
              Coordination System (PCS) von RNE, strukturierte den EU-Horizon-Förderantrag und vermittelte
              die Einigung zwischen Forum Train Europe (Bern) und RailNetEurope (Wien).
            </p>

            <h3>Ergebnisse:</h3>
            <ul>
              <li>Erstes formelles Abkommen zwischen Forum Train Europe (FTE) und RailNetEurope (RNE) — zwei Gremien, die konstruktionsbedingt strukturell entgegengesetzt ausgerichtet waren</li>
              <li>Eisenbahnverkehrsunternehmen erhielten das Recht, eigene Schnittstellen im Path Coordination System von RNE zu entwickeln — was das Governance-Modell für die europäische Schienenwegkapazitätsplanung veränderte</li>
              <li>Sicherung eines EU-Horizon-Förderbeitrags von 2 Mio. EUR (FTE-Anteil: 500&apos;000 EUR) — der erste EU-Förderbeitrag überhaupt für den FTE — zur Finanzierung dieser Entwicklung</li>
              <li>Rolling Planning konnte durch die Betreiber, die darauf angewiesen sind, erweitert und angepasst werden</li>
            </ul>

          </div>

          <div className="section-label" id="foundations">
            <h2>Bevor die Terminologie existierte</h2>
            <p>
              Die Probleme, die heute die Agenden für KI und digitale Anpassung prägen —
              unzuverlässige Betriebsdaten, unreifes Analysewerkzeug, verteilte Geräteverwaltung,
              organisatorischer Widerstand gegen algorithmische Entscheidungsunterstützung —
              existierten ein Jahrzehnt früher. Diese Projekte adressierten sie direkt, ohne die
              Rahmenwerke, die Cloud-Plattformen oder den Beratungsjargon, der später folgte.
            </p>
            <p>
              Die Probleme waren dieselben. Die Terminologie kam später.
            </p>
          </div>

          <div className="section-card" id="pain-corner">
            <h2>Digitale Patientenbindungsplattform – Pain Corner</h2>
            <h3>Novartis Consumer Health Schweiz · Mehrpartnerinitiative · 2013</h3>

            <h3>Kontext:</h3>
            <p>
              Schweizerische OTC-Gesundheitsanbieter benötigten ein neues Modell für Patientenaufklärung
              und Apothekenpartnerschaften — eines, das im Massstab funktioniert, in öffentlichen
              Verkaufsumgebungen, ohne Vor-Ort-Betreuung. Diese Initiative etablierte eine der frühen
              digital vermittelten Patientenerlebnisplattformen im regulierten Detailhandel im
              Gesundheitsbereich, bevor die Kategorie einen Namen hatte.
            </p>

            <h3>Meine Rolle:</h3>
            <p>
              Ich leitete die technische Konzeption und den schweizweiten Rollout einer
              Apotheken-Kiosk-Plattform für Novartis Consumer Health. Ich definierte die
              Interaktionsarchitektur, entwarf die gesicherte öffentliche Betriebsumgebung und entwickelte
              das Fernbetriebsmodell — das eine hohe Verfügbarkeit über ein verteiltes nationales Netzwerk
              ohne Vor-Ort-Einsatz sicherstellte.
            </p>

            <h3>Ergebnisse:</h3>
            <ul>
              <li>Gestaltung der patientenseitigen Touchscreen-Erfahrung für geführte Informationsabläufe zu Schmerzmanagement und Voltaren Dolo-Behandlungsoptionen — ermöglichte Apothekern die Erweiterung des Beratungsangebots durch digitale Selbstbedienung</li>
              <li>Einrichtung einer gehärteten Kiosk-Betriebsumgebung mit Aufrechterhaltung der Inhaltsintegrität unter unkontrollierten, frequenzreichen Einzelhandelsbedingungen</li>
              <li>Entwicklung eines massgeschneiderten SMS-basierten Fernwiederherstellungsmechanismus — Wiederherstellung der Systemverfügbarkeit über das nationale Installationsnetzwerk ohne Vor-Ort-Einsatz</li>
              <li>Aufbau eines frühen Betriebsmodells für digital gestützte gemeinsame Geschäftsplanung zwischen einem Pharmahersteller und seinen Apothekenpartnern</li>
            </ul>

            <h3>Auszeichnungen:</h3>
            <ul>
              <li><strong>POPAI Award Paris (2013)</strong> — Kategorie POS Brand Activation</li>
              <li><strong>OTC Europe Excellence Recognition (2013)</strong> — Branchenübergreifende Innovation im Consumer Health</li>
            </ul>
          </div>

          <div className="section-card" id="iot-maximo">
            <h2>Industrial-IoT-Programm</h2>
            <h3>Axino Solutions AG · DACH-Region · 2013–2016</h3>

            <h3>Kontext:</h3>
            <p>
              Vor dem Zeitalter cloud-nativer IoT-Plattformen versuchten anlageintensive Organisationen
              in der DACH-Region, von reaktiver Wartung zu datengetriebenem Asset-Management
              überzugehen. Die Datenumgebungen waren unzuverlässig, das Werkzeug unreif, und der Weg
              vom Sensorsignal zur betrieblichen Entscheidung erforderte erhebliche architektonische
              Vorarbeit.
            </p>

            <h3>Meine Rolle:</h3>
            <p>
              Ich entwarf die Integrationsarchitekturen und Lösungsmuster, die Echtzeit-Gerätetelemetrie
              in Enterprise-Asset-Management-Workflows operationalisierbar machten. Ich leitete
              Kundenengagements beim Übergang von alarmbasierter Reaktion zu zustandsgetriebener Wartung —
              und ab 2015 in Richtung früher prädiktiver Entscheidungsunterstützung.
            </p>

            <h3>Ergebnisse:</h3>
            <ul>
              <li>Entwurf von zustandsbasierten Wartungsmustern, die die kalenderbasierte Planung ablösten — Live-Telemetrie aus heterogenen Sensorumgebungen in IBM Maximo 7.5/7.6 integriert</li>
              <li>Etablierung von Integrationsmustern über das Maximo Integration Framework zur Verarbeitung nicht-standardisierter Sensor-Payloads und zur Stabilisierung unzuverlässiger industrieller Netzwerkumgebungen</li>
              <li>Leitung von Pilotarchitekturen zur Verknüpfung von Maximo-Asset-Daten mit IBM Watson IoT (2015–2016) — Aufbau früher organisatorischer Grundlagen für Predictive-Maintenance-Governance</li>
              <li>Reduktion des Risikos ungeplanter Ausfallzeiten und verbesserte Wartungsressourcenzuteilung in mehreren DACH-Kundenbetrieben</li>
            </ul>

          </div>

          <div className="section-card">
            <p>
              Falls Sie im Bereich der KI-Umsetzung oder -Governance innerhalb der Bundesverwaltung
              tätig sind, stehe ich für ein Gespräch zur Verfügung.
            </p>
            <p>
              <a href="/contact" className="btn btn-primary">→ Kontakt aufnehmen</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

PortfolioDe.defaultProps = {}

export default PortfolioDe
