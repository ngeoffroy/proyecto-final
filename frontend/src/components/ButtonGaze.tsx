import styles from "@/styles/styles";

type ButtonGazeProps = {
  onClick?: () => void;
  ref: any,
  children: React.ReactNode;
};

export default function ButtonGaze({ onClick, ref, children }: ButtonGazeProps) {
  return (
    <button
      id = "btn_volver"
      onClick={onClick}
      ref={ref}
      style={styles.buttonGaze}
      aria-label="Botón de interacción por mirada"
    >
      {children}
    </button>
  );
}
