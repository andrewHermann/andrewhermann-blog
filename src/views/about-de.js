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

const AboutDe = () => {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Über Andrew J. Hermann",
    "description": "Andrew J. Hermann — KI-Plattformleitung in der Schweizer Armee, KI-Governance auf Ebene der Bundeskanzlei und institutionelle Koordination im europäischen Schienenverkehr.",
    "url": "https://andrew.cloudhopper.ch/about/de",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "jobTitle": "Projektleiter, KI-Plattform, Schweizer Armee",
      "description": "KI-Plattformleitung und Governance innerhalb der Schweizer Bundesverwaltung",
      "knowsAbout": [
        "KI-Governance",
        "Souveräne KI-Plattformen",
        "Bundesweite KI-Strategie",
        "Projektportfolio-Management",
        "Institutionelle Koordination",
        "Öffentliche Verwaltung"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Projektleiter",
        "occupationLocation": {
          "@type": "Country",
          "name": "Schweiz"
        }
      }
    }
  }

  const aboutBreadcrumbs = [
    { name: "Startseite", url: "https://andrew.cloudhopper.ch" },
    { name: "About", url: "https://andrew.cloudhopper.ch/about/de" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="About"
        description="Andrew J. Hermann — KI-Plattformleitung in der Schweizer Armee, KI-Governance auf Ebene der Bundeskanzlei und institutionelle Koordination im europäischen Schienenverkehr."
        keywords="Andrew Hermann, KI-Governance, Schweizer Armee, Bundeskanzlei, souveräne KI, institutionelle KI, Projektleitung"
        url="https://andrew.cloudhopper.ch/about/de"
        structuredData={aboutStructuredData}
        breadcrumbs={aboutBreadcrumbs}
      />


      <Navbar />

      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Über mich</h1>
          <p className="page-subtitle">
            Zwei Jahrzehnte institutionelle Systemarbeit. Der Hintergrund, die Arbeitsweise und der Kontext.
          </p>
        </div>

        <div className="content-main">

          <div className="section-card">
            <h2>Aktuelle Tätigkeit</h2>
            <p>
              Ich arbeite innerhalb der Schweizer Bundesverwaltung. Seit Dezember 2022 leite ich KI@V als
              Projektleiter innerhalb des ASTAB, dem Armeestab. Die Plattform nahm im Juni 2026 den aktiven
              Pilotbetrieb für den ASTAB auf. Sie wird innerhalb der Bundesinfrastruktur betrieben, ist nach
              Cloud-Stufe III zertifiziert und wurde im Rahmen einer unabhängigen Bewertung durch die HSLU
              wirtschaftlich über drei Anwendungsfälle validiert.
            </p>
            <p>
              Parallel dazu halte ich einen Praktikersitz in KI-für-Alle, der ämterübergreifenden
              Arbeitsgruppe der Bundeskanzlei, die den Umsetzungsrahmen für die Teilstrategie Künstliche
              Intelligenz des Bundes erarbeitet. Ich bringe die operative Perspektive einer KI-Plattform
              im aktiven Einsatz innerhalb der Gruppe Verteidigung ein und habe Governance-Positionen zu
              Evaluationsmethodik, ISO-Lebenszyklusstandards und Cloud-Stufen-Compliance eingebracht.
            </p>
          </div>

          <div className="section-card">
            <h2>Frühere Tätigkeit</h2>
            <p>
              Bei der Digital Factory Verteidigung leitete ich die Umsetzung von COCKPIT, einer
              Projektportfolio-Intelligence-Plattform, die das manuelle Berichtswesen in den Departementen
              des ASTAB durch automatisierte, geregelte Datenpipelines und 11 Power-BI-Dashboards ersetzte.
              Sie ermöglichte der Führung erstmals eine historische Sicht auf das gesamte Portfolio.
            </p>
            <p>
              Vor meiner aktuellen Tätigkeit in der Bundesverwaltung vertrat ich SBB als Delegierter und
              leitete die FTE-Seite einer strukturellen Verhandlung mit RailNetEurope, koordinierte über
              150+ Stakeholder aus 28 nationalen Eisenbahnverkehrsunternehmen, vermittelte das erste
              formelle Abkommen zwischen den beiden Gremien und sicherte die erste EU-Horizon-Förderung,
              die dem FTE je zugesprochen wurde. Die Arbeit erforderte nachhaltige Koordination über
              rechtliche, organisatorische und politische Grenzen hinweg, ohne formales Mandat einer der
              beiden Institutionen.
            </p>
            <p>
              Zuvor leitete ich die technische Konzeption und den schweizweiten Rollout einer
              Apotheken-Kiosk-Plattform für Novartis Consumer Health Schweiz und entwarf
              Integrationsarchitekturen für industrielle IoT-Kunden in der DACH-Region mit
              IBM-Maximo-Asset-Management-Umgebungen.
            </p>
          </div>

          <div className="section-card">
            <h2>Arbeitsphilosophie</h2>
            <p>
              Ich gehe an Systeme mit einer Mischung aus Pragmatismus und Skepsis heran. Ich setze
              Technologie nicht um ihrer selbst willen ein. Ich suche nach Fehlerquellen, vereinfache
              wo möglich und konzipiere für Langfristigkeit. Viele der Umgebungen, in denen ich arbeite,
              verfügen nicht über saubere Schnittstellen, aktuelle Dokumentation oder ideale
              Voraussetzungen. Das behindert die Arbeit nicht. Es definiert ihre Grenzen.
            </p>
            <p>
              Ich erstelle Werkzeuge und Plattformen, die gewartet, verstanden und ohne Risiko übergeben
              werden können. Ich vermeide Anbieterabhängigkeit, widerstehe verfrühter Optimierung und
              betrachte Legacy nicht als Bürde, sondern als Constraint, der zu respektieren und zu
              navigieren ist. Ich arbeite an dem, was operativ bedeutsam ist, und ich baue auf
              institutionellem Massstab.
            </p>
            <p>
              Privat unterhalte ich weiterhin meine eigene Infrastruktur und teste neue Werkzeuge in
              kontrollierten Systemen. Ich bevorzuge Open-Source-Technologie, minimale Angriffsfläche
              und Komponenten, die transparent versagen. Ich wende dieselben Standards auf private
              Experimente an wie auf Architektur im öffentlichen Sektor: schlank, lesbar und zuverlässig.
            </p>
          </div>

          <div className="section-card">
            <h2>Tätigkeitsbereiche</h2>
            <p><strong>KI-Governance im öffentlichen Sektor:</strong> Aufbau der Bewertungsrahmen,
            Lebenszyklusstandards und Rechenschaftsstrukturen, die KI-Einsatz in regulierten
            Bundesumgebungen vertretbar und prüfbar machen.</p>

            <p><strong>Governance digitaler Initiativen:</strong> Etablierung der Mandate,
            Rechenschaftsstrukturen und Entscheidungslogiken, die ämterübergreifende Programme
            funktionsfähig machen. Nicht nur die Technologie, sondern die Governance, die sie
            auditierbar macht.</p>

            <p><strong>Portfolio-Intelligence:</strong> Aufbau der Dateninfrastruktur, die der
            institutionellen Führung ein genaues, aktuelles Bild des Gesamtportfolios vermittelt
            und manuelle Zusammenstellung durch geregelte, automatisierte Pipelines ersetzt.</p>

            <p><strong>Institutionelle Koordination:</strong> Strukturierung und Aufrechterhaltung
            von Arbeitsbeziehungen über rechtliche, organisatorische und politische Grenzen hinweg,
            an der Schnittstelle von Verteidigung, Verkehr und öffentlicher Verwaltung.</p>

            <p><strong>Institutionelle Modernisierung:</strong> Gestaltung von Wandel innerhalb
            bestehender Strukturen: Legacy-Infrastruktur, unvollständige Dokumentation, eingeschränkte
            Beschaffung. Mehrwert schaffen, ohne Disruption zu erzwingen.</p>
          </div>

          <div className="section-card">
            <h2>Öffentliche Auftritte</h2>
            <p>
              <strong>KI-Leuchttürme · BK-DTI / KI-Netzwerk Bund · September 2026 · bevorstehend</strong><br />
              KI@V als Kandidat für das föderale KI-Leuchtturmprogramm eingereicht. Bei Auswahl wird die
              Plattform am 14. September 2026 am föderalen KI-Community-Anlass vorgestellt.
            </p>
            <p>
              <strong>KI-Netzwerk der Bundesverwaltung · August 2026 · bevorstehend</strong><br />
              Video-Interview (7–8 Minuten) zu konkreten KI-Umsetzungsmassnahmen und Herausforderungen
              in der Bundesverwaltung, für das KI-Netzwerk Bund.
            </p>
            <p>
              <strong>KI@V Evolve-Phase-Launch · 1. Juni 2026 · Mannschaftskaserne Bern</strong><br />
              Präsentation der operativen Ergebnisse und der Roadmap der Evolve-Phase vor rund 100
              Vertreterinnen und Vertretern aus ASTAB, Kdo Ausbildung, Kdo Op, armasuisse,
              Bundeskanzlei, LBA, BIT und dem KI-Netzwerk Bund.
            </p>
            <p>
              <strong>armasuisse Digital Day · 5. Mai 2026 · armasuisse, Bern</strong><br />
              Co-Präsentation von KI@V mit einer Live-RAG-Demo auf Armeebotschaften für die
              Verteidigungs-Technologie-Community.
            </p>
            <p>
              <strong>IBM-Maximo-Anwenderkonferenz · ca. 2015 · Raum Frankfurt</strong><br />
              Vortrag zu Integrationsmustern für zustandsbasierte Instandhaltung an der jährlichen
              IBM-Maximo-Anwenderkonferenz, im Rahmen von Kundenprojekten in der DACH-Region.
            </p>
          </div>

          <div className="section-card">
            <h2>Sprachen und Kontext</h2>
            <p>
              Ich lebe und arbeite in Bern und bin in Deutsch und Englisch voll berufsfähig. Ich verfüge
              über ausreichende Französischkenntnisse für professionelle Kontexte. Ich bin vollständig in
              die operativen Realitäten des Schweizer öffentlichen Sektors eingebettet, einschliesslich
              seiner Rechtsrahmen, Beschaffungsregime und föderalen Governance. Ich verstehe den
              Unterschied zwischen strategischem Anspruch und institutioneller Kapazität und wie man das
              eine in Richtung des anderen bewegt.
            </p>
          </div>

          <div className="section-card">
            <h2>Hintergrund</h2>
            <p>
              Mein Verhältnis zur Technologie begann 1984, als ich in der Primarschule mit
              BASIC-Programmierung auf einem MSX-Computer eingeführt wurde. Innerhalb von drei Tagen hatte
              ich mein erstes funktionsfähiges Programm geschrieben. Bis Ende des Schuljahres hatte ich ein
              funktionierendes Spiel entwickelt, nicht weil es verlangt wurde, sondern weil die Logik
              zugänglich und das Feedback unmittelbar war.
            </p>
            <p>
              In den folgenden Jahren baute und wartete ich eigene Hardware, richtete kleine Netzwerke ein
              und entwickelte Systeme mit Oracle Forms und relationalen Datenbanken. Als Jugendlicher
              arbeitete ich eigenständig mit Linux, UNIX, HP-UX und Solaris und navigierte
              Enterprise-Betriebssysteme aus reinem Interesse daran, wie sie unter der Oberfläche
              funktionieren.
            </p>
            <p>
              Ich sammelte keine Zertifikate. Ich erlangte Vertrautheit mit Systemen: wie sie unter Last
              reagieren, wie sie ausfallen und wie sie widerstandsfähig gemacht werden können. Dieses
              Grundwissen prägt noch heute meinen Ansatz zu Infrastruktur, Datenmanagement und digitaler
              Governance.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

AboutDe.defaultProps = {}

export default AboutDe
