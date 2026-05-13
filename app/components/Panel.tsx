import SubColumn, { type SubColumnData } from "./SubColumn";
import styles from "./landing.module.css";

// Panel is presentational — it receives state from LandingStage and
// renders the corresponding visual. State logic (timing, locks) is
// owned by the parent so both panels share one source of truth.

type PanelProps = {
  side: "clerkie" | "fiber";
  cols: SubColumnData[];
  // True when THIS panel is the expanded one.
  expanded: boolean;
  // True when this panel is the OTHER one (the one that shrinks to 0).
  collapsed: boolean;
  // True when this panel's big initial title should be faded out.
  titleHidden: boolean;
  // Indices of cols that have slid in. Other indices stay invisible.
  activeCols: number[];
  // True when this panel's back button should be visible.
  backVisible: boolean;
  // Click anywhere on the (collapsed) panel triggers this.
  onExpand: () => void;
  // Back button click triggers this.
  onCollapse: () => void;
};

const COPY = {
  clerkie: {
    label: "CONSUMER",
    title: "Clerkie",
    subtitle: "For consumers and benefit providers",
  },
  fiber: {
    label: "ENTERPRISE",
    title: "Fiber",
    subtitle: "For financial institutions and agencies",
  },
};

export default function Panel({
  side,
  cols,
  expanded,
  collapsed,
  titleHidden,
  activeCols,
  backVisible,
  onExpand,
  onCollapse,
}: PanelProps) {
  const copy = COPY[side];

  // Build the panel className. CSS Modules hash class names, so we read
  // them from the `styles` object and join.
  const panelClassName = [
    styles.panel,
    styles[side],
    expanded ? styles.isExpanded : "",
    collapsed ? styles.isCollapsed : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Panel-level click — the parent's `expand` is guarded (`if (expanded ||
  // isAnimating) return`), so it's safe to call unconditionally here.
  // Clicks inside cols (via `<Link>`) bubble up to here too, but the parent
  // guard makes that a no-op when expanded is already truthy.
  const handlePanelClick = () => {
    onExpand();
  };

  // Keyboard activation for the panel as a button. By default, a
  // div with role="button" doesn't auto-translate Enter/Space into a
  // click — we have to handle it manually. (Native <button> would do
  // this for us, but using <div> here keeps existing styling simpler
  // and matches the brief's "or have role='button' + tabindex='0'"
  // option.)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // stop Space from page-scrolling
      onExpand();
    }
  };

  // Panel is keyboard-focusable only at baseline (nothing expanded yet).
  // When expanded: not actionable, no focus needed.
  // When collapsed (the OTHER one is expanded): invisible, no focus.
  const isInteractive = !expanded && !collapsed;

  return (
    <div
      className={panelClassName}
      onClick={handlePanelClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isInteractive ? 0 : -1}
      aria-expanded={expanded}
      aria-label={`Open ${copy.title} products`}
    >
      <div
        className={[
          styles.panelInitial,
          titleHidden ? styles.isHidden : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.panelLabel}>{copy.label}</div>
        <div>
          <h1 className={styles.panelTitle}>{copy.title}</h1>
          <p className={styles.panelSubtitle}>{copy.subtitle}</p>
          {/* Hover-only product chips — previews what's behind the click.
              Each product is a glass pill. Hidden by default; the row
              fades + slides up via .panel:hover .panelProducts. */}
          <div className={styles.panelProducts} aria-hidden="true">
            {cols.map((c) => (
              <span key={c.key} className={styles.panelProductChip}>
                {c.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-columns are always in the DOM. They're invisible by default
          (opacity 0, pointer-events none) and slide in via .isActive when
          their index is included in activeCols. */}
      {cols.map((col, i) => (
        <SubColumn
          key={col.key}
          side={side}
          index={i}
          totalCols={cols.length}
          data={col}
          active={activeCols.includes(i)}
        />
      ))}

      {/* Back button — also always in the DOM. The .isVisible class fades
          it in. stopPropagation prevents the click from bubbling up to the
          panel (which would otherwise re-trigger expand, but that's
          guarded out anyway — belt and suspenders).
          tabIndex / aria-hidden flip with backVisible so keyboard and
          screen-reader users don't encounter the button while it's
          invisible. */}
      <button
        type="button"
        className={[
          styles.backBtn,
          backVisible ? styles.isVisible : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => {
          e.stopPropagation();
          onCollapse();
        }}
        tabIndex={backVisible ? 0 : -1}
        aria-hidden={!backVisible}
      >
        {/* Arrow + label in separate spans so flex align-items:center
            on the button vertically centers them as glyph boxes (the
            ← character renders at a slightly different vertical offset
            than alphabetic letters in most fonts). */}
        <span aria-hidden>←</span>
        <span>Back</span>
      </button>
    </div>
  );
}
