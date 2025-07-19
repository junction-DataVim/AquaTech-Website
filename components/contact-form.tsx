"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwTOcF0GRM6xv66e839qVkMHZa0MN_ztjyw2qNvIlTU7BsUD8tr-i_mRKBENCpcccU_8g/exec"

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("message", formData.message)

      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      })

      alert("Message sent! We will get back to you soon.")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error!", error)
      try {
        const response = await fetch(scriptURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData),
        })
        alert("Message sent! We will get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
      } catch (secondError) {
        console.error("Second attempt failed:", secondError)
        alert("Error sending message. Please try again or contact us directly.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const styles = {
    contactForm: {
      backgroundColor: "rgba(45, 55, 72, 0.5)",
      backdropFilter: "blur(4px)",
      borderRadius: "16px",
      padding: "2rem",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    formInput: {
      width: "100%",
      backgroundColor: "rgba(55, 65, 81, 0.5)",
      border: "1px solid #4a5568",
      borderRadius: "8px",
      padding: "12px 16px",
      color: "white",
      fontSize: "1rem",
      transition: "border-color 0.2s ease",
    },
    formTextarea: {
      width: "100%",
      backgroundColor: "rgba(55, 65, 81, 0.5)",
      border: "1px solid #4a5568",
      borderRadius: "8px",
      padding: "12px 16px",
      color: "white",
      fontSize: "1rem",
      resize: "none" as const,
      transition: "border-color 0.2s ease",
    },
    formButton: {
      width: "100%",
      backgroundColor: "#00bcd4",
      color: "#1a1a1a",
      padding: "12px 24px",
      borderRadius: "8px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      opacity: isSubmitting ? 0.7 : 1,
    },
  }

  return (
    <>
      <style>{`
        .form-input:focus, .form-textarea:focus {
          outline: none !important;
          border-color: #00bcd4 !important;
        }
        .form-button:hover {
          background-color: #00acc1 !important;
          transform: scale(1.05) !important;
        }
        .form-input::placeholder, .form-textarea::placeholder {
          color: #9ca3af;
        }
      `}</style>
      <form onSubmit={handleSubmit} style={styles.contactForm}>
        <div style={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.formInput}
            className="form-input"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.formInput}
            className="form-input"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            style={styles.formTextarea}
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" style={styles.formButton} className="form-button" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  )
}
