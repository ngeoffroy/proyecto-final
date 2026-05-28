"use client";
import { useState } from "react";
import styles from "@/styles/styles";
import useTrackGaze from "@/hooks/useTrackGaze";
import Button from "../Button";

const REQUIRED_CLICKS = 2;

type CalibrateProps = {
    setMode: (mode: string) => void;
};

export default function Calibrate({ setMode }: CalibrateProps) {

    const [points, setPoints] = useState(Array(9).fill(0));
    const [currentPoint, setCurrentPoint] = useState(0);
    const [initGaze, setInitGaze] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Puntos en toda la pantalla (esquinas, bordes y centro)
    const basePoints = [
        { x: 50, y: 50 }, // centro primero
        { x: 35, y: 25 },
        { x: 50, y: 25 },
        { x: 65, y: 25 },
        { x: 35, y: 50 },
        { x: 65, y: 50 },
        { x: 35, y: 65 },
        { x: 50, y: 65 },
        { x: 65, y: 65 },
    ];

    useTrackGaze(initGaze);

    const handleClick = () => {
        // guardamos el nuevo punto en la lista de puntos vistos y le sumamos 1
        console.log(currentPoint)
        const newPoints = [...points];
        newPoints[currentPoint]++;
        setPoints(newPoints);

        if (newPoints[currentPoint] >= REQUIRED_CLICKS) {
            setCurrentPoint((prev) => prev + 1);
        }

        if (currentPoint + 1 === basePoints.length) {
            setCompleted(true);
        }
    };

    const handleStart = () => {
        window.webgazer?.saveDataAcrossSessions?.(false);
        window.webgazer?.clearData?.();
        window.webgazer?.setRegression?.("weightedRidge");
        window.webgazer?.begin?.();
        setInitGaze(true)
    }

    const handleBack = () => setMode("menu");

    const point = currentPoint < basePoints.length ? basePoints[currentPoint] : null;
    const clicks = points[currentPoint];

    return (
        <section style={styles.calibrateContainer}>
            {!initGaze && (
                <div style={styles.calibrateIntroPanel}>
                    <h2 style={styles.calibrateIntroTitle}>Calibración de mirada</h2>

                    <p style={styles.calibrateIntroText}>
                        Antes de comenzar el seguimiento visual, vamos a calibrar el sistema para mejorar la precisión. <br /><br />

                        ❗ Observá y hacé click en cada punto que aparezca en pantalla.<br /><br />

                        ⏳ Procura que la vista se acerque los más cerca posible del punto.<br /><br />

                        🔄 Repetí el proceso con todos los puntos restantes.<br /><br />

                        Podés seguir el progreso de la calibración desde el panel de información.
                    </p>

                    <div style={styles.calibrateIntroButtons}>
                        <Button onClick={handleStart}>Iniciar calibracion</Button>
                        <Button onClick={handleBack}>Volver</Button>
                    </div>
                </div>
            )}

            {initGaze && (
                <>
                    <div style={styles.calibrateInfoPanel}>

                        <div style={styles.calibrateTitle}>
                            Calibración ocular
                        </div>

                        <div style={styles.calibrateSection}>
                            <span style={styles.calibrateLabel}>
                                Punto actual
                            </span>

                            <span style={styles.calibrateValue}>
                                {currentPoint + 1} / {basePoints.length}
                            </span>
                        </div>

                        <div style={styles.calibrateSection}>
                            <span style={styles.calibrateLabel}>
                                Clicks restantes
                            </span>

                            <span style={styles.calibrateValue}>
                                {REQUIRED_CLICKS - clicks}
                            </span>
                        </div>

                        <div style={styles.calibrateSection}>
                            <span style={styles.calibrateLabel}>
                                Precisión estimada
                            </span>

                            <span style={styles.calibrateValue}>
                                92%
                            </span>
                        </div>

                        <div style={styles.calibrateSection}>
                            <span style={styles.calibrateLabel}>
                                Error promedio
                            </span>

                            <span style={styles.calibrateValue}>
                                1.4°
                            </span>
                        </div>

                    </div>

                    {point && (
                        <div
                            onClick={handleClick}
                            style={{
                                ...styles.calibratePoint,
                                left: `${point.x}%`,
                                top: `${point.y}%`,
                            }}
                        />
                    )}

                    <div style={styles.calibrateFooterVolver}>
                        <Button onClick={handleBack}>
                            Volver
                        </Button>
                    </div>
                </>
            )}

            {completed && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#0f172a",
                            padding: "2rem 3rem",
                            borderRadius: "16px",
                            border: "1px solid rgba(0,229,255,0.3)",
                            textAlign: "center",
                            color: "#00e5ff",
                            minWidth: "320px",
                        }}
                    >
                        <h2
                            style={{
                                marginBottom: "1rem",
                                fontSize: "2rem",
                            }}
                        >
                            Calibración completa
                        </h2>
                        <div>
                            <Button onClick={handleBack}>
                                Volver al menu
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}