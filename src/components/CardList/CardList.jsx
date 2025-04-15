import Card from "../Card/Card";
import styles from "./CardList.module.css"

export default function CardList({ onCardClick }) {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card key={index} index={index} onClick={() => onCardClick(index)} />
      ))}
    </div>
  );
}
