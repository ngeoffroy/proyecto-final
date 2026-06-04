"use client";

import { useState} from "react";
import Menu from "@/components/Menu/menu";
import Calibrate from "@/components/Calibrate/calibrate";
import Gaze from "@/components/Gaze/gaze";
import styles from "@/styles/styles"

export default function Home() {
  const [mode, setMode] = useState("menu");
  const [precitionCalibration, setPrecitionCalibration] = useState<number>(0);


  return (
    <main style={styles.container}>
      {mode === "menu" && <Menu setMode={setMode} precitionCalibration={precitionCalibration}/>}

      {mode === "calibrate" && <Calibrate setMode={setMode} setPrecisionCalibracion={setPrecitionCalibration}/>}

      {mode === "gaze" && <Gaze setMode={setMode} precisionCalibracion={precitionCalibration}/>}
    </main>
  );
}
