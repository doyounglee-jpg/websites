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

/**
 * MidAnimation — a tiny CSS-only "UI moment" that lives between the
 * label and title block of each sub-product card. Each one telegraphs
 * the product's actual feature set by mimicking a real UI event:
 *
 *   members  → payment confirmation toast (debt payoff)
 *   companies → team enrollment notification (avatars + count)
 *   crm      → new-case notification card (status pill + record)
 *   ims      → file upload progress (icon + filename + bar fill)
 *   agent    → chat: typing dots → response message
 *
 * All pointer-events:none, aria-hidden, CSS-only loops. The icons are
 * inline SVGs so we don't pay for any extra requests. */
function MidAnimation({ kind }: { kind: string }) {
  switch (kind) {
    case "members":
      // Payment confirmation toast slides up + fades, then resets.
      return (
        <div className={styles.animMembers} aria-hidden>
          <div className={styles.animMembersToast}>
            <div className={styles.animMembersCheck}>
              <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8l3 3 7-7" />
              </svg>
            </div>
            <div className={styles.animMembersText}>
              <div className={styles.animMembersAmount}>$487 paid</div>
              <div className={styles.animMembersSubtext}>Visa ending 4831</div>
            </div>
          </div>
        </div>
      );

    case "companies":
      // Avatars cascade in one by one, then "+ 12 enrolled" appears.
      return (
        <div className={styles.animCompanies} aria-hidden>
          <span className={`${styles.animCompaniesAvatar} ${styles.animCompaniesAvatar1}`} />
          <span className={`${styles.animCompaniesAvatar} ${styles.animCompaniesAvatar2}`} />
          <span className={`${styles.animCompaniesAvatar} ${styles.animCompaniesAvatar3}`} />
          <span className={styles.animCompaniesCount}>+ 12 enrolled</span>
        </div>
      );

    case "crm":
      // New-case notification card slides in. Status dot pulses to
      // suggest "live / active".
      return (
        <div className={styles.animCrm} aria-hidden>
          <div className={styles.animCrmCard}>
            <div className={styles.animCrmHeader}>
              <span className={styles.animCrmId}>Case #4827</span>
              <span className={styles.animCrmStatus}>
                <span className={styles.animCrmStatusDot} />
                Active
              </span>
            </div>
            <div className={styles.animCrmName}>J. Smith · $2,341</div>
          </div>
        </div>
      );

    case "ims":
      // File upload row: doc icon + filename + progress bar that fills
      // 0 → 100, holds at "Uploaded ✓", resets.
      return (
        <div className={styles.animIms} aria-hidden>
          <div className={styles.animImsFile}>
            <div className={styles.animImsIcon}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 1.5h6l4 4v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1z" />
                <path d="M9 1.5v4h4" />
              </svg>
            </div>
            <div className={styles.animImsInfo}>
              <div className={styles.animImsFilename}>invoice-2401.pdf</div>
              <div className={styles.animImsTrack}>
                <div className={styles.animImsFill} />
              </div>
            </div>
          </div>
        </div>
      );

    case "agent":
      // Chat bubble: shows 3 typing dots, then morphs to a message.
      // Two children (typing, msg) overlap in the bubble; opacity
      // transitions hand off between them.
      return (
        <div className={styles.animAgent} aria-hidden>
          <div className={styles.animAgentBubble}>
            <div className={styles.animAgentTyping}>
              <span /><span /><span />
            </div>
            <div className={styles.animAgentMsg}>Payment plan sent ✓</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

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

      {/* Middle slot — a tiny product-character animation. Sits between
          the label (top) and the title block (bottom) — the parent's
          flex justify-content: space-between handles vertical placement. */}
      <MidAnimation kind={data.key} />

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
