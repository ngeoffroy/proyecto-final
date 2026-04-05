"use client";

import { useEffect, useState, useRef } from "react";
import Menu from "@/components/Menu/menu";
import Calibrate from "@/components/Calibrate/calibrate";
import Gaze from "@/components/Gaze/gaze";

// TODO: crear un diagrama de interaccion entre componentes

export default function Home() {
  const [mode, setMode] = useState("menu");


  return (
    <>
      {mode === "menu" && <Menu setMode={setMode} />}

      {mode === "calibrate" && <Calibrate setMode={setMode}/>}

      {mode === "gaze" && <Gaze setMode={setMode}/>}
    </>
  );
}
