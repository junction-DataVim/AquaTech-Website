"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Fish, Phone, Lock, ArrowLeft, Eye, EyeOff, MessageSquare, Clock, CheckCircle } from "lucide-react"

// Footer Component
const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#1a1a1a",
      borderTop: "1px solid #2d3748",
      padding: "2rem 0",
      marginTop: "auto",
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
    logo: {
      display: "flex",
      alignItems: "center",
    },
    logoIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#00bcd4",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      marginLeft: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "white",
    },
    footerText: {
      color: "#9ca3af",
      textAlign: "center" as const,
      fontSize: "0.875rem",
    },
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <Fish size={20} color="#1a1a1a" />
          </div>
          <span style={styles.logoText}>AquaTech</span>
        </div>
        <div style={styles.footerText}>
          <p>© 2025 AquaTech. All rights reserved.</p>
          <p>Transforming aquaculture through innovation</p>
        </div>
      </div>
    </footer>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [timer, setTimer] = useState(0)
  const [canResend, setCanResend] = useState(false)
  const [resetPhoneNumber, setResetPhoneNumber] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Timer Effect for SMS countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setCanResend(true)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timer])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Login successful! Welcome to AquaSense DZ")
      router.push("/dashboard") // Changed from "/home" to "/dashboard"
    }, 2000)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleForgotPassword = () => {
    if (!resetPhoneNumber.trim()) {
      alert("Please enter your phone number")
      return
    }
    setIsLoading(true)
    // Simulate SMS sending delay
    setTimeout(() => {
      setIsCodeSent(true)
      setTimer(60)
      setCanResend(false)
      setIsLoading(false)
      alert(`Verification code sent to ${resetPhoneNumber}`)
    }, 1500)
  }

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      alert("Please enter a 6-digit verification code")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      // Simple verification check (in real app, this would be server-side)
      if (verificationCode === "123456") {
        setShowSuccess(true)
        setIsLoading(false)
        // Auto-return to login after 3 seconds
        setTimeout(() => {
          resetForgotPassword()
        }, 3000)
      } else {
        setIsLoading(false)
        alert("Invalid verification code. Try 123456 for demo.")
      }
    }, 1500)
  }

  const handleResendCode = () => {
    setTimer(60)
    setCanResend(false)
    setVerificationCode("")
    alert(`New verification code sent to ${resetPhoneNumber}`)
  }

  const resetForgotPassword = () => {
    setShowForgotPassword(false)
    setIsCodeSent(false)
    setVerificationCode("")
    setTimer(0)
    setCanResend(false)
    setResetPhoneNumber("")
    setShowSuccess(false)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      color: "white",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      flexDirection: "column" as const,
    },
    mainContent: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative" as const,
      padding: "80px 1rem 2rem 1rem",
    },
    nav: {
      position: "fixed" as const,
      top: 0,
      width: "100%",
      zIndex: 50,
      transition: "all 0.3s ease",
      background: "transparent",
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
    navLogo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },
    navLogoIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#00bcd4",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    navLogoText: {
      marginLeft: "8px",
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "white",
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
    background: {
      position: "absolute" as const,
      inset: 0,
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d3748 50%, #1a1a1a 100%)",
      zIndex: 0,
    },
    overlay: {
      position: "absolute" as const,
      inset: 0,
      background: "radial-gradient(circle at center, rgba(0, 188, 212, 0.1) 0%, transparent 70%)",
      zIndex: 1,
    },
    backToHome: {
      position: "fixed" as const,
      top: "20px",
      left: "20px",
      zIndex: 60000,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: "rgba(0, 188, 212, 0.1)",
      border: "2px solid #00bcd4",
      borderRadius: "8px",
      padding: "8px 12px",
      color: "#00bcd4",
      textDecoration: "none",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      boxShadow: "0 0 20px rgba(0, 188, 212, 0.3)",
    },
    loginCard: {
      backgroundColor: "rgba(26, 26, 26, 0.8)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "3rem",
      width: "100%",
      maxWidth: "520px",
      position: "relative" as const,
      zIndex: 5,
      border: "2px solid transparent",
      background:
        "linear-gradient(rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.8)) padding-box, linear-gradient(135deg, #00bcd4, #00acc1, #0097a7) border-box",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 188, 212, 0.2)",
    },
    logoContainer: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      marginBottom: "2.5rem",
    },
    logoIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(0, 188, 212, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1rem",
      border: "3px solid #00bcd4",
      boxShadow: "0 0 30px rgba(0, 188, 212, 0.4)",
    },
    logoText: {
      fontSize: "2rem",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #00bcd4, #00acc1)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      textAlign: "center" as const,
      marginBottom: "0.5rem",
      color: "white",
    },
    subtitle: {
      color: "#d1d5db",
      textAlign: "center" as const,
      marginBottom: "2rem",
      fontSize: "1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    inputGroup: {
      position: "relative" as const,
    },
    inputContainer: {
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      backgroundColor: "rgba(45, 55, 72, 0.8)",
      border: "2px solid #4a5568",
      borderRadius: "12px",
      padding: "16px 16px 16px 50px",
      color: "white",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      outline: "none",
    },
    passwordInput: {
      width: "100%",
      backgroundColor: "rgba(45, 55, 72, 0.8)",
      border: "2px solid #4a5568",
      borderRadius: "12px",
      padding: "16px 50px 16px 50px",
      color: "white",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      outline: "none",
    },
    inputIcon: {
      position: "absolute" as const,
      left: "16px",
      zIndex: 1,
      color: "#9ca3af",
    },
    passwordToggle: {
      position: "absolute" as const,
      right: "16px",
      zIndex: 1,
      cursor: "pointer",
      color: "#9ca3af",
      transition: "color 0.2s ease",
      background: "transparent",
      border: "none",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loginButton: {
      backgroundColor: "#00bcd4",
      color: "#1a1a1a",
      border: "none",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "1.125rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative" as const,
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0, 188, 212, 0.3)",
      opacity: isLoading ? 0.7 : 1,
    },
    loadingSpinner: {
      width: "20px",
      height: "20px",
      border: "2px solid #1a1a1a",
      borderTop: "2px solid transparent",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "8px",
    },
    linkText: {
      textAlign: "center" as const,
      marginTop: "1.5rem",
      color: "#9ca3af",
      fontSize: "0.875rem",
    },
    link: {
      color: "#00bcd4",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color 0.2s ease",
      cursor: "pointer",
    },
    forgotPasswordContainer: {
      textAlign: "center" as const,
    },
    forgotPasswordIcon: {
      width: "64px",
      height: "64px",
      backgroundColor: "rgba(0, 188, 212, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem",
      border: "2px solid #00bcd4",
    },
    phoneNumberDisplay: {
      backgroundColor: "rgba(0, 188, 212, 0.1)",
      border: "1px solid #00bcd4",
      borderRadius: "8px",
      padding: "12px",
      color: "#00bcd4",
      textAlign: "center" as const,
      marginBottom: "1.5rem",
      fontSize: "0.875rem",
    },
    verificationInput: {
      textAlign: "center" as const,
      fontSize: "1.5rem",
      fontWeight: "bold",
      letterSpacing: "0.5rem",
      backgroundColor: "rgba(45, 55, 72, 0.8)",
      border: "2px solid #4a5568",
      borderRadius: "12px",
      padding: "16px",
      color: "white",
      outline: "none",
      transition: "all 0.3s ease",
    },
    timerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      margin: "1rem 0",
      padding: "12px",
      backgroundColor: "rgba(45, 55, 72, 0.3)",
      borderRadius: "8px",
      border: "1px solid #4a5568",
    },
    timerText: {
      color: timer > 0 ? "#eab308" : "#22c55e",
      fontSize: "0.875rem",
      fontWeight: "600",
    },
    resendButton: {
      backgroundColor: canResend ? "#00bcd4" : "#6b7280",
      color: canResend ? "#1a1a1a" : "#9ca3af",
      border: "none",
      borderRadius: "8px",
      padding: "12px 24px",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: canResend ? "pointer" : "not-allowed",
      transition: "all 0.3s ease",
      opacity: canResend ? 1 : 0.6,
    },
    successContainer: {
      textAlign: "center" as const,
      padding: "2rem 0",
    },
    successIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem",
      border: "3px solid #22c55e",
      animation: "pulse 2s infinite",
    },
    successTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#22c55e",
      marginBottom: "1rem",
    },
    successMessage: {
      color: "#d1d5db",
      fontSize: "0.875rem",
      marginBottom: "1rem",
    },
    backButton: {
      backgroundColor: "transparent",
      border: "2px solid #6b7280",
      color: "#d1d5db",
      borderRadius: "8px",
      padding: "12px 24px",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "1rem",
    },
  }

  const mediaQueryStyles = `
    @media (max-width: 480px) {
      .logo-icon-responsive {
        width: 60px !important;
        height: 60px !important;
      }
      .logo-text-responsive {
        font-size: 1.5rem !important;
      }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .nav-login:hover {
      background-color: #00acc1 !important;
    }
    .nav-logo:hover {
      opacity: 0.8 !important;
    }
    .login-input:focus {
      border-color: #00bcd4 !important;
      box-shadow: 0 0 20px rgba(0, 188, 212, 0.3) !important;
    }
    .login-input:focus + .input-icon {
      color: #00bcd4 !important;
    }
    .password-toggle:hover {
      color: #00bcd4 !important;
    }
    .login-button:hover:not(:disabled) {
      background-color: #00acc1 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 15px 35px rgba(0, 188, 212, 0.4) !important;
    }
    .login-button:disabled {
      cursor: not-allowed !important;
    }
    .link:hover {
      color: #00acc1 !important;
    }
    .login-input::placeholder {
      color: #9ca3af;
    }
    .back-to-home:hover {
      background-color: rgba(0, 188, 212, 0.2) !important;
      transform: scale(1.05) !important;
      box-shadow: 0 0 30px rgba(0, 188, 212, 0.5) !important;
    }
    .back-button:hover {
      border-color: #00bcd4 !important;
      color: #00bcd4 !important;
      background-color: rgba(0, 188, 212, 0.1) !important;
    }
    .verification-input:focus {
      border-color: #00bcd4 !important;
      box-shadow: 0 0 20px rgba(0, 188, 212, 0.3) !important;
    }
    .resend-button:hover:not(:disabled) {
      background-color: #00acc1 !important;
      transform: translateY(-2px) !important;
    }
    @keyframes pulse {
      0%, 100% {
         transform: scale(1);
        opacity: 1;
      }
      50% {
         transform: scale(1.05);
        opacity: 0.8;
      }
    }
  `

  const renderMainLogin = () => (
    <>
      <h1 style={styles.title}>Welcome Back</h1>
      <p style={styles.subtitle}>Sign in to your account to continue</p>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <div style={styles.inputContainer}>
            <Phone size={20} style={styles.inputIcon} className="input-icon" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={styles.input}
              className="login-input"
              required
            />
          </div>
        </div>
        <div style={styles.inputGroup}>
          <div style={styles.inputContainer}>
            <Lock size={20} style={styles.inputIcon} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.passwordInput}
              className="login-input"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={styles.passwordToggle}
              className="password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading} style={styles.loginButton} className="login-button">
          {isLoading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={styles.loadingSpinner}></div>
              Logging in...
            </span>
          ) : (
            "Log In"
          )}
        </button>
      </form>
      <div style={styles.linkText}>
        <span onClick={() => setShowForgotPassword(true)} style={styles.link} className="link">
          Forgot your password?
        </span>
      </div>
      <div style={styles.linkText}>
        {"Don't have an account? "}
        <Link href="/signup" style={styles.link} className="link">
          Sign up
        </Link>
      </div>
    </>
  )

  const renderForgotPasswordForm = () => (
    <>
      <div style={styles.forgotPasswordContainer}>
        <div style={styles.forgotPasswordIcon}>
          <MessageSquare size={32} color="#00bcd4" />
        </div>
        <h1 style={styles.title}>Forgot Password?</h1>
        <p style={styles.subtitle}>Enter your phone number to receive a verification code</p>
      </div>
      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <div style={styles.inputContainer}>
            <Phone size={20} style={styles.inputIcon} />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={resetPhoneNumber}
              onChange={(e) => setResetPhoneNumber(e.target.value)}
              style={styles.input}
              className="login-input"
              required
            />
          </div>
        </div>
        <button onClick={handleForgotPassword} disabled={isLoading} style={styles.loginButton} className="login-button">
          {isLoading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={styles.loadingSpinner}></div>
              Sending Code...
            </span>
          ) : (
            "Send Verification Code"
          )}
        </button>
        <button onClick={resetForgotPassword} style={styles.backButton} className="back-button">
          Back to Login
        </button>
      </div>
    </>
  )

  const renderSMSVerification = () => (
    <>
      <div style={styles.forgotPasswordContainer}>
        <div style={styles.forgotPasswordIcon}>
          <MessageSquare size={32} color="#00bcd4" />
        </div>
        <h1 style={styles.title}>Enter Verification Code</h1>
        <p style={styles.subtitle}>We sent an SMS verification code to</p>
        <div style={styles.phoneNumberDisplay}>{resetPhoneNumber}</div>
      </div>
      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              if (value.length <= 6) {
                setVerificationCode(value)
              }
            }}
            style={styles.verificationInput}
            className="verification-input"
            maxLength={6}
          />
        </div>
        <div style={styles.timerContainer}>
          <Clock size={16} color={timer > 0 ? "#eab308" : "#22c55e"} />
          <span style={styles.timerText}>{timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend available"}</span>
        </div>
        <button
          onClick={handleVerifyCode}
          disabled={isLoading || verificationCode.length !== 6}
          style={{
            ...styles.loginButton,
            opacity: isLoading || verificationCode.length !== 6 ? 0.6 : 1,
          }}
          className="login-button"
        >
          {isLoading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={styles.loadingSpinner}></div>
              Verifying...
            </span>
          ) : (
            "Verify Code"
          )}
        </button>
        <button onClick={handleResendCode} disabled={!canResend} style={styles.resendButton} className="resend-button">
          Resend SMS
        </button>
        <button onClick={resetForgotPassword} style={styles.backButton} className="back-button">
          Back to Login
        </button>
      </div>
    </>
  )

  const renderSuccess = () => (
    <div style={styles.successContainer}>
      <div style={styles.successIcon}>
        <CheckCircle size={40} color="#22c55e" />
      </div>
      <h1 style={styles.successTitle}>Success!</h1>
      <p style={styles.successMessage}>Password reset instructions have been sent to your phone.</p>
      <p style={styles.successMessage}>Returning to login page in 3 seconds...</p>
    </div>
  )

  return (
    <div style={styles.container}>
      <style>{mediaQueryStyles}</style>
      {/* Back to Home Button */}
      <Link href="/" style={styles.backToHome} className="back-to-home">
        <ArrowLeft size={16} />
        Back to Home
      </Link>
      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div></div> {/* Empty div to push the button to the right */}
          <Link href="/signup" style={styles.navLogin} className="nav-login">
            Sign Up
          </Link>
        </div>
      </nav>
      <main style={styles.mainContent}>
        <div style={styles.background}></div>
        <div style={styles.overlay}></div>
        <div style={styles.loginCard}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon} className="logo-icon-responsive">
              <Fish size={40} color="#00bcd4" />
            </div>
            <span style={styles.logoText} className="logo-text-responsive">
              AquaTech
            </span>
          </div>
          {showSuccess
            ? renderSuccess()
            : showForgotPassword
              ? isCodeSent
                ? renderSMSVerification()
                : renderForgotPasswordForm()
              : renderMainLogin()}
        </div>
      </main>
      <Footer />
    </div>
  )
}