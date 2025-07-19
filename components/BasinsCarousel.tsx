"use client"
import { useState } from "react"
import { Plus } from "lucide-react"

const BasinsCarousel = ({ basins, onAdd }: { basins: any[]; onAdd: () => void }) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scrollLeft = () => {
    const element = document.getElementById("basins-carousel")
    if (element) {
      element.scrollLeft -= 300
      setScrollPosition(element.scrollLeft)
    }
  }

  const scrollRight = () => {
    const element = document.getElementById("basins-carousel")
    if (element) {
      element.scrollLeft += 300
      setScrollPosition(element.scrollLeft)
    }
  }

  const styles = {
    carouselContainer: {
      position: "relative" as const,
      overflowX: "auto" as const,
      scrollBehavior: "smooth" as const,
      WebkitOverflowScrolling: "touch" as const,
      paddingBottom: "1rem",
    },
    carousel: {
      display: "flex",
      gap: "1rem",
      padding: "1rem",
    },
    basinCard: {
      backgroundColor: "rgba(45, 55, 72, 0.5)",
      backdropFilter: "blur(4px)",
      borderRadius: "12px",
      padding: "1.5rem",
      width: "300px",
      flexShrink: 0,
      border: "1px solid #4a5568",
      transition: "all 0.3s ease",
    },
    basinName: {
      fontSize: "1.125rem",
      fontWeight: "bold",
      color: "white",
      marginBottom: "0.5rem",
    },
    basinInfo: {
      fontSize: "0.875rem",
      color: "#d1d5db",
    },
    addButton: {
      backgroundColor: "#00bcd4",
      color: "#1a1a1a",
      padding: "1rem",
      borderRadius: "12px",
      width: "300px",
      flexShrink: 0,
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    scrollButton: {
      position: "absolute" as const,
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(26, 26, 26, 0.7)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.25rem",
      transition: "background-color 0.3s ease",
      zIndex: 10,
    },
    scrollButtonLeft: {
      left: "0.5rem",
    },
    scrollButtonRight: {
      right: "0.5rem",
    },
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Basins</h2>
      <div style={styles.carouselContainer} id="basins-carousel">
        {scrollPosition > 0 && (
          <button onClick={scrollLeft} style={{ ...styles.scrollButton, ...styles.scrollButtonLeft }}>
            {"<"}
          </button>
        )}
        <div style={styles.carousel}>
          {basins.map((basin) => (
            <div key={basin.id} style={styles.basinCard}>
              <h3 style={styles.basinName}>{basin.name}</h3>
              <p style={styles.basinInfo}>Location: {basin.location}</p>
              <p style={styles.basinInfo}>Capacity: {basin.capacity}L</p>
              <p style={styles.basinInfo}>Fish Count: {basin.fishCount}</p>
              <p style={styles.basinInfo}>Species: {basin.fishSpecies}</p>
            </div>
          ))}
          <button onClick={onAdd} style={styles.addButton}>
            <Plus size={20} />
            Add New Basin
          </button>
        </div>
        <button onClick={scrollRight} style={{ ...styles.scrollButton, ...styles.scrollButtonRight }}>
          {">"}
        </button>
      </div>
    </div>
  )
}

export default BasinsCarousel
