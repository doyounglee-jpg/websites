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
 * MidAnimation — multi-step UI vignettes for each sub-product card.
 * Each tells a 4-5 step story mimicking a real product moment:
 *
 *   members   → pay-then-celebrate chat (7s)
 *               Pay btn → user msg → typing → Clerkie msg → 🏆 chip
 *   companies → live KPI dashboard (6s)
 *               3 KPI tiles cascade in
 *   crm       → case pipeline movement (7s)
 *               Card moves left→right through New / Active / Recovered
 *   ims       → file upload + AI categorize (6s)
 *               File row + filling bar → "Analyzing..." → "Filed" tag
 *   agent     → chat exchange + actions (7s)
 *               User Q → typing → AI A → [ Yes ] [ Skip ]
 *
 * All auto-play (continuous loop) so users see the full story without
 * needing to hover. Reduced-motion respected in the CSS module. */
function MidAnimation({ kind }: { kind: string }) {
  switch (kind) {
    case "members":
      // Wireframe chat: outlined bubbles drawing in left-to-right via
      // clip-path, no fills. Pure black-and-white-on-dark vibe.
      return (
        <>
          <div className={styles.animMembers} aria-hidden>
            <div className={styles.animMembersPayBtn}>
              <span className={styles.animMembersPayBtnLabel}>Pay $487</span>
              <span className={styles.animMembersPayBtnLoading} aria-hidden>
                <span /><span /><span />
              </span>
              <span className={styles.animMembersPayBtnDone}>✓ Paid</span>
            </div>
            <div className={styles.animMembersUserMsg}>
              Made final payment 💪
            </div>
            <div className={styles.animMembersTyping}>
              <span /><span /><span />
            </div>
            <div className={styles.animMembersClerkieMsg}>
              🎉 You did it!
            </div>
            <div className={styles.animMembersAchievement}>
              <div className={styles.animMembersAchievementMain}>
                💳 Credit Card · $4,287
              </div>
              <div className={styles.animMembersAchievementSub}>
                PAID OFF in 14 months
              </div>
            </div>
          </div>
          <div className={styles.animMembersMobile} aria-hidden>
            <div className={styles.animMembersMobileTrack}>
              <div className={styles.animMembersMobileFill} />
            </div>
            <div className={styles.animMembersMobileLabel}>73% paid off</div>
          </div>
        </>
      );

    case "companies":
      // Duna-style 2-panel flow:
      //   Panel A (top): new enrollment notification
      //   Curved arrow drawing in
      //   Panel B (bottom): aggregated dashboard stat updated
      return (
        <>
          <div className={styles.animCompanies} aria-hidden>
            {/* Panel A — new enrollment */}
            <div className={`${styles.flowCard} ${styles.flowCardA} ${styles.flowCardDark}`}>
              <div className={styles.flowCardRow}>
                <span className={styles.flowAvatar}>S</span>
                <div className={styles.flowCardText}>
                  <div className={styles.flowCardTitle}>Sarah K.</div>
                  <div className={styles.flowCardSub}>Engineering · Just enrolled</div>
                </div>
                <span className={styles.flowCheck}>✓</span>
              </div>
            </div>
            {/* Curved connector arrow drawing in */}
            <svg className={styles.flowArrow} viewBox="0 0 32 36" fill="none" aria-hidden>
              <path className={styles.flowArrowPath} d="M 16,2 C 8,12 24,20 16,32" />
              <path className={styles.flowArrowHead} d="M 12,28 L 16,32 L 20,28" />
            </svg>
            {/* Panel B — dashboard stat */}
            <div className={`${styles.flowCard} ${styles.flowCardB} ${styles.flowCardDark}`}>
              <div className={styles.flowKpiLabel}>Total enrolled this quarter</div>
              <div className={styles.flowKpiRow}>
                <span className={styles.flowKpiValue}>127</span>
                <span className={styles.flowKpiDelta}>+1 today</span>
              </div>
            </div>
          </div>
          <div className={styles.animCompaniesMobile} aria-hidden>
            <div className={styles.animCompaniesMobileDot} />
            <div className={styles.animCompaniesMobileRing} />
            <div
              className={`${styles.animCompaniesMobileRing} ${styles.animCompaniesMobileRingDelay}`}
            />
          </div>
        </>
      );

    case "crm":
      // Duna-style 2-panel flow:
      //   Panel A (top): new case with NEW status (yellow pill)
      //   Curved arrow
      //   Panel B (bottom): SAME case now RECOVERED (green pill)
      return (
        <>
          <div className={styles.animCrm} aria-hidden>
            <div className={`${styles.flowCard} ${styles.flowCardA} ${styles.flowCardLight}`}>
              <div className={styles.flowCardRow}>
                <div className={styles.flowCardText}>
                  <div className={styles.flowCardTitle}>Case #4827 · J. Smith</div>
                  <div className={styles.flowCardSub}>$2,341 · Auto loan</div>
                </div>
                <span className={`${styles.flowStatusPill} ${styles.flowStatusNew}`}>NEW</span>
              </div>
            </div>
            <svg className={styles.flowArrow} viewBox="0 0 32 36" fill="none" aria-hidden>
              <path className={styles.flowArrowPath} d="M 16,2 C 8,12 24,20 16,32" />
              <path className={styles.flowArrowHead} d="M 12,28 L 16,32 L 20,28" />
            </svg>
            <div className={`${styles.flowCard} ${styles.flowCardB} ${styles.flowCardLight}`}>
              <div className={styles.flowCardRow}>
                <div className={styles.flowCardText}>
                  <div className={styles.flowCardTitle}>Case #4827 · J. Smith</div>
                  <div className={styles.flowCardSub}>$2,341 collected in 38 days</div>
                </div>
                <span className={`${styles.flowStatusPill} ${styles.flowStatusResolved}`}>✓ RECOVERED</span>
              </div>
            </div>
          </div>
          <div className={styles.animCrmMobile} aria-hidden>
            <div className={styles.animCrmMobileBar} />
            <div className={styles.animCrmMobileBar} />
            <div className={styles.animCrmMobileBar} />
          </div>
        </>
      );

    case "ims":
      // Duna-style 2-panel flow:
      //   Panel A (top): file uploading with progress bar
      //   Curved arrow
      //   Panel B (bottom): same file FILED with category tag
      return (
        <>
          <div className={styles.animIms} aria-hidden>
            <div className={`${styles.flowCard} ${styles.flowCardA} ${styles.flowCardLight}`}>
              <div className={styles.flowCardRow}>
                <div className={styles.flowFileIcon}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 1.5h6l4 4v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1z" />
                    <path d="M9 1.5v4h4" />
                  </svg>
                </div>
                <div className={styles.flowCardText}>
                  <div className={styles.flowCardTitle}>invoice-2401.pdf</div>
                  <div className={styles.flowImsProgressTrack}>
                    <div className={styles.flowImsProgressFill} />
                  </div>
                </div>
              </div>
            </div>
            <svg className={styles.flowArrow} viewBox="0 0 32 36" fill="none" aria-hidden>
              <path className={styles.flowArrowPath} d="M 16,2 C 8,12 24,20 16,32" />
              <path className={styles.flowArrowHead} d="M 12,28 L 16,32 L 20,28" />
            </svg>
            <div className={`${styles.flowCard} ${styles.flowCardB} ${styles.flowCardLight}`}>
              <div className={styles.flowCardRow}>
                <div className={styles.flowFileIcon}>📁</div>
                <div className={styles.flowCardText}>
                  <div className={styles.flowCardTitle}>invoice-2401.pdf</div>
                  <div className={styles.flowCardSub}>Filed · Accounts Receivable</div>
                </div>
                <span className={styles.flowCheck}>✓</span>
              </div>
            </div>
          </div>
          <div className={styles.animImsMobile} aria-hidden>
            <div className={styles.animImsMobileBar} />
            <div className={styles.animImsMobileBar} />
            <div className={styles.animImsMobileBar} />
            <div className={styles.animImsMobileBar} />
          </div>
        </>
      );

    case "agent":
      // Wireframe chat with AI twinkle/sparkle on the AI bubble.
      return (
        <>
          <div className={styles.animAgent} aria-hidden>
            <div className={styles.animAgentUserMsg}>
              When&apos;s my next payment?
            </div>
            <div className={styles.animAgentTyping}>
              <span /><span /><span />
            </div>
            <div className={styles.animAgentAiMsg}>
              <span className={`${styles.animAgentSparkle} ${styles.animAgentSparkle1}`}>✦</span>
              <span className={`${styles.animAgentSparkle} ${styles.animAgentSparkle2}`}>✦</span>
              <span className={`${styles.animAgentSparkle} ${styles.animAgentSparkle3}`}>✦</span>
              Apr 15. Want auto-pay?
            </div>
            <div className={styles.animAgentActions}>
              <span className={styles.animAgentActionPrimary}>Yes</span>
              <span className={styles.animAgentActionSecondary}>Skip</span>
            </div>
          </div>
          <div className={styles.animAgentMobile} aria-hidden>
            <div className={styles.animAgentMobileDot} />
            <div className={styles.animAgentMobileDot} />
            <div className={styles.animAgentMobileDot} />
          </div>
        </>
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

      {/* Mid-card animations removed — keeping the sub-cards clean
          with just label + title + subtitle + "Learn more →".
          The MidAnimation function and its CSS are kept in this file
          and landing.module.css for potential future reuse, but not
          rendered. */}

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
