"use client";
import { useEffect, useRef, useState } from "react";
import useTrackGaze from "@/hooks/useTrackGaze";
import Button from "../Button";
import styles from "@/styles/styles";
import { handlerStartMusic } from "../Tone/tone";

type GazeProps = {
    setMode: (Mode: string) => void;
};

type ChordButton = {
    note: string;
    color: string;
    angle: number;
};

export default function Gaze({ setMode }: GazeProps) {
    const [enabled, setEnabled] = useState(false);
    const gaze = useTrackGaze(enabled);
    const chordRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const gazeHoldRef = useRef<{
        note: string | null;
        startedAt: number;
        played: boolean;
    }>({
        note: null,
        startedAt: 0,
        played: false,
    });

    const chordButtons: ChordButton[] = [
        { note: "SOL", color: "#00e5ff", angle: 0 },
        { note: "MI", color: "#ffff00", angle: 51 },
        { note: "RE", color: "#ff7700", angle: 102 },
        { note: "DO", color: "#ff0000", angle: 153 },
        { note: "SI", color: "#9933ff", angle: 204 },
        { note: "LA", color: "#0033ff", angle: 255 },
        { note: "FA", color: "#ffff00", angle: 309 },
    ];

    const radius = 320;


    useEffect(() => {
        if (!enabled || !gaze) {
            gazeHoldRef.current = {
                note: null,
                startedAt: 0,
                played: false,
            };
            return;
        }

        const hoveredNote = getNoteFromGaze(gaze.x, gaze.y);
        const now = Date.now();
        const holdState = gazeHoldRef.current;

        if (!hoveredNote) {
            gazeHoldRef.current = {
                note: null,
                startedAt: 0,
                played: false,
            };
            return;
        }

        if (holdState.note !== hoveredNote) {
            gazeHoldRef.current = {
                note: hoveredNote,
                startedAt: now,
                played: false,
            };
            return;
        }

        const elapsed = now - holdState.startedAt;
        if (elapsed >= 1000 && !holdState.played) {
            gazeHoldRef.current.played = true;
            void handleChordClick(hoveredNote);
        }
    }, [enabled, gaze]);

    const handleStart = () => {
        setEnabled(true);
    };

    const handleStop = () => {
        setEnabled(false);
    };

    const handlerReturn = () => {
        setEnabled(false);
        setMode("menu");
    };

    const handleChordClick = async (note: string) => {
        await handlerStartMusic(note);
    };

    // Calcular posición de un botón basado en el ángulo
    const getButtonPosition = (angle: number) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return { x, y };
    };

    const getTransform = (angle: number, scale = 1) => {
        const pos = getButtonPosition(angle);

        return `
        translate(
            calc(-50% + ${pos.x}px),
            calc(-50% + ${pos.y}px)
        )
        scale(${scale})
    `;
    };

    const getNoteFromGaze = (x: number, y: number) => {
        for (const chord of chordButtons) {
            const element = chordRefs.current[chord.note];
            if (!element) continue;

            const rect = element.getBoundingClientRect();
            const isInside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

            if (isInside) {
                return chord.note;
            }
        }

        return null;
    };

    return (
        <section style={styles.gaze}>

            {!enabled && (
                <div style={styles.gazeIntroPanel}>
                    <h2 style={styles.gazeIntroTitle}>Modo de seguimiento visual</h2>
                    <p style={styles.gazeIntroText}>

                        ⏳ Observá una nota durante unos segundos y escucharás su sonido. <br /> <br />

                        🎶 Explorá las diferentes notas, combiná sonidos y creá tu propia melodía. <br /> <br />

                        ¡Divertite creando música! 🎹 <br />
                    </p>

                    <div style={styles.gazeIntroButtons}>

                        <Button onClick={enabled ? handleStop : handleStart}>
                            {enabled ? "Detener tracking" : "Iniciar tracking"}
                        </Button>

                        <Button onClick={handlerReturn}>
                            Volver al menu
                        </Button>
                    </div>
                </div>
            )}

            {enabled && (
                <>
                    {/* Círculo de acordes */}
                    <div style={styles.gazeCircleStyle}>
                        {/* Centro gris */}
                        <div className="chordsContainer" />
                        {/* Botones de acordes */}
                        {chordButtons.map((chord, index) => (
                            <button
                                key={index}
                                ref={(el) => {
                                    chordRefs.current[chord.note] = el;
                                }}
                                style={styles.gazeChordButton(chord.color, getTransform(chord.angle))}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = getTransform(chord.angle, 1.1);
                                    e.currentTarget.style.boxShadow = styles.gazeChordHoverShadow;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = getTransform(chord.angle);
                                    e.currentTarget.style.boxShadow = styles.gazeChordDefaultShadow;
                                }}
                                onClick={() => handleChordClick(chord.note)}
                            >
                                {chord.note}
                            </button>
                        ))}
                    </div>

                    {/* Información de gaze */}
                    <div style={styles.gazeInfo}>
                        {gaze
                            ? `x: ${gaze.x.toFixed(0)} y: ${gaze.y.toFixed(0)}`
                            : "Sin datos"}
                    </div>

                    <div style={styles.gazeSideMenuControl}>
                        <Button onClick={handlerReturn}>
                            Volver al menu
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
}