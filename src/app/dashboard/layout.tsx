import styles from "@/app/page.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.main}>{children}</div>;
}