"use client";

import { useEffect } from "react";

export default function WebGazer() {
  useEffect(() => {
    let webgazer: any;

    const init = async () => {
      const module = await import("webgazer");
      webgazer = module.default;

      webgazer
        .setGazeListener((data: any) => {
          if (data) {
            console.log("Gaze:", data.x, data.y);
          }
        })
        .begin();
    };

    init();

    return () => {
      if (webgazer) {
        webgazer.end();
      }
    };
  }, []);

  return null; // no renderiza nada visible
}
