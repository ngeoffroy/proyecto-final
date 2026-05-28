import styles from '@/styles/styles'

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Button({ onClick, children, style }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ ...styles.buttonGaze, ...style }}
    >
      {children}
    </button>
  );
}