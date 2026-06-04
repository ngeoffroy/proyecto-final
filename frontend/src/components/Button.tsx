import styles from '@/styles/styles'

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled: boolean
};

export default function Button({ onClick, children, style, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ ...styles.buttonGaze, ...(disabled && styles.buttonGazeDisabled), ...style }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}