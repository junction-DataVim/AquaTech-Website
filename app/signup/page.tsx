"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Fish,
  User,
  Phone,
  Lock,
  Check,
  X,
  ArrowLeft,
  Eye,
  EyeOff,
  RefreshCw,
  Smartphone,
  CheckCircle,
} from "lucide-react"

// Footer Component (copied from login page)
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

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+213", country: "DZ", flag: "🇩🇿" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
]

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    username: "",
    countryCode: "+213",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    smsCode: ["", "", "", "", "", ""],
  })

  const [validation, setValidation] = useState({
    username: { isValid: false, message: "" },
    phoneNumber: { isValid: false, message: "" },
    password: { isValid: false, message: "", strength: 0 },
    confirmPassword: { isValid: false, message: "" },
    smsCode: { isValid: false, message: "" },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [smsTimer, setSmsTimer] = useState(0)
  const [focusedField, setFocusedField] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const smsInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // SMS Timer Effect
  useEffect(() => {
    if (smsTimer > 0) {
      timerRef.current = setTimeout(() => setSmsTimer(smsTimer - 1), 1000)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [smsTimer])

  // Validation Functions
  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return { isValid: false, message: "Username must be at least 3 characters" }
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { isValid: false, message: "Username can only contain letters, numbers, and underscores" }
    }
    return { isValid: true, message: "Username looks good!" }
  }

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length < 8) {
      return { isValid: false, message: "Phone number is too short" }
    }
    if (cleaned.length > 15) {
      return { isValid: false, message: "Phone number is too long" }
    }
    return { isValid: true, message: "Phone number is valid" }
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 15
    if (/[^A-Za-z0-9]/.test(password)) strength += 10
    return Math.min(strength, 100)
  }

  const validatePassword = (password: string) => {
    const strength = calculatePasswordStrength(password)
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters", strength }
    }
    if (strength < 50) {
      return { isValid: false, message: "Password is too weak", strength }
    }
    return { isValid: true, message: "Strong password!", strength }
  }

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (confirmPassword !== password) {
      return { isValid: false, message: "Passwords do not match" }
    }
    if (confirmPassword.length === 0) {
      return { isValid: false, message: "Please confirm your password" }
    }
    return { isValid: true, message: "Passwords match!" }
  }

  // Input Handlers
  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)

    // Real-time validation
    const newValidation = { ...validation }
    switch (field) {
      case "username":
        newValidation.username = validateUsername(value)
        break
      case "phoneNumber":
        newValidation.phoneNumber = validatePhoneNumber(value)
        break
      case "password":
        newValidation.password = validatePassword(value)
        newValidation.confirmPassword = validateConfirmPassword(newFormData.confirmPassword, value)
        break
      case "confirmPassword":
        newValidation.confirmPassword = validateConfirmPassword(value, newFormData.password)
        break
    }
    setValidation(newValidation)
  }

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-")
    }
    return value
  }

  const handleSmsCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newSmsCode = [...formData.smsCode]
    newSmsCode[index] = value
    setFormData({ ...formData, smsCode: newSmsCode })

    // Auto-focus next input
    if (value && index < 5) {
      smsInputRefs.current[index + 1]?.focus()
    }

    // Validate SMS code
    const isComplete = newSmsCode.every((digit) => digit !== "")
    setValidation({
      ...validation,
      smsCode: {
        isValid: isComplete,
        message: isComplete ? "Verification code complete" : "Enter 6-digit code",
      },
    })
  }

  const sendSmsCode = () => {
    setSmsTimer(60)
    // Simulate API call
    setTimeout(() => {
      alert("SMS code sent to your phone!")
    }, 500)
  }

  const nextStep = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentStep(currentStep + 1)
      setIsLoading(false)
      if (currentStep === 2) {
        sendSmsCode()
      }
    }, 1000)
  }

  // Update the completeSignup function to redirect to profile instead of login
  const completeSignup = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsComplete(true)
      setIsLoading(false)
      setTimeout(() => {
        router.push("/profile") // Changed from "/login" to "/profile"
      }, 3000)
    }, 2000)
  }

  const canProceedStep1 = validation.username.isValid && validation.phoneNumber.isValid
  const canProceedStep2 = validation.password.isValid && validation.confirmPassword.isValid
  const canProceedStep3 = validation.smsCode.isValid

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      color: "white",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative" as const,
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
    nav: {
      position: "fixed" as const,
      top: 0,
      left: 0,
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
    navLeft: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
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
    navArrow: {
      background: "none",
      border: "none",
      color: "#00bcd4",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      marginRight: "4px",
      fontSize: "1.25rem",
      transition: "background 0.2s",
    },
    card: {
      backgroundColor: "rgba(26, 26, 26, 0.8)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "3rem",
      width: "100%",
      maxWidth: "450px",
      margin: "80px 1rem 0 1rem",
      position: "relative" as const,
      zIndex: 5,
      border: "2px solid transparent",
      background:
        "linear-gradient(rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.8)) padding-box, linear-gradient(135deg, #00bcd4, #00acc1, #0097a7) border-box",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 188, 212, 0.2)",
      marginBottom: "2.5rem", // Added space below the card
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
    inputIcon: {
      position: "absolute" as const,
      left: "16px",
      zIndex: 1,
      color: "#9ca3af",
      transition: "color 0.3s ease",
    },
    floatingLabel: {
      position: "absolute" as const,
      left: "50px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "rgba(255, 255, 255, 0.6)",
      transition: "all 0.3s ease",
      pointerEvents: "none" as const,
      fontSize: "1rem",
    },
    floatingLabelActive: {
      top: "8px",
      fontSize: "0.75rem",
      color: "#667eea",
    },
    phoneContainer: {
      display: "flex",
      gap: "0.5rem",
    },
    countrySelect: {
      backgroundColor: "rgba(45, 55, 72, 0.8)",
      border: "2px solid #4a5568",
      borderRadius: "12px",
      padding: "16px 12px",
      color: "white",
      fontSize: "1rem",
      outline: "none",
      cursor: "pointer",
      minWidth: "100px",
    },
    phoneInput: {
      flex: 1,
      backgroundColor: "rgba(45, 55, 72, 0.8)",
      border: "2px solid #4a5568",
      borderRadius: "12px",
      padding: "16px 16px 16px 50px",
      color: "white",
      fontSize: "1rem",
      outline: "none",
    },
    passwordToggle: {
      position: "absolute" as const,
      right: "16px",
      cursor: "pointer",
      color: "#9ca3af",
      transition: "color 0.3s ease",
    },
    strengthBar: {
      width: "100%",
      height: "4px",
      backgroundColor: "rgba(0, 188, 212, 0.1)",
      borderRadius: "2px",
      overflow: "hidden",
    },
    strengthFill: {
      height: "100%",
      borderRadius: "2px",
      transition: "all 0.3s ease",
    },
    smsContainer: {
      display: "flex",
      gap: "0.5rem",
      justifyContent: "center",
    },
    smsInput: {
      width: "48px",
      height: "48px",
      backgroundColor: "rgba(0, 188, 212, 0.1)",
      border: "2px solid #00bcd4",
      borderRadius: "8px",
      textAlign: "center" as const,
      color: "white",
      fontSize: "1.25rem",
      fontWeight: "bold",
      outline: "none",
      transition: "all 0.3s ease",
    },
    resendContainer: {
      textAlign: "center" as const,
      marginTop: "1rem",
    },
    resendButton: {
      background: "none",
      border: "none",
      color: "#00bcd4",
      cursor: "pointer",
      fontSize: "0.875rem",
      textDecoration: "underline",
      transition: "color 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    timerText: {
      color: "#9ca3af",
      fontSize: "0.875rem",
    },
    button: {
      backgroundColor: "#00bcd4",
      color: "#1a1a1a",
      border: "none",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "1.125rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "1rem",
      boxShadow: "0 10px 30px rgba(0, 188, 212, 0.3)",
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
    successContainer: {
      textAlign: "center" as const,
      padding: "2rem",
    },
    successIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(0, 188, 212, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem",
      border: "3px solid #00bcd4",
      boxShadow: "0 0 30px rgba(0, 188, 212, 0.4)",
      animation: "bounce 0.6s ease-in-out",
    },
    successTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
      marginBottom: "0.5rem",
    },
    successMessage: {
      color: "#d1d5db",
      marginBottom: "1rem",
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
    progressContainer: {
      marginBottom: "3rem",
      padding: "0 1rem",
    },
    stepperContainer: {
      position: "relative" as const,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
    },
    stepperLine: {
      position: "absolute" as const,
      top: "20px",
      left: "20px",
      right: "20px",
      height: "2px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      zIndex: 1,
    },
    stepperProgress: {
      height: "100%",
      background: "linear-gradient(90deg, #00bcd4, #0097a7)",
      borderRadius: "1px",
      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      width: `${((currentStep - 1) / 2) * 100}%`,
    },
    stepWrapper: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      position: "relative" as const,
      zIndex: 2,
      flex: 1,
    },
    stepCircle: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.875rem",
      fontWeight: "bold",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "2px solid",
      backgroundColor: "rgba(26, 26, 26, 0.9)",
      marginBottom: "0.75rem",
    },
    stepCircleInactive: {
      borderColor: "#4a5568",
      color: "#9ca3af",
      backgroundColor: "rgba(26, 26, 26, 0.9)",
    },
    stepCircleActive: {
      borderColor: "#00bcd4",
      color: "#00bcd4",
      backgroundColor: "rgba(0, 188, 212, 0.1)",
      boxShadow: "0 0 20px rgba(0, 188, 212, 0.4)",
      transform: "scale(1.1)",
    },
    stepCircleCompleted: {
      borderColor: "#00bcd4",
      backgroundColor: "#00bcd4",
      color: "white",
      boxShadow: "0 0 15px rgba(0, 188, 212, 0.3)",
    },
    stepLabel: {
      fontSize: "0.75rem",
      fontWeight: "500",
      textAlign: "center" as const,
      transition: "all 0.3s ease",
      minHeight: "20px",
    },
    stepLabelInactive: {
      color: "rgba(255, 255, 255, 0.4)",
    },
    stepLabelActive: {
      color: "#00bcd4",
      fontWeight: "600",
      transform: "translateY(-2px)",
    },
    stepLabelCompleted: {
      color: "#00bcd4",
      fontWeight: "600",
    },
    validationMessage: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      marginTop: "0.5rem",
    },
    strengthMeter: {
      marginTop: "0.5rem",
    },
    strengthText: {
      fontSize: "0.75rem",
      marginTop: "0.25rem",
      fontWeight: "500",
    },
  }

  const mediaQueryStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-30px) rotate(120deg); }
      66% { transform: translateY(-20px) rotate(240deg); }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
      40%, 43% { transform: translateY(-20px); }
      70% { transform: translateY(-10px); }
      90% { transform: translateY(-4px); }
    }
    .input-focused {
      border-color: #667eea !important;
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.3) !important;
    }
    .input-valid {
      border-color: #22c55e !important;
    }
    .input-invalid {
      border-color: #ef4444 !important;
    }
    .back-to-home:hover {
      background-color: rgba(0, 188, 212, 0.2) !important;
      transform: scale(1.05) !important;
      box-shadow: 0 0 30px rgba(0, 188, 212, 0.5) !important;
    }
    .button:hover:not(:disabled) {
      transform: translateY(-2px) !important;
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4) !important;
    }
    .button:disabled {
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }
    .sms-input:focus {
      border-color: #667eea !important;
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.3) !important;
    }
    .resend-button:hover {
      color: #764ba2 !important;
    }
    .password-toggle:hover {
      color: white !important;
    }
    @keyframes pulse-glow {
      0%, 100% {
         box-shadow: 0 0 20px rgba(0, 188, 212, 0.4);
        transform: scale(1);
      }
      50% {
         box-shadow: 0 0 30px rgba(0, 188, 212, 0.6);
        transform: scale(1.05);
      }
    }
    @keyframes pulse-step {
      0%, 100% {
         box-shadow: 0 0 20px rgba(0, 188, 212, 0.4);
      }
      50% {
         box-shadow: 0 0 30px rgba(0, 188, 212, 0.6);
      }
    }
    .step-active {
      animation: pulse-step 2s infinite;
    }
    @keyframes checkmark-in {
      0% {
        transform: scale(0) rotate(45deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) rotate(45deg);
        opacity: 1;
      }
      100% {
        transform: scale(1) rotate(45deg);
        opacity: 1;
      }
    }
    .checkmark-animate {
      animation: checkmark-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 25) return "#ef4444"
    if (strength < 50) return "#f97316"
    if (strength < 75) return "#eab308"
    return "#22c55e"
  }

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 25) return "Very Weak"
    if (strength < 50) return "Weak"
    if (strength < 75) return "Good"
    return "Strong"
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Create Account"
      case 2:
        return "Secure Your Account"
      case 3:
        return "Verify Your Phone"
      default:
        return "Sign Up"
    }
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "Enter your basic information"
      case 2:
        return "Choose a strong password"
      case 3:
        return "Enter the 6-digit code sent to your phone"
      default:
        return ""
    }
  }

  const getStepCircleStyle = (stepIndex: number) => {
    const baseStyle = styles.stepCircle
    if (stepIndex + 1 < currentStep) {
      return { ...baseStyle, ...styles.stepCircleCompleted }
    } else if (stepIndex + 1 === currentStep) {
      return { ...baseStyle, ...styles.stepCircleActive }
    } else {
      return { ...baseStyle, ...styles.stepCircleInactive }
    }
  }

  const getStepLabelStyle = (stepIndex: number) => {
    const baseStyle = styles.stepLabel
    if (stepIndex + 1 < currentStep) {
      return { ...baseStyle, ...styles.stepLabelCompleted }
    } else if (stepIndex + 1 === currentStep) {
      return { ...baseStyle, ...styles.stepLabelActive }
    } else {
      return { ...baseStyle, ...styles.stepLabelInactive }
    }
  }

  const renderStepContent = (stepIndex: number) => {
    if (stepIndex + 1 < currentStep) {
      return <Check size={20} className="checkmark-animate" />
    } else {
      return stepIndex + 1
    }
  }

  if (isComplete) {
    return (
      <div style={styles.container}>
        <style>{mediaQueryStyles}</style>
        <div style={styles.background}></div>
        <div style={styles.overlay}></div>
        <div style={styles.card}>
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>
              <CheckCircle size={40} color="white" />
            </div>
            <h1 style={styles.successTitle}>Welcome to AquaSense DZ!</h1>
            <p style={styles.successMessage}>
              Your account has been created successfully. You'll be redirected to the login page shortly.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={styles.container}>
        <style>{mediaQueryStyles}</style>
        <div style={styles.background}></div>
        <div style={styles.overlay}></div>
        {/* Floating Back Arrow */}
        <Link href="/" style={styles.backToHome} className="back-to-home" aria-label="Back to Home">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        {/* Navigation Bar */}
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            <div></div> {/* Empty div to push the button to the right */}
            <Link href="/login" style={styles.navLogin} className="nav-login">
              Log In
            </Link>
          </div>
        </nav>
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>
              <Fish size={30} color="white" />
            </div>
            <span style={styles.logoText}>AquaTech</span>
          </div>
          <div style={styles.progressContainer}>
            <div style={styles.stepperContainer}>
              <div style={styles.stepperLine}>
                <div style={styles.stepperProgress}></div>
              </div>
              {[
                "Info",
                "Security",
                "Verification"
              ].map((step, index) => (
                <div key={step} style={styles.stepWrapper}>
                  <div style={getStepCircleStyle(index)} className={index + 1 === currentStep ? "step-active" : ""}>
                    {renderStepContent(index)}
                  </div>
                  <span style={getStepLabelStyle(index)}>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <h1 style={styles.title}>{getStepTitle()}</h1>
          <p style={styles.subtitle}>{getStepSubtitle()}</p>
          <form style={styles.form}>
            {currentStep === 1 && (
              <>
                <div style={styles.inputGroup}>
                  <div style={styles.inputContainer}>
                    <User size={20} style={styles.inputIcon} />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField("")}
                      style={styles.input}
                      className={`${focusedField === "username" ? "input-focused" : ""} ${
                        validation.username.isValid
                          ? "input-valid"
                          : formData.username && !validation.username.isValid
                            ? "input-invalid"
                            : ""
                      }`}
                    />
                    <label
                      style={{
                        ...styles.floatingLabel,
                        ...(focusedField === "username" || formData.username ? styles.floatingLabelActive : {}),
                      }}
                    >
                      Username
                    </label>
                  </div>
                  {formData.username && (
                    <div
                      style={{
                        ...styles.validationMessage,
                        color: validation.username.isValid ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {validation.username.isValid ? <Check size={16} /> : <X size={16} />}
                      {validation.username.message}
                    </div>
                  )}
                </div>
                <div style={styles.inputGroup}>
                  <div style={styles.phoneContainer}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#232323',
                      borderRadius: '8px 0 0 8px',
                      padding: '0 12px',
                      fontSize: '1rem',
                      height: '48px',
                      border: '1px solid #333',
                      borderRight: 'none',
                    }}>
                      <span role="img" aria-label="Algeria flag">🇩🇿</span> +213
                    </div>
                    <div style={styles.inputContainer}>
                      <Phone size={20} style={styles.inputIcon} />
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value)
                          handleInputChange("phoneNumber", formatted)
                        }}
                        onFocus={() => setFocusedField("phoneNumber")}
                        onBlur={() => setFocusedField("")}
                        style={styles.phoneInput}
                        className={`${focusedField === "phoneNumber" ? "input-focused" : ""} ${
                          validation.phoneNumber.isValid
                            ? "input-valid"
                            : formData.phoneNumber && !validation.phoneNumber.isValid
                              ? "input-invalid"
                              : ""
                        }`}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  {formData.phoneNumber && (
                    <div
                      style={{
                        ...styles.validationMessage,
                        color: validation.phoneNumber.isValid ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {validation.phoneNumber.isValid ? <Check size={16} /> : <X size={16} />}
                      {validation.phoneNumber.message}
                    </div>
                  )}
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div style={styles.inputGroup}>
                  <div style={styles.inputContainer}>
                    <Lock size={20} style={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      style={styles.input}
                      className={`${focusedField === "password" ? "input-focused" : ""} ${
                        validation.password.isValid
                          ? "input-valid"
                          : formData.password && !validation.password.isValid
                            ? "input-invalid"
                            : ""
                      }`}
                    />
                    <label
                      style={{
                        ...styles.floatingLabel,
                        ...(focusedField === "password" || formData.password ? styles.floatingLabelActive : {}),
                      }}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={styles.passwordToggle}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formData.password && (
                    <>
                      <div style={styles.strengthMeter}>
                        <div style={styles.strengthBar}>
                          <div
                            style={{
                              ...styles.strengthFill,
                              width: `${validation.password.strength}%`,
                              backgroundColor: getPasswordStrengthColor(validation.password.strength),
                            }}
                          ></div>
                        </div>
                        <div
                          style={{
                            ...styles.strengthText,
                            color: getPasswordStrengthColor(validation.password.strength),
                          }}
                        >
                          {getPasswordStrengthText(validation.password.strength)}
                        </div>
                      </div>
                      <div
                        style={{
                          ...styles.validationMessage,
                          color: validation.password.isValid ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {validation.password.isValid ? <Check size={16} /> : <X size={16} />}
                        {validation.password.message}
                      </div>
                    </>
                  )}
                </div>
                <div style={styles.inputGroup}>
                  <div style={styles.inputContainer}>
                    <Lock size={20} style={styles.inputIcon} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField("")}
                      style={styles.input}
                      className={`${focusedField === "confirmPassword" ? "input-focused" : ""} ${
                        validation.confirmPassword.isValid
                          ? "input-valid"
                          : formData.confirmPassword && !validation.confirmPassword.isValid
                            ? "input-invalid"
                            : ""
                      }`}
                    />
                    <label
                      style={{
                        ...styles.floatingLabel,
                        ...(focusedField === "confirmPassword" || formData.confirmPassword
                          ? styles.floatingLabelActive
                          : {}),
                      }}
                    >
                      Confirm Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.passwordToggle}
                      className="password-toggle"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div
                      style={{
                        ...styles.validationMessage,
                        color: validation.confirmPassword.isValid ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {validation.confirmPassword.isValid ? <Check size={16} /> : <X size={16} />}
                      {validation.confirmPassword.message}
                    </div>
                  )}
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div style={styles.smsContainer}>
                  {formData.smsCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (smsInputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleSmsCodeChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && index > 0) {
                          smsInputRefs.current[index - 1]?.focus()
                        }
                      }}
                      style={styles.smsInput}
                      className="sms-input"
                    />
                  ))}
                </div>
                <div style={styles.resendContainer}>
                  {smsTimer > 0 ? (
                    <span style={styles.timerText}>Resend code in {smsTimer}s</span>
                  ) : (
                    <button type="button" onClick={sendSmsCode} style={styles.resendButton} className="resend-button">
                      <RefreshCw size={16} style={{ marginRight: "0.5rem" }} />
                      Resend Code
                    </button>
                  )}
                </div>
                {validation.smsCode.message && (
                  <div
                    style={{
                      ...styles.validationMessage,
                      color: validation.smsCode.isValid ? "#22c55e" : "#ef4444",
                      justifyContent: "center",
                    }}
                  >
                    {validation.smsCode.isValid ? <Check size={16} /> : <Smartphone size={16} />}
                    {validation.smsCode.message}
                  </div>
                )}
              </>
            )}
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && canProceedStep1) nextStep()
                else if (currentStep === 2 && canProceedStep2) nextStep()
                else if (currentStep === 3 && canProceedStep3) completeSignup()
              }}
              disabled={
                isLoading ||
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2) ||
                (currentStep === 3 && !canProceedStep3)
              }
              style={styles.button}
              className="button"
            >
              {isLoading ? <div style={styles.loadingSpinner}></div> : currentStep === 3 ? "Complete Signup" : "Continue"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
