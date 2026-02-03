const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "#e5e7eb",
    padding: "2rem",
  },
  card: {
    maxWidth: "720px",
    width: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    borderRadius: "16px",
    padding: "3rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#cbd5f5",
    marginBottom: "2rem",
  },
  separator: {
    width: "80px",
    height: "4px",
    backgroundColor: "#38bdf8",
    margin: "0 auto 2rem",
    borderRadius: "999px",
  },
  sectionSeparator: {
    width: "10%",
    height: "0.2px",
    backgroundColor: "rgba(148,163,184,0.18)",
    margin: "1px",
  },
  meta: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#e5e7eb",
  },


  button: {
    padding: "0.9rem 2.5rem",
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#00e5ff",
    color: "#00303a",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  gaze: {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#000",
  color: "#00e5ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
},

};

export default styles;