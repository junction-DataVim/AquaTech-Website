"use client"

import { useState } from "react"

import type React from "react"
import { useRouter } from "next/navigation"
import {
  Fish,
  User,
  Phone,
  MapPin,
  Building,
  Camera,
  Edit,
  Save,
  X,
  Calendar,
  Thermometer,
  Droplets,
  Activity,
  AlertCircle,
  LayoutDashboard,
  History,
  Star,
  Microscope,
  Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BasinsCarousel from "@/components/BasinsCarousel" // Import BasinsCarousel component

// Sidebar items - can be fetched from database
const sidebarItems = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: 2, name: "Pools Dashboard", href: "/pools", icon: Droplets },
  { id: 3, name: "History", href: "/history", icon: History },
  { id: 4, name: "Recommendations", href: "/recommendations", icon: Star },
  { id: 5, name: "Bacteria Testing", href: "/bacteria", icon: Microscope },
  { id: 6, name: "Settings", href: "/settings", icon: Settings },
  { id: 7, name: "Profile", href: "/profile", icon: User },
]

// User profile - fetch from your authentication system
const initialUserProfile = {
  id: 1,
  username: "Ilafe Namra Hamdat",
  email: "ilafe.hamdat@aquatech.dz",
  phone: "+213 555 0123",
  farmName: "Mediterranean Aquaculture Farm",
  location: "Algiers, Algeria",
  profilePic: null,
}

// Add Basin Modal Component
const AddBasinModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    fishCount: "",
    fishSpecies: "",
    waterTemperature: "",
    phLevel: "",
    oxygenLevel: "",
    feedingSchedule: "",
    lastCleaning: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Basin name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.capacity || Number(formData.capacity) <= 0) newErrors.capacity = "Valid capacity is required"
    if (!formData.fishCount || Number(formData.fishCount) < 0) newErrors.fishCount = "Valid fish count is required"
    if (!formData.fishSpecies.trim()) newErrors.fishSpecies = "Fish species is required"
    if (!formData.waterTemperature || Number(formData.waterTemperature) < 0)
      newErrors.waterTemperature = "Valid temperature is required"
    if (!formData.phLevel || Number(formData.phLevel) < 0 || Number(formData.phLevel) > 14)
      newErrors.phLevel = "pH level must be between 0-14"
    if (!formData.oxygenLevel || Number(formData.oxygenLevel) < 0 || Number(formData.oxygenLevel) > 100)
      newErrors.oxygenLevel = "Oxygen level must be between 0-100%"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const basinData = {
        ...formData,
        id: Date.now(),
        capacity: Number.parseInt(formData.capacity),
        fishCount: Number.parseInt(formData.fishCount),
        fishSpecies: formData.fishSpecies,
        waterTemperature: Number.parseFloat(formData.waterTemperature),
        phLevel: Number.parseFloat(formData.phLevel),
        oxygenLevel: Number.parseFloat(formData.oxygenLevel),
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      }
      onSubmit(basinData)
      setFormData({
        name: "",
        location: "",
        capacity: "",
        fishCount: "",
        fishSpecies: "",
        waterTemperature: "",
        phLevel: "",
        oxygenLevel: "",
        feedingSchedule: "",
        lastCleaning: "",
        notes: "",
      })
      setErrors({})
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      location: "",
      capacity: "",
      fishCount: "",
      fishSpecies: "",
      waterTemperature: "",
      phLevel: "",
      oxygenLevel: "",
      feedingSchedule: "",
      lastCleaning: "",
      notes: "",
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  const styles = {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem",
    },
    modal: {
      backgroundColor: "#2d3748",
      borderRadius: "16px",
      padding: "2rem",
      width: "100%",
      maxWidth: "600px",
      maxHeight: "90vh",
      overflowY: "auto" as const,
      border: "1px solid #4a5568",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#00bcd4",
      margin: 0,
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "#9ca3af",
      cursor: "pointer",
      padding: "0.5rem",
      borderRadius: "50%",
      transition: "all 0.3s ease",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.5rem",
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#d1d5db",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    input: {
      width: "100%",
      backgroundColor: "#374151",
      border: "2px solid #4a5568",
      borderRadius: "8px",
      padding: "12px",
      color: "white",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      outline: "none",
    },
    inputError: {
      borderColor: "#ef4444",
    },
    textarea: {
      width: "100%",
      backgroundColor: "#374151",
      border: "2px solid #4a5568",
      borderRadius: "8px",
      padding: "12px",
      color: "white",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      outline: "none",
      minHeight: "80px",
      resize: "vertical" as const,
    },
    select: {
      width: "100%",
      backgroundColor: "#374151",
      border: "2px solid #4a5568",
      borderRadius: "8px",
      padding: "12px",
      color: "white",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      outline: "none",
    },
    error: {
      color: "#ef4444",
      fontSize: "0.75rem",
      marginTop: "0.25rem",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      justifyContent: "flex-end",
      marginTop: "1rem",
    },
    button: {
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    cancelButton: {
      backgroundColor: "#6b7280",
      color: "white",
    },
    submitButton: {
      backgroundColor: "#00bcd4",
      color: "#1a1a1a",
    },
  }

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Basin</h2>
          <button
            style={styles.closeButton}
            onClick={handleClose}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a5568")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <X size={24} />
          </button>
        </div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <Building size={16} />
                Basin Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.name ? "#ef4444" : "#4a5568")}
                placeholder="e.g., Basin Alpha"
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <MapPin size={16} />
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.location ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.location ? "#ef4444" : "#4a5568")}
                placeholder="e.g., Section A, Pond 1"
              />
              {errors.location && <span style={styles.error}>{errors.location}</span>}
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <Droplets size={16} />
                Capacity (Liters) *
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.capacity ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.capacity ? "#ef4444" : "#4a5568")}
                placeholder="e.g., 50000"
                min="1"
              />
              {errors.capacity && <span style={styles.error}>{errors.capacity}</span>}
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <Fish size={16} />
                Fish Count *
              </label>
              <input
                type="number"
                value={formData.fishCount}
                onChange={(e) => handleInputChange("fishCount", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.fishCount ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.fishCount ? "#ef4444" : "#4a5568")}
                placeholder="e.g., 1250"
                min="0"
              />
              {errors.fishCount && <span style={styles.error}>{errors.fishCount}</span>}
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <Fish size={16} />
              Fish Species *
            </label>
            <select
              value={formData.fishSpecies}
              onChange={(e) => handleInputChange("fishSpecies", e.target.value)}
              style={{
                ...styles.select,
                ...(errors.fishSpecies ? styles.inputError : {}),
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.fishSpecies ? "#ef4444" : "#4a5568")}
            >
              <option value="">Select fish species</option>
              <option value="Salmon">Salmon</option>
              <option value="Trout">Trout</option>
              <option value="Bass">Bass</option>
              <option value="Tilapia">Tilapia</option>
              <option value="Carp">Carp</option>
              <option value="Catfish">Catfish</option>
              <option value="Other">Other</option>
            </select>
            {errors.fishSpecies && <span style={styles.error}>{errors.fishSpecies}</span>}
          </div>
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <Thermometer size={16} />
                Water Temperature (°C) *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.waterTemperature}
                onChange={(e) => handleInputChange("waterTemperature", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.waterTemperature ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.waterTemperature ? "#ef4444" : "#4a5568")}
                placeholder="e.g., 22.5"
                min="0"
              />
              {errors.waterTemperature && <span style={styles.error}>{errors.waterTemperature}</span>}
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <Activity size={16} />
                pH Level *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.phLevel}
                onChange={(e) => handleInputChange("phLevel", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.phLevel ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.phLevel ? "#ef4444" : "#4a5568")}
                placeholder="e.g., 7.2"
                min="0"
                max="14"
              />
              {errors.phLevel && <span style={styles.error}>{errors.phLevel}</span>}
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <Droplets size={16} />
                Oxygen Level (%) *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.oxygenLevel}
                onChange={(e) => handleInputChange("oxygenLevel", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.oxygenLevel ? styles.inputError : {}),
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.oxygenLevel ? "#ef4444" : "#4a5568")}
                placeholder="e.g., 85.5"
                min="0"
                max="100"
              />
              {errors.oxygenLevel && <span style={styles.error}>{errors.oxygenLevel}</span>}
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                <Calendar size={16} />
                Feeding Schedule
              </label>
              <select
                value={formData.feedingSchedule}
                onChange={(e) => handleInputChange("feedingSchedule", e.target.value)}
                style={styles.select}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4a5568")}
              >
                <option value="">Select feeding schedule</option>
                <option value="2x daily">2x Daily</option>
                <option value="3x daily">3x Daily</option>
                <option value="4x daily">4x Daily</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <Calendar size={16} />
              Last Cleaning Date
            </label>
            <input
              type="date"
              value={formData.lastCleaning}
              onChange={(e) => handleInputChange("lastCleaning", e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#4a5568")}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <AlertCircle size={16} />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              style={styles.textarea}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#4a5568")}
              placeholder="Additional notes about this basin..."
            />
          </div>
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleClose}
              style={{ ...styles.button, ...styles.cancelButton }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5b6470")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6b7280")}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.submitButton }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00acc1")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00bcd4")}
            >
              Add Basin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Footer Component
const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#1a1a1a",
      borderTop: "1px solid #2d3748",
      padding: "3rem 0",
      marginTop: "4rem",
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
      width: "40px",
      height: "40px",
      backgroundColor: "#00bcd4",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      marginLeft: "12px",
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "white",
    },
    footerText: {
      color: "#9ca3af",
      textAlign: "center" as const,
      fontSize: "0.875rem",
    },
    footerSubtext: {
      color: "#6b7280",
      fontSize: "0.75rem",
      marginTop: "0.5rem",
    },
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
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
  )
}

// Unified Profile Card Component
const UnifiedProfileCard = ({
  user,
  isEditing,
  setIsEditing,
  handleInputChange,
  handleSaveChanges,
  handleProfilePicChange,
}: {
  user: any
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
  handleInputChange: (field: string, value: string) => void
  handleSaveChanges: () => void
  handleProfilePicChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const styles = {
    card: {
      backgroundColor: "#2d3748",
      borderRadius: "16px",
      padding: "2rem",
      marginBottom: "2rem",
      border: "1px solid #4a5568",
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      marginBottom: "2rem",
    },
    profilePicContainer: {
      position: "relative" as const,
      flexShrink: 0,
    },
    profilePic: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "#4a5568",
      border: "3px solid #00bcd4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden",
    },
    profilePicImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    profilePicOverlay: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    hiddenInput: {
      display: "none",
    },
    userInfoSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    },
    userName: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "white",
      marginBottom: "0.5rem",
    },
    userSubtitle: {
      color: "#9ca3af",
      fontSize: "1rem",
      marginBottom: "1rem",
    },
    editButton: {
      backgroundColor: isEditing ? "#22c55e" : "#00bcd4",
      color: isEditing ? "white" : "#1a1a1a",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      alignSelf: "flex-start",
    },
    detailsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
    },
    detailSection: {
      backgroundColor: "#374151",
      borderRadius: "12px",
      padding: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#00bcd4",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    fieldRow: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.75rem",
      marginBottom: "1rem",
    },
    fieldLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.875rem",
      color: "#9ca3af",
      fontWeight: "500",
    },
    fieldValue: {
      fontSize: "1rem",
      color: "white",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      backgroundColor: "#2d3748",
      border: "2px solid #4a5568",
      borderRadius: "8px",
      padding: "10px 12px",
      color: "white",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      outline: "none",
    },
  }

  return (
    <div style={styles.card}>
      <div style={styles.profileHeader}>
        <div style={styles.profilePicContainer}>
          <label
            style={styles.profilePic}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector(".profile-pic-overlay") as HTMLElement
              if (overlay) overlay.style.opacity = "1"
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector(".profile-pic-overlay") as HTMLElement
              if (overlay) overlay.style.opacity = "0"
            }}
          >
            {user.profilePic ? (
              <img src={user.profilePic || "/placeholder.svg"} alt="Profile" style={styles.profilePicImage} />
            ) : (
              <User size={40} color="#9ca3af" />
            )}
            <div style={styles.profilePicOverlay} className="profile-pic-overlay">
              <Camera size={24} color="white" />
            </div>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} style={styles.hiddenInput} />
          </label>
        </div>
        <div style={styles.userInfoSection}>
          <h2 style={styles.userName}>{user.username}</h2>
          <p style={styles.userSubtitle}>
            {user.farmName} • {user.location}
          </p>
          <button
            onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
            style={styles.editButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            {isEditing ? (
              <>
                <Save size={16} />
                Save Changes
              </>
            ) : (
              <>
                <Edit size={16} />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>
      <div style={styles.detailsGrid}>
        {/* Personal Information Section */}
        <div style={styles.detailSection}>
          <h3 style={styles.sectionTitle}>
            <User size={20} />
            Personal Information
          </h3>
          <div style={styles.fieldRow}>
            <div style={styles.fieldLabel}>
              <User size={16} />
              Username
            </div>
            {isEditing ? (
              <input
                type="text"
                value={user.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                style={styles.input}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4a5568")}
              />
            ) : (
              <div style={styles.fieldValue}>{user.username}</div>
            )}
          </div>
          <div style={styles.fieldRow}>
            <div style={styles.fieldLabel}>
              <Phone size={16} />
              Phone Number
            </div>
            {isEditing ? (
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                style={styles.input}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4a5568")}
              />
            ) : (
              <div style={styles.fieldValue}>{user.phone}</div>
            )}
          </div>
        </div>
        {/* Farm Information Section */}
        <div style={styles.detailSection}>
          <h3 style={styles.sectionTitle}>
            <Building size={20} />
            Farm Information
          </h3>
          <div style={styles.fieldRow}>
            <div style={styles.fieldLabel}>
              <Building size={16} />
              Farm Name
            </div>
            {isEditing ? (
              <input
                type="text"
                value={user.farmName}
                onChange={(e) => handleInputChange("farmName", e.target.value)}
                style={styles.input}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4a5568")}
              />
            ) : (
              <div style={styles.fieldValue}>{user.farmName}</div>
            )}
          </div>
          <div style={styles.fieldRow}>
            <div style={styles.fieldLabel}>
              <MapPin size={16} />
              Location
            </div>
            {isEditing ? (
              <input
                type="text"
                value={user.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                style={styles.input}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00bcd4")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4a5568")}
              />
            ) : (
              <div style={styles.fieldValue}>{user.location}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Profile Page Component
export default function ProfilePage() {
  const router = useRouter()

  // State
  const [activeSidebar, setActiveSidebar] = useState("Profile")
  const [user, setUser] = useState<any>(initialUserProfile)
  const [basins, setBasins] = useState<any[]>([
    {
      id: 1,
      name: "Basin Alpha",
      location: "Section A – Pond 1",
      capacity: 50_000,
      fishCount: 1250,
      fishSpecies: "Salmon",
      waterTemperature: 16.5,
      phLevel: 7.2,
      oxygenLevel: 88.5,
      feedingSchedule: "3x daily",
      lastCleaning: "2024-01-10",
      createdAt: "2024-01-01T00:00:00Z",
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 min ago
    },
    {
      id: 2,
      name: "Basin Beta",
      location: "Section B – Pond 2",
      capacity: 35_000,
      fishCount: 980,
      fishSpecies: "Trout",
      waterTemperature: 14.8,
      phLevel: 7.0,
      oxygenLevel: 82.3,
      feedingSchedule: "2x daily",
      lastCleaning: "2024-01-08",
      createdAt: "2024-01-05T00:00:00Z",
      lastUpdated: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
    },
  ])
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Handlers
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setUser((u: any) => ({ ...u, profilePic: URL.createObjectURL(file) }))
  }
  const handleInputChange = (field: string, value: string) => setUser((u: any) => ({ ...u, [field]: value }))

  const addBasin = (b: any) => setBasins((prev) => [...prev, b])

  const navigate = (item: string, href: string) => {
    setActiveSidebar(item)
    if (item === "Dashboard") {
      router.push("/dashboard")
    } else if (item === "Pools Dashboard") {
      sessionStorage.setItem("selectedSidebarItem", "Pools Dashboard")
      router.push("/dashboard")
    } else if (item === "History") {
      sessionStorage.setItem("selectedSidebarItem", "History")
      router.push("/dashboard")
    } else if (item === "Recommendations") {
      sessionStorage.setItem("selectedSidebarItem", "Recommendations")
      router.push("/dashboard")
    } else if (item === "Bacteria Testing") {
      sessionStorage.setItem("selectedSidebarItem", "Bacteria Testing")
      router.push("/dashboard")
    } else if (item === "Settings") {
      sessionStorage.setItem("selectedSidebarItem", "Settings")
      router.push("/dashboard")
    }
    // Profile stays on the same page
  }

  // Layout & Render
  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col bg-gray-800 shadow-lg">
          <div className="border-b border-gray-700 p-6">
            <h1 className="text-lg font-bold">AquaCulture Monitor</h1>
            <p className="text-xs text-gray-400">Farm Management System</p>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {sidebarItems.map((it) => {
              const Icon = it.icon
              const active = activeSidebar === it.name
              return (
                <button
                  key={it.id}
                  onClick={() => navigate(it.name, it.href)}
                  className={`flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition ${
                    active ? "bg-sky-400 text-gray-900" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {it.name}
                </button>
              )
            })}
          </nav>

          <div className="border-t border-gray-700 p-4">
            <button
              onClick={() => setActiveSidebar("Profile")}
              className="flex w-full items-center gap-3 rounded-md p-2 transition hover:bg-gray-700"
            >
              <Avatar className="h-8 w-8">
                {user.profilePic ? (
                  <AvatarImage src={user.profilePic || "/placeholder.svg"} />
                ) : (
                  <AvatarFallback>
                    {user.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-left leading-none">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="mb-6 text-3xl font-bold text-sky-400">Profile Management</h1>

          {/* Unified Profile Card */}
          <UnifiedProfileCard
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleInputChange={handleInputChange}
            handleSaveChanges={() => setIsEditing(false)}
            handleProfilePicChange={handleProfilePicChange}
          />

          {/* Basins Carousel */}
          <BasinsCarousel basins={basins} onAdd={() => setShowModal(true)} />
        </main>
      </div>

      {/* Modal for New Basin */}
      <AddBasinModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={addBasin} />
    </>
  )
}
