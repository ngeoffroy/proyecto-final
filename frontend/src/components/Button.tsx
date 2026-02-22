import styles from '@/styles/styles'

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick} style={styles.buttonGaze}>{children}</button>;
}
