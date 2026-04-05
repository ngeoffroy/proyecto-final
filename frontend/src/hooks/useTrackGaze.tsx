import {useEffect, useRef } from "react";

export default function useTrackGaze(enabled:boolean) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const gazeTimer = useRef<NodeJS.Timeout | null>(null);
    const webgazerRef = useRef<any>(null);

    useEffect(() => {
        if (!enabled){
            webgazerRef.current?.end();
            webgazerRef.current = null;
            return;
        }

        // let webgazerInstance: any;

        const startWebGazer = async () => {
            const webgazerInstance = (await import("webgazer")).default;
            webgazerRef.current = webgazerInstance;

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
                            }, 400);
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
}