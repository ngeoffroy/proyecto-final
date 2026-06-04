"use client";
import { useEffect, useRef, useState } from "react";
import useTrackGaze from "@/hooks/useTrackGaze";
import Button from "../Button";
import styles from "@/styles/styles";
import { handlerStartMusic } from "../Tone/tone";
import { getLastComposition, saveComposition } from "@/services/endpoints";

type GazeProps = {
    setMode: (Mode: string) => void;
    precisionCalibracion: number;
};

type ChordButton = {
    note: string;
    color: string;
    angle: number;
};

export default function Gaze({ setMode, precisionCalibracion }: GazeProps) {
    const [enabled, setEnabled] = useState(false);
    const [notesPlayed, setNotesPlayed] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingComposition, setIsLoadingComposition] = useState(false);
    const [isPlayingMelody, setIsPlayingMelody] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
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

    // Factor de tamaño según precisión de calibración:
    // >90% → tamaño normal | 70-90% → 15% más grande | 60-70% → 25% más grande
    const buttonFactor =
        precisionCalibracion > 90 ? 1 :
        precisionCalibracion > 70 ? 1.15 :
        1.25;

    // El radio y el círculo se achican en proporción inversa
    // para que los botones más grandes no generen scroll
    const radius = Math.round(450 / buttonFactor);
    const circleSize = Math.round(1200 / buttonFactor);
    const buttonSize = Math.round(200 * buttonFactor);


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
        if (elapsed >= 500 && !holdState.played) {
            gazeHoldRef.current.played = true;
            void handleChordClick(hoveredNote);
        }
    }, [enabled, gaze]);

    const handleStart = () => {
        setNotesPlayed([]);
        setSaveMessage("");
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
        makeMelody(note);
    };

    const makeMelody = (note: string) => {
        setNotesPlayed((prev) => [...prev, note]);
    };

    const handlerCleanMelody = () => {
        setNotesPlayed([])
    }

    const handleSaveComposition = async () => {
        if (notesPlayed.length === 0 || isSaving) return;

        setIsSaving(true);
        setSaveMessage("");

        try {
            await saveComposition({
                notes: notesPlayed,
                precisionCalibracion,
            });
            setSaveMessage("Melodía guardada correctamente");
        } catch {
            setSaveMessage("No se pudo guardar la melodía");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLoadLastComposition = async () => {
        if (isLoadingComposition) return;

        setIsLoadingComposition(true);
        setSaveMessage("");

        try {
            const response = await getLastComposition();
            const loadedNotes = response?.data?.notas ?? response?.notas ?? [];

            if (!Array.isArray(loadedNotes) || loadedNotes.length === 0) {
                setSaveMessage("No hay melodías guardadas");
                return;
            }

            setNotesPlayed(loadedNotes);
            setSaveMessage("Última melodía cargada");
        } catch {
            setSaveMessage("No se pudo cargar la melodía");
        } finally {
            setIsLoadingComposition(false);
        }
    };

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const playMelody = async () => {
        if (notesPlayed.length === 0 || isPlayingMelody) return;

        setIsPlayingMelody(true);
        setSaveMessage("");

        const melody = [...notesPlayed];

        try {
            for (let i = 0; i < melody.length; i++) {
                await handlerStartMusic(melody[i]);
                if (i < melody.length - 1) {
                    await sleep(500);
                }
            }
            setSaveMessage("Melodía reproducida");
        } catch {
            setSaveMessage("No se pudo reproducir la melodía");
        } finally {
            setIsPlayingMelody(false);
        }
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

                        <Button onClick={enabled ? handleStop : handleStart} disabled={false}>
                            {enabled ? "Detener tracking" : "Iniciar tracking"}
                        </Button>

                        <Button onClick={handlerReturn} disabled={false}>
                            Volver al menu
                        </Button>
                    </div>
                </div>
            )}

            {enabled && (
                <>
                    {/* Círculo de acordes */}
                    <div style={{ ...styles.gazeCircleStyle, width: `${circleSize}px`, height: `${circleSize}px` }}>
                        {/* Centro gris */}
                        <div className="chordsContainer" />
                        {/* Botones de acordes */}
                        {chordButtons.map((chord, index) => (
                            <button
                                key={index}
                                ref={(el) => {
                                    chordRefs.current[chord.note] = el;
                                }}
                                style={styles.gazeChordButton(chord.color, getTransform(chord.angle), buttonSize)}
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

                    <div style={styles.gazeNotesPanel}>
                        <span style={styles.gazeNotesLabel}>Notas tocadas</span>
                        {notesPlayed.length === 0 ? (
                            <span style={styles.gazeNotesEmpty}>No se han tocado notas</span>
                        ) : (
                            <div style={styles.gazeNotesList}>
                                {notesPlayed.map((note, index) => (
                                    <span key={`${note}-${index}`} style={styles.gazeNoteChip}>
                                        {note}
                                    </span>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={handleSaveComposition}
                            disabled={notesPlayed.length === 0 || isSaving}
                            style={styles.gazeSaveButton}
                        >
                            {isSaving ? "Guardando..." : "Guardar melodía"}
                        </button>

                        <button
                            onClick={playMelody}
                            disabled={notesPlayed.length === 0 || isPlayingMelody}
                            style={styles.gazeSaveButton}
                        >
                            {isPlayingMelody ? "Reproduciendo..." : "Play melody"}
                        </button>

                        <button onClick={handlerCleanMelody} style={styles.gazeSaveButton}> Borrar melodia </button>

                        <Button
                            onClick={handleLoadLastComposition}
                            style={{ width: "100%", minWidth: "0", fontSize: "1rem", padding: "0.85rem 1rem" }}
                            disabled={false}
                        >
                            {isLoadingComposition ? "Cargando..." : "Cargar última melodía"}
                        </Button>

                        {saveMessage && (
                            <span style={styles.gazeSaveMessage}>{saveMessage}</span>
                        )}
                    </div>

                    <div style={styles.gazeSideMenuControl}>
                        <Button onClick={handlerReturn} disabled={false}>
                            Volver al menu
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
}