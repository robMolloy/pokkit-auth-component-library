import { add } from "@repo/math";
import styles from "./page.module.css";

export default function Home() {
  return <div className={styles.page}>{add(1, 2)}</div>;
}
