import { add } from "@repo/math/add";
import styles from "./page.module.css";

export default function Home() {
  return <div className={styles.page}>{add(1, 2)}</div>;
}
