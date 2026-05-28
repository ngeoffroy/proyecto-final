const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `
    linear-gradient(135deg, rgba(15,23,42,0.85), rgba(2,6,23,0.85)),
    url('/img/background.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "",
    backgroundRepeat: "no-repeat",
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
    fontSize: "3.1rem",
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
    position: "relative" as const,
    color: "#00e5ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: "2rem",
  },

  gazeIntroButtons: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "1.25rem",
    marginTop: "2rem",
    width: "100%",
  },

  gazeIntroPanel: {
    maxWidth: "760px",
    width: "100%",
    padding: "3.25rem 3rem",
    borderRadius: "16px",
    backgroundColor: "rgba(15, 23, 42, 0.78)",
    border: "1px solid rgba(0, 229, 255, 0.35)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },

  gazeIntroTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
    color: "#67e8f9",
    textAlign:"center" as const
  },

  gazeIntroText: {
    fontSize: "1.1rem",
    lineHeight: 1.7,
    color: "#cbd5e1",
    textAlign:"center" as const,
    maxWidth: "620px",
    margin: 0,
  },

  buttonGaze: {
    minWidth: "320px",
    minHeight: "90px",
    padding: "1.5rem 3rem",
    fontSize: "1.4rem",
    fontWeight: 600,
    borderRadius: "999px",
    border: "3px solid #00e5ff",
    backgroundColor: "rgba(0, 229, 255, 0.08)",
    color: "#00e5ff",
    cursor: "pointer",
  },

  overlayStyle: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "#000",
  },

  dotStyle: {
    position: "absolute" as const,
    width: "20px",
    height: "20px",
    backgroundColor: "#00e5ff",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },

  textStyle: {
    position: "absolute" as const,
    bottom: "40px",
    width: "100%",
    textAlign: "center" as const,
    color: "#fff",
    fontSize: "1.2rem",
  },
  gazeCircleStyle: {
    position: "relative" as const,
    width: "900px",
    height: "900px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    border: "2px solid #00e5ff",
    margin: "0 auto",
  },

  gazeChordButton: (color: string, transform: string) => ({
    position: "absolute" as const,
    width: "200px",
    height: "200px",
    borderRadius: "70%",
    backgroundColor: color,
    border: "3px solid rgba(255, 255, 255, 0.8)",
    cursor: "pointer",
    transform,
    top: "50%",
    left: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#000",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
  }),

  gazeChordHoverShadow: "0 6px 20px rgba(0, 229, 255, 0.6)",
  gazeChordDefaultShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",

  gazeInfo: {
    position: "absolute" as const,
    bottom: "20px",
    left: "20px",
    color: "#00e5ff",
    fontSize: "1rem",
  },

  gazeSideMenuControl: {
    position: "absolute" as const,
    top: "50%",
    left: "20px",
    transform: "translateY(-50%)",
  },

  gazeSoundControl: {
    position: "absolute" as const,
    bottom: "20px",
    right: "20px",
  },

  calibrateContainer: {
    width: "100vw",
    height: "100vh",
    position: "relative" as const,
    color: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  calibrateIntroPanel: {
    maxWidth: "820px",
    width: "100%",
    padding: "3rem",
    borderRadius: "16px",
    backgroundColor: "rgba(15,23,42,0.88)",
    border: "1px solid rgba(148,163,184,0.15)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  },

  calibrateIntroTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#00e5ff",
    textAlign: "center" as const,
    margin: 0,
  },

  calibrateIntroText: {
    fontSize: "1.1rem",
    lineHeight: 1.7,
    color: "#cbd5e1",
    textAlign: "center" as const,
    margin: 0,
  },

  calibrateIntroButtons: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: "1.25rem",
    marginTop: "0.8rem",
  },

  calibrateInfoPanel: {
    position: "absolute" as const,
    top: "30px",
    left: "80%",
    width: "320px",
    padding: "24px",
    borderRadius: "16px",
    backgroundColor: "rgba(15,23,42,0.88)",
    border: "1px solid rgba(148,163,184,0.15)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },

  calibrateTitle: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#00e5ff",
  },

  calibrateSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },

  calibrateLabel: {
    fontSize: "0.95rem",
    color: "#94a3b8",
  },

  calibrateValue: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },

  calibratePoint: {
    position: "fixed" as const,
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#00e5ff",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
  },

  calibrateFooterComenzar: {
    position: "absolute" as const,
    bottom: "40%",
    left: "80%",
  },

  calibrateFooterVolver: {
    position: "absolute" as const,
    bottom: "20%",
    left: "80%",
  },

};

export default styles;