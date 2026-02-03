"use client";

import WebGazer from "../src/components/WebGazer";
import styles from "@/styles/styles";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function Home() {

  const [enabled, setEnabled] = useState(false)

  const handlerEmpezar = () => {
    setEnabled(true)
  }

  useEffect(() => {
    if (!enabled) return;

    const startWebGazer = async () => {
      const webgazer = (await import("webgazer")).default;

      webgazer
        .setRegression("ridge")
        .setGazeListener(() => { })
        .begin();

      webgazer.showVideo(true);
      webgazer.showPredictionPoints(true);
    };

    startWebGazer();

    return () => {
      import("webgazer").then(wg => wg.default.end());
    };
  }, [enabled]);

  return (
    <>
      {!enabled ? (<main style={styles.container}>
        <section style={styles.card}>
          <h1 style={styles.title}>Proyecto Final de Carrera</h1>

          <p style={styles.subtitle}>
            Desarrollo de una aplicación web para la composición musical a través de la mirada
          </p>

          <div style={styles.separator} />

          <div style={styles.meta}>
            <p><strong>Alumno:</strong> Nicolás Geoffroy</p>
            <p><strong>Carrera:</strong> Ingeniería en Sistemas de Información</p>
            <p><strong>Institución:</strong> Nombre de la Universidad</p>
            <p><strong>Año:</strong> 2026</p>
          </div>
        </section>

        <div style={styles.sectionSeparator} />

        <section style={styles.card}>
          <h1 style={styles.title}>¡Empezar ya!</h1>
          <p style={styles.subtitle}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ratione temporibus debitis provident adipisci magnam officiis a, veniam odit natus eius accusantium nisi ipsa aliquid tempora similique sint voluptatum praesentium.</p>
          <Button onClick={handlerEmpezar}> Empezar</Button>
        </section>

      </main>
      ) : (<section style={styles.gaze}>
        <h2>Seguimiento de mirada activo</h2>
      </section>)}
    </>
  );
}
