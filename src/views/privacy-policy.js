import React from 'react'
import SEO from '../components/seo'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './privacy-policy.css'

const PrivacyPolicy = () => {
  const privacyBreadcrumbs = [
    { name: "Home", url: "https://andrewhermann.com" },
    { name: "Privacy Policy", url: "https://andrewhermann.com/privacy" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Andrew J. Hermann's professional website describing how we collect, use, and protect your personal information in compliance with data protection regulations."
        keywords="privacy policy, data protection, personal information, GDPR compliance, data privacy, information security"
        url="https://andrewhermann.com/privacy"
        breadcrumbs={privacyBreadcrumbs}
      />
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Last updated: January 19, 2025</p>
        </div>
        
        <div className="content-main">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Andrew J. Hermann ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website andrewhermann.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <h3>Personal Data</h3>
            <p>
              Personally identifiable information, such as your name, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site, such as online chat and message boards.
            </p>
            
            <h3>Usage Data</h3>
            <p>
              Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site.
            </p>
            
            <h3>Mobile Device Data</h3>
            <p>
              Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the site from a mobile device.
            </p>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>
              We may use information collected about you via the site to:
            </p>
            <ul>
              <li>Create and manage your account</li>
              <li>Email you regarding your account or order</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the site</li>
              <li>Generate a personal profile about you to make future visits to the site more personalized</li>
              <li>Increase the efficiency and operation of the site</li>
              <li>Monitor and analyze usage and trends to improve your experience with the site</li>
              <li>Notify you of updates to the site</li>
              <li>Offer new products, services, mobile applications, and/or recommendations to you</li>
              <li>Perform other business activities as needed</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity</li>
              <li>Process payments and refunds</li>
              <li>Request feedback and contact you about your use of the site</li>
              <li>Resolve disputes and troubleshoot problems</li>
              <li>Respond to product and customer service requests</li>
              <li>Solicit support for the site</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            
            <h3>By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
            
            <h3>Business Transfers</h3>
            <p>
              We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </p>
            
            <h3>Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Tracking Technologies</h2>
            <h3>Cookies and Web Beacons</h3>
            <p>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to help customize the site and improve your experience. For more information on how we use cookies, please refer to our <Link to="/cookies" className="contact-link">Cookie Policy</Link> posted on the site, which is incorporated into this Privacy Policy.
            </p>
            
            <h3>Website Analytics</h3>
            <p>
              We may also partner with selected third-party vendors, such as Google Analytics, to allow tracking technologies and remarketing services on the site through the use of first party cookies and third-party cookies, to, among other things, analyze and track users' use of the site, determine the popularity of certain content, and better understand online activity.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Third-Party Websites</h2>
            <p>
              The site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Policy for Children</h2>
            <p>
              We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Your Rights (GDPR)</h2>
            <p>
              If you are a resident of the European Economic Area (EEA), you have certain data protection rights. You may:
            </p>
            <ul>
              <li>Access, update, or request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Ask us to restrict processing of your personal information</li>
              <li>Request portability of your personal information</li>
              <li>Withdraw consent at any time where we relied on your consent to process your personal information</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>10. Data Retention</h2>
            <p>
              We will only retain your personal information for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
          </section>

          <section className="privacy-section">
            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section className="privacy-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please <Link to="/contact" className="contact-link">contact us through our contact form</Link>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
