"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Play, Fish, Activity, TrendingUp, Phone, Mail, MapPin } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function AquacultureLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      sectionRefs.current.forEach((ref) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        if (rect.top < window.innerHeight - 80) {
          ref.classList.add("revealed")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setActiveSection(sectionId)
  }

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      color: "white",
      overflowX: "hidden" as const,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    nav: {
      position: "fixed" as const,
      top: 0,
      width: "100%",
      zIndex: 50,
      transition: "all 0.3s ease",
      backgroundColor: isScrolled ? "rgba(26, 26, 26, 0.95)" : "transparent",
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      boxShadow: isScrolled ? "0 10px 25px rgba(0, 0, 0, 0.3)" : "none",
    },
    navContainer: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#00bcd4",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      marginLeft: "8px",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    navItems: {
      display: "none",
      alignItems: "center",
      gap: "2rem",
    },
    navItem: {
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "color 0.2s ease",
      background: "none",
      border: "none",
      color: "#d1d5db",
      cursor: "pointer",
    },
    navItemActive: {
      color: "#00bcd4",
    },
    navLogin: {
      backgroundColor: "#00bcd4",
      color: "#1a1a1a",
      padding: "8px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      textDecoration: "none",
      display: "inline-block",
      transition: "background-color 0.2s ease",
    },
    heroSection: {
      position: "relative" as const,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    heroBackground: {
      position: "absolute" as const,
      inset: 0,
      zIndex: 0,
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d3748 50%, #1a1a1a 100%)",
    },
    heroOverlay: {
      position: "absolute" as const,
      inset: 0,
      background: "linear-gradient(to bottom, rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.5), rgba(26, 26, 26, 0.8))",
    },
    heroContent: {
      position: "relative" as const,
      zIndex: 10,
      textAlign: "center" as const,
      maxWidth: "1024px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    heroIconContainer: {
      marginBottom: "2rem",
      animation: "pulse 2s infinite",
    },
    heroIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(0, 188, 212, 0.2)",
      borderRadius: "50%",
      margin: "0 auto 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)",
    },
    heroTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      lineHeight: "1.2",
    },
    heroSubtitle: {
      fontSize: "1.1rem",
      color: "#d1d5db",
      marginBottom: "2.5rem",
      maxWidth: "512px",
      margin: "0 auto 2.5rem",
      lineHeight: "1.6",
    },
    heroButtons: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButton: {
      backgroundColor: "#00bcd4",
      color: "#1a1a1a",
      padding: "16px 32px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "1.125rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    secondaryButton: {
      border: "2px solid #00bcd4",
      color: "#00bcd4",
      backgroundColor: "transparent",
      padding: "16px 32px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "1.125rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    scrollIndicator: {
      position: "absolute" as const,
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
      animation: "bounce 2s infinite",
    },
    section: {
      padding: "5rem 0",
      backgroundColor: "#2d3748",
    },
    sectionDark: {
      padding: "5rem 0",
      background: "linear-gradient(to bottom, #1a1a1a, #2d3748)",
    },
    sectionContainer: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    sectionHeader: {
      textAlign: "center" as const,
      marginBottom: "4rem",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      color: "white",
    },
    sectionDescription: {
      fontSize: "1.25rem",
      color: "#d1d5db",
      maxWidth: "768px",
      margin: "0 auto",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
    },
    featureCard: {
      backgroundColor: "rgba(26, 26, 26, 0.5)",
      backdropFilter: "blur(4px)",
      borderRadius: "16px",
      padding: "2rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    featureIcon: {
      width: "64px",
      height: "64px",
      backgroundColor: "rgba(0, 188, 212, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1.5rem",
      transition: "background-color 0.3s ease",
    },
    featureTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "white",
    },
    featureDescription: {
      color: "#d1d5db",
      lineHeight: "1.6",
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
    },
    serviceCard: {
      backgroundColor: "rgba(45, 55, 72, 0.5)",
      backdropFilter: "blur(4px)",
      borderRadius: "12px",
      padding: "1.5rem",
      transition: "all 0.3s ease",
      border: "1px solid #4a5568",
      cursor: "pointer",
    },
    serviceIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "rgba(0, 188, 212, 0.2)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    serviceIconDot: {
      width: "24px",
      height: "24px",
      backgroundColor: "#00bcd4",
      borderRadius: "50%",
    },
    serviceTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      color: "white",
    },
    serviceDescription: {
      color: "#d1d5db",
      fontSize: "0.875rem",
    },
    contactGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "3rem",
    },
    contactInfo: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "2rem",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    contactIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "rgba(0, 188, 212, 0.2)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    footer: {
      backgroundColor: "#1a1a1a",
      borderTop: "1px solid #2d3748",
      padding: "3rem 0",
    },
    footerContent: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1rem",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "1rem",
    },
    footerText: {
      color: "#9ca3af",
      textAlign: "center" as const,
    },
    footerSubtext: {
      color: "#6b7280",
      fontSize: "0.875rem",
      marginTop: "0.25rem",
    },
  }

  const mediaQueryStyles = `
  @media (min-width: 768px) {
    .nav-items { display: flex !important; }
    .hero-title { font-size: 3.5rem !important; }
    .hero-subtitle { font-size: 1.3rem !important; }
    .hero-buttons { flex-direction: row !important; justify-content: center !important; }
    .footer-content { flex-direction: row !important; justify-content: space-between !important; }
  }
  @media (max-width: 767px) {
    .hero-title { font-size: 2rem !important; }
    .hero-subtitle { font-size: 1rem !important; }
    .nav-items { display: none !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .hero-title { font-size: 1.8rem !important; }
    .hero-subtitle { font-size: 0.95rem !important; }
    .section-title { font-size: 2rem !important; }
    .section-description { font-size: 1.1rem !important; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .feature-card:hover {
    background-color: rgba(55, 65, 81, 0.5) !important;
    transform: scale(1.05) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
  }
  .feature-card:hover .feature-icon {
    background-color: rgba(0, 188, 212, 0.3) !important;
  }
  .service-card:hover {
    background-color: rgba(0, 188, 212, 0.1) !important;
    transform: scale(1.05) !important;
    border-color: rgba(0, 188, 212, 0.5) !important;
  }
  .service-card:hover .service-icon {
    background-color: rgba(0, 188, 212, 0.3) !important;
  }
  .nav-item:hover {
    color: #00bcd4 !important;
  }
  .nav-login:hover {
    background-color: #00acc1 !important;
  }
  .primary-button:hover {
    background-color: #00acc1 !important;
    transform: scale(1.05) !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
  }
  .secondary-button:hover {
    background-color: #00bcd4 !important;
    color: #1a1a1a !important;
    transform: scale(1.05) !important;
  }
  .reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1.2s cubic-bezier(.4,0,.2,1), transform 1.2s cubic-bezier(.4,0,.2,1);
  }
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`

  return (
    <div style={styles.container}>
      <style>{mediaQueryStyles}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Fish size={24} color="#1a1a1a" />
            </div>
            <span style={styles.logoText}>AquaTech</span>
          </div>
          <div style={styles.navItems} className="nav-items">
            {["Home", "About Us", "Services", "Contact Us"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                style={{
                  ...styles.navItem,
                  ...(activeSection === item.toLowerCase().replace(" ", "-") ? styles.navItemActive : {}),
                }}
                className="nav-item"
              >
                {item}
              </button>
            ))}
          </div>
          <Link href="/login" style={styles.navLogin} className="nav-login">
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={styles.heroSection} ref={(el) => (sectionRefs.current[0] = el)} className="reveal">
        <div style={styles.heroBackground}>
          <div style={styles.heroOverlay}></div>
        </div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle} className="hero-title">
            <span style={{ display: "block", color: "white" }}>Digitalize fish tracking.</span>
            <span style={{ display: "block", color: "#00bcd4", marginTop: "0.5rem" }}>Monitor health.</span>
            <span style={{ display: "block", color: "white", marginTop: "0.5rem" }}>Optimize farming.</span>
          </h1>
          <p style={styles.heroSubtitle} className="hero-subtitle">
            Revolutionary aquaculture technology that transforms traditional fish farming into intelligent, sustainable
            operations.
          </p>
          <div style={styles.heroButtons} className="hero-buttons">
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <button style={styles.primaryButton} className="primary-button">
                <span style={{ display: "flex", alignItems: "center" }}>
                  Start Your Journey
                  <Play size={20} style={{ marginLeft: "8px" }} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about-us" style={styles.section} ref={(el) => (sectionRefs.current[1] = el)} className="reveal">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <span style={{ color: "#00bcd4" }}>About Us</span>
            </h2>
            <p style={styles.sectionDescription}>At AquaTech, we are building the future of fish farming in Algeria.</p>
          </div>
          <div style={styles.featuresGrid} className="features-grid">
            {[
              {
                icon: Fish,
                title: "Smart Monitoring Platform",
                description:
                  "Our platform empowers fish farmers with real-time monitoring, automated alerts, and smart dashboards, all powered by data collected from sensors placed in fish ponds. We make aquaculture easier, faster, and more efficient—ensuring healthier fish and better productivity.",
              },
              {
                icon: Activity,
                title: "Control from Anywhere",
                description:
                  "Whether you're managing one pond or a whole farm, AquaTech gives you control from anywhere, even in areas with limited internet access. Stay connected to your fish farm operations no matter where you are.",
              },
              {
                icon: TrendingUp,
                title: "Technology Meets Tradition",
                description:
                  "We believe that by combining technology with tradition, we can support sustainable aquaculture and ensure food security for the future. Our solutions respect traditional farming methods while enhancing them with modern technology.",
              },
            ].map((feature, index) => (
              <div key={index} style={styles.featureCard} className="feature-card">
                <div style={styles.featureIcon} className="feature-icon">
                  <feature.icon size={32} color="#00bcd4" />
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={styles.sectionDark} ref={(el) => (sectionRefs.current[2] = el)} className="reveal">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Our <span style={{ color: "#00bcd4" }}>Services</span>
            </h2>
            <p style={styles.sectionDescription}>Comprehensive solutions for modern aquaculture operations</p>
          </div>
          <div style={styles.servicesGrid} className="services-grid">
            {[
              "Digital Fish Tracking Systems",
              "Water Quality Monitoring",
              "Automated Feeding Solutions",
              "Health Analytics Platform",
              "Environmental Control Systems",
              "Data Analytics & Reporting",
            ].map((service, index) => {
              const descriptions = [
                "Track individual fish growth, behavior patterns, and location data using advanced RFID and IoT sensor technology.",
                "Monitor pH levels, dissolved oxygen, temperature, and water clarity with real-time alerts and automated responses.",
                "Smart feeding systems that optimize nutrition delivery based on fish size, species, and environmental conditions.",
                "AI-powered health monitoring that detects diseases early and provides treatment recommendations for your fish.",
                "Automated control of water pumps, aerators, and filtration systems to maintain optimal pond conditions.",
                "Comprehensive reporting tools with predictive analytics to maximize yield and profitability of your operations.",
              ]

              return (
                <div key={index} style={styles.serviceCard} className="service-card">
                  <div style={styles.serviceIcon} className="service-icon">
                    <div style={styles.serviceIconDot}></div>
                  </div>
                  <h3 style={styles.serviceTitle}>{service}</h3>
                  <p style={styles.serviceDescription}>{descriptions[index]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-us"
        style={{ ...styles.section, backgroundColor: "#1a1a1a" }}
        ref={(el) => (sectionRefs.current[3] = el)}
        className="reveal"
      >
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Ready to <span style={{ color: "#00bcd4" }}>Transform</span> Your Farm?
            </h2>
            <p style={styles.sectionDescription}>
              Get in touch with our experts to discuss how we can revolutionize your aquaculture operations
            </p>
          </div>
          <div style={styles.contactGrid} className="contact-grid">
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <Phone size={24} color="#00bcd4" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>Phone</h3>
                  <p style={{ color: "#d1d5db" }}>+1 (555) 123-4567</p>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <Mail size={24} color="#00bcd4" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>Phone</h3>
                  <p style={{ color: "#d1d5db" }}>contact@aquatech.com</p>
                </div>
              </div>
              <div style={styles.contactItem}>
                <div style={styles.contactIcon}>
                  <MapPin size={24} color="#00bcd4" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>Address</h3>
                  <p style={{ color: "#d1d5db" }}>123 Ocean Drive, Coastal City, CC 12345</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent} className="footer-content">
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Fish size={24} color="#1a1a1a" />
            </div>
            <span style={styles.logoText}>AquaTech</span>
          </div>
          <div style={styles.footerText}>
            <p>© 2025 AquaTech. All rights reserved.</p>
            <p style={styles.footerSubtext}>Transforming aquaculture through innovation</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
