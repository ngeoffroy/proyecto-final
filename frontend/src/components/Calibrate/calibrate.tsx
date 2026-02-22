"use client";
import { useState, useEffect } from "react"
import styles from "@/styles/styles";


type CalibrateProps = {
    setMode: (Mode: string) => void
}

export default function Calibrate({ setMode }: CalibrateProps) {
    const [index, setIndex] = useState(0)

    // Definimos el pool de puntos (usamos % para que se ajuste porcentaulmente a la pantalla)
    const points = [
        { x: "10%", y: "10%" },
        { x: "50%", y: "10%" },
        { x: "90%", y: "10%" },
        { x: "10%", y: "50%" },
        { x: "50%", y: "50%" },
        { x: "90%", y: "50%" },
        { x: "10%", y: "90%" },
        { x: "50%", y: "90%" },
        { x: "90%", y: "90%" },
    ];

    let size_points = points.length

    const finishCalibrate = () => {
        alert("Calibración completa");
        setMode("menu");
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Mientras tenga puntos por observar de la matriz, le marcamos el timer y aumentamos el index
        if (index < size_points) {
            timer = setTimeout(() => {
                setIndex((idx) => idx + 1);
            }, 3000);
        }
        else {
            finishCalibrate();
        }
        return () => clearTimeout(timer);
    }, [index]);

    if (index >= size_points) {
        return null;
    }

    // Obtenemos el punto actual para renderizarlo
    let point = points[index]

    return (
        <div style={styles.overlayStyle}>
            <div
                // Extiendo el style y pinto el punto acutal
                style={{
                    ...styles.dotStyle,
                    left: point.x,
                    top: point.y,
                }}
            />
            <p style={styles.textStyle}>
                Mirá el punto ({index + 1} / {points.length})
            </p>
        </div>
    )
}