
import useTrackGaze from "@/hooks/useTrackGaze"
import Button from "../Button"
import styles from "@/styles/styles"

type GazeProps = {
    setMode: (Mode: string) => void
}

export default function Gaze({ setMode }: GazeProps) {

    useTrackGaze()

    const handlerReturn = () => {
        setMode("menu")
    }

    return (
        <section style={styles.gaze}>
            <Button onClick={handlerReturn}>Volver al menu</Button>
        </section>
    )
}