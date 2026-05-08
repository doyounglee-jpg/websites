import Link from "next/link";
import styles from "./landing.module.css";

// Per the brief, sub-columns are real `<a>` tags pointing to their
// destination routes (using next/link for client-side navigation).
// They're absolutely positioned within the panel — their `left` and
// `width` come from a position class (.pos2_0, .pos3_1, etc.) so we
// can override them in the mobile media query.

export type SubColumnData = {
  key: string;
  label: string;       // small uppercase label (e.g., "CLERKIE · MEMBERS")
  title: string;       // big display title (e.g., "Members")
  subtitle: string;
  href: string;        // navigation destination
  accentColor: string; // used for the dot — pass as `var(--...)` string
  accentTextColor: string; // used for "Learn more →"
};

type SubColumnProps = {
  side: "clerkie" | "fiber";
  index: number;       // which position within the panel (0, 1, 2)
  totalCols: number;   // 2 for Clerkie, 3 for Fiber — picks position class
  data: SubColumnData;
  // True when this col has slid in. False means it's invisible & inert.
  active: boolean;
};

export default function SubColumn({
  side,
  index,
  totalCols,
  data,
  active,
}: SubColumnProps) {
  // Position class encodes "n of total" (e.g., pos2_0 = first of two,
  // pos3_2 = third of three). The CSS handles the actual left/width.
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
      // When the col hasn't slid in yet (active=false), it's visually
      // invisible and pointer-events:none — but `<a>` is naturally in
      // the tab order, so without these two attributes a keyboard user
      // would tab to invisible links and screen readers would announce
      // them. tabIndex=-1 removes from sequential nav; aria-hidden hides
      // from assistive tech.
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
