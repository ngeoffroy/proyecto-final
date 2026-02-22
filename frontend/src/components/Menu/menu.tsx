import styles from "@/styles/styles"
import Button from "../Button"

type MenuProps = {
    setMode: (mode:string) => void
}

export default function Menu({ setMode }: MenuProps) {

    const handlerEmpezar = () => {
        setMode("gaze")
    }

    const handlerCalibrar = () => {
        setMode("calibrate")
    }

    return (
        <main style={styles.container}>
            <section style={styles.card}>
                <h1 style={styles.title}>Proyecto Final de Carrera</h1>

                <Button onClick={handlerEmpezar}>Empezar</Button>
                <br /><br />
                <Button onClick={handlerCalibrar}>Calibrar mirada</Button>
            </section>
        </main>

    )

}