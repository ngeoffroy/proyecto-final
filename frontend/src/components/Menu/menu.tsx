import styles from "@/styles/styles"
import Button from "../Button"

type MenuProps = {
    setMode: (mode:string) => void
    precitionCalibration: number
}

export default function Menu({ setMode, precitionCalibration}: MenuProps) {

    const handlerBegin = () => {
        setMode("gaze")
    }

    const handlerCalibrate = () => {
        setMode("calibrate")
    }

    return (
        <main>
            <section style={styles.card}>
                <h1 style={styles.title}>Proyecto Final de Carrera</h1>

                <Button onClick={handlerBegin} disabled={!precitionCalibration}>Empezar</Button> <br /><br />
                {!precitionCalibration && <p style={styles.calibrationWarning}>Es preciso calibrar para comenzar a componer</p>}
                <Button onClick={handlerCalibrate} disabled={false}>Calibrar mirada</Button>
            </section>
        </main>

    )

}