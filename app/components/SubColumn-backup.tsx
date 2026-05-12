import Link from "next/link";
import styles from "./landing-backup.module.css";

// BACKUP COPY — unmodified snapshot of SubColumn.tsx taken before the
// branded redesign. Imports the *-backup CSS module so it's fully
// isolated from the live version. Edit SubColumn.tsx, NOT this file,
// if you want changes reflected in the live page.

export type SubColumnData = {
  key: string;
  label: string;
  title: string;
  subtitle: string;
  href: string;
  accentColor: string;
  accentTextColor: string;
};

type SubColumnProps = {
  side: "clerkie" | "fiber";
  index: number;
  totalCols: number;
  data: SubColumnData;
  active: boolean;
};

export default function SubColumn({
  side,
  index,
  totalCols,
  data,
  active,
}: SubColumnProps) {
  const posClass = styles[`pos${totalCols}_${index}`];
  const sideClass = side === "clerkie" ? styles.colClerkie : styles.colFiber;

  const className = [
    styles.col,
    sideClass,
    posClass,
    active ? styles.isActive : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={data.href}
      className={className}
      tabIndex={active ? 0 : -1}
      aria-hidden={!active}
    >
      <div className={styles.colLabel}>
        <span
          className={styles.dot}
          style={{ background: data.accentColor }}
          aria-hidden
        />
        {data.label}
      </div>
      <div>
        <h2 className={styles.colTitle}>{data.title}</h2>
        <p className={styles.colSubtitle}>{data.subtitle}</p>
        <div
          className={styles.learnMore}
          style={{ color: data.accentTextColor }}
          aria-hidden
        >
          Learn more →
        </div>
      </div>
    </Link>
  );
}
