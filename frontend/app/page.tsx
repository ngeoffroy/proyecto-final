"use client";

import styles from "@/styles/styles";
import ButtonGazze from "@/components/ButtonGaze";
import { useEffect, useState, useRef } from "react";
import Menu from "@/components/Menu/menu";
import Calibrate from "@/components/Calibrate/calibrate";

export default function Home() {

  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState("menu");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const gazeTimer = useRef<NodeJS.Timeout | null>(null);

  const handlerEmpezar = () => {
    setMode("gaze")
  }

  const handlerVolver = () => {
    setMode("menu")
  }

  const handlerCalibrar = () => {
    setMode("calibrate")
  }

  useEffect(() => {
    if (!enabled) return;

    let webgazerInstance: any;

    const startWebGazer = async () => {
      webgazerInstance = (await import("webgazer")).default;

      webgazerInstance
        .setGazeListener((data: any) => {
          if (!data || !buttonRef.current) return;

          const { x, y } = data;
          const rect = buttonRef.current.getBoundingClientRect();

          const isLookingAtButton =
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom;

          if (isLookingAtButton) {
            if (!gazeTimer.current) {
              gazeTimer.current = setTimeout(() => {
                stopWebGazer(webgazerInstance);
                setEnabled(false);
              }, 400); // 👁️ tiempo de fijación (ms)
            }
          } else {
            if (gazeTimer.current) {
              clearTimeout(gazeTimer.current);
              gazeTimer.current = null;
            }
          }
        })
        .begin();

      webgazerInstance.showPredictionPoints(true);
    };

    const stopWebGazer = (wg: any) => {
      wg.end();
      if (gazeTimer.current) {
        clearTimeout(gazeTimer.current);
        gazeTimer.current = null;
      }
    };

    startWebGazer();

    return () => {
      if (webgazerInstance) webgazerInstance.end();
    };
  }, [enabled]);


  return (
    <>
      {mode === "menu" && <Menu setMode={setMode} />}

      {mode === "calibrate" && <Calibrate setMode={setMode}/>
      }

      {mode === "gaze" && (
        <section style={styles.gaze}>
          <h2>Seguimiento de mirada activo</h2>
          <ButtonGazze onClick={handlerVolver} ref={buttonRef}>
            Volver al menú
          </ButtonGazze>
        </section>
      )}
    </>
  );
}
