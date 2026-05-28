import { useEffect, useRef, useState } from "react";

type Gaze = { x: number; y: number } | null;

export default function useTrackGaze(enabled: boolean): Gaze {
    const webgazerRef = useRef<any>(null);
    const [gaze, setGaze] = useState<Gaze>(null);

    useEffect(() => {
        let isMounted = true;

        const start = async () => {
            if (webgazerRef.current) return;

            const webgazer = (await import("webgazer")).default;
            webgazerRef.current = webgazer;

            webgazer
                .setRegression("ridge")
                .setGazeListener((data: any) => {
                    if (!data || !isMounted) return;

                    setGaze({ x: data.x, y: data.y });
                })
                .showPredictionPoints(true)
                .begin();
            webgazerRef.current.showVideo(true);
            //webgazerRef.current.showVideo(false);
        };

        const stop = () => {
            if (!webgazerRef.current) return;

            webgazerRef.current.showVideo(false);
            webgazerRef.current.showFaceOverlay(false);
            webgazerRef.current.showPredictionPoints(false);
            webgazerRef.current.pause();
            webgazerRef.current.clearGazeListener();

            webgazerRef.current = null;

            const overlays = [
                "webgazerFaceOverlay",
                "webgazerVideoCanvas",
                "webgazerFaceFeedbackBox"
            ];

            overlays.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    (el as HTMLElement).style.display = "none";
                }
            });

            webgazerRef.current = null;
            setGaze(null);
        };

        if (enabled) {
            start();
        } else {
            stop();
        }

        return () => {
            isMounted = false;
            stop();
        };
    }, [enabled]);

    return gaze;
}