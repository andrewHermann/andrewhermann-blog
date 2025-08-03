import React from 'react'
import SEO from '../components/seo'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './terms-of-use.css'

const TermsOfUse = () => {
  const termsBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" },
    { name: "Terms of Use", url: "https://andrew.cloudhopper.ch/terms" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Terms of Use"
        description="Terms of Use for Andrew J. Hermann's professional website and services. Review the legal terms governing the use of this website and professional consulting services."
        keywords="terms of use, legal terms, website terms, professional services terms, consulting agreement"
        url="https://andrew.cloudhopper.ch/terms"
        breadcrumbs={termsBreadcrumbs}
      />
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Terms of Use</h1>
          <p className="page-subtitle">Last updated: January 19, 2025</p>
        </div>
        
        <div className="content-main">
          <section className="section-card">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website (andrew.cloudhopper.ch), you accept and agree to be bound by the terms and provision of this agreement. These Terms of Use govern your use of this website and any services provided through it.
            </p>
          </section>

          <section className="section-card">
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Andrew J. Hermann's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>attempt to decompile or reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Andrew J. Hermann at any time.
            </p>
          </section>

          <section className="section-card">
            <h2>3. Professional Services</h2>
            <p>
              Information about professional services, consulting, and expertise shared on this website is for informational purposes only. Any engagement for professional services requires separate written agreement and is subject to specific terms and conditions that will be provided at the time of engagement.
            </p>
          </section>

          <section className="section-card">
            <h2>4. Disclaimer</h2>
            <p>
              The materials on Andrew J. Hermann's website are provided on an 'as is' basis. Andrew J. Hermann makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, Andrew J. Hermann does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="section-card">
            <h2>5. Limitations</h2>
            <p>
              In no event shall Andrew J. Hermann or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Andrew J. Hermann's website, even if Andrew J. Hermann or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>

          <section className="section-card">
            <h2>6. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Any personal information collected through this website is handled in accordance with our Privacy Policy. By using this website, you consent to the collection and use of information as outlined in our Privacy Policy.
            </p>
          </section>

          <section className="section-card">
            <h2>7. User Conduct</h2>
            <p>
              You agree not to use the website:
            </p>
            <ul>
              <li>for any unlawful purpose or to solicit others to perform such acts</li>
              <li>to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>to infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>to submit false or misleading information</li>
              <li>to upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section className="section-card">
            <h2>8. Intellectual Property</h2>
            <p>
              The content, design, graphics, compilation, magnetic translation, digital conversion, and other matters related to this website are protected under applicable copyrights, trademarks, and other proprietary rights. All content is the property of Andrew J. Hermann unless otherwise specified.
            </p>
          </section>

          <section className="section-card">
            <h2>9. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites. These links are provided solely for your convenience. Andrew J. Hermann has no control over the content of these sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </section>

          <section className="section-card">
            <h2>10. Modifications</h2>
            <p>
              Andrew J. Hermann may revise these Terms of Use for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Use.
            </p>
          </section>

          <section className="section-card">
            <h2>11. Governing Law</h2>
            <p>
              These Terms of Use and your use of the website are governed by and construed in accordance with the laws of Switzerland, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section className="section-card">
            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please <Link to="/contact" className="contact-link">contact us through our contact form</Link>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TermsOfUse
