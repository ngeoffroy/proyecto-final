"use client";
import { useState } from "react";
import styles from "@/styles/styles";
import useTrackGaze from "@/hooks/useTrackGaze";
import Button from "../Button";

const REQUIRED_CLICKS = 5;
const MAX_ERROR_PERMITED = 300;

type CalibrateProps = {
    setMode: (mode: string) => void;
    setPrecisionCalibracion: (valor: number) => void;
};

export default function Calibrate({ setMode, setPrecisionCalibracion }: CalibrateProps) {

    const [points, setPoints] = useState(Array(9).fill(0));
    const [currentPoint, setCurrentPoint] = useState(0);
    const [initGaze, setInitGaze] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [errorAproximacion, setErrorAproximacion] = useState(0);

    // Puntos
    const basePoints = [
        { x: 50, y: 50 },
        { x: 35, y: 25 },
        { x: 50, y: 25 },
        { x: 65, y: 25 },
        { x: 35, y: 50 },
        { x: 65, y: 50 },
        { x: 35, y: 65 },
        { x: 50, y: 65 },
        { x: 65, y: 65 },
    ];

    const gaze = useTrackGaze(initGaze);

    const getErrorPresition = (posicionClic: { x: number; y: number }, posicionPunto: { x: number; y: number }): number => {
        const distancia = Math.sqrt(
            Math.pow(posicionPunto.x - posicionClic.x, 2) + Math.pow(posicionPunto.y - posicionClic.y, 2)
        );
        return distancia;
    }

    const calcularPrecision = (errorEnPixeles: number): number => {
        if (errorEnPixeles <= 0) return 100;
        if (errorEnPixeles >= MAX_ERROR_PERMITED) return 0;
        return Math.max(0, 100 * (1 - (errorEnPixeles / MAX_ERROR_PERMITED)));
    }

    const handleClick = (x: number, y: number) => {
        if (gaze) {
            const posicionPunto = {
                x: (x / 100) * window.innerWidth,
                y: (y / 100) * window.innerHeight,
            };

            const errorActualPx = getErrorPresition(gaze, posicionPunto);
            const precisionPorcentaje = calcularPrecision(errorActualPx);
            setErrorAproximacion(precisionPorcentaje);
            setPrecisionCalibracion(precisionPorcentaje);
        }

        // guardamos el nuevo punto en la lista de puntos vistos y le sumamos 1
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
        setInitGaze(true);
    }

    const handleBack = () => {
        setInitGaze(false);
        window.setTimeout(() => {
            setMode("menu");
        }, 50);
    };

    const point = currentPoint < basePoints.length ? basePoints[currentPoint] : null;
    const clicks = points[currentPoint];

    return (
        <section style={styles.calibrateContainer}>
            {!initGaze && (
                <div style={styles.calibrateIntroPanel}>
                    <h2 style={styles.calibrateIntroTitle}>Calibración de mirada</h2>

                    <p style={styles.calibrateIntroText}>
                        Antes de comenzar el seguimiento visual, vamos a calibrar el sistema para mejorar la precisión. <br /><br />

                        La posición de la mirada está dada por el punto 🔴, mientras que 🔵 es al que deseamos observar <br /><br />

                        ❗ Observá y hacé click en cada punto que aparezca en pantalla.<br /><br />

                        ⏳ Procura que la vista se acerque los más cerca posible del punto.<br /><br />

                        🔄 Repetí el proceso con todos los puntos restantes.<br /><br />

                        Podés seguir el progreso de la calibración desde el panel de información.
                    </p>

                    <div style={styles.calibrateIntroButtons}>
                        <Button onClick={handleStart} disabled={false}>Iniciar calibracion</Button>
                        <Button onClick={handleBack} disabled={false}>Volver</Button>
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
                                {errorAproximacion.toFixed(1)}%
                            </span>
                        </div>

                    </div>

                    {point && (
                        <div
                            onClick={() => handleClick(point.x, point.y)}
                            style={{
                                ...styles.calibratePoint,
                                left: `${point.x}%`,
                                top: `${point.y}%`,
                            }}
                        />
                    )}

                    <div style={styles.calibrateFooterVolver}>
                        <Button onClick={handleBack} disabled={false}>
                            Volver
                        </Button>
                    </div>
                </>
            )}

            {completed && (
                <div style={styles.calibrateCompletedOverlay}>
                    <div style={styles.calibrateCompletedModal}>
                       <h2 style={styles.calibrateCompletedTitle}>
                           {errorAproximacion > MAX_ERROR_PERMITED ? 'Error de aproximación alto. Volver a calibrar' : 'Calibración completa'}
                        </h2>
                        <div>
                            <Button onClick={handleBack} disabled={false}>
                                Volver al menu
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}