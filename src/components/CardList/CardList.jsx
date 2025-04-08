import Card from "../Card/Card";
import styles from "./CardList.module.css"

export default function CardList() {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card key={index} index={index} />
      ))}
    </div>
  );
}
