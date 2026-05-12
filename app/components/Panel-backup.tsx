import SubColumn, { type SubColumnData } from "./SubColumn-backup";
import styles from "./landing-backup.module.css";

// BACKUP COPY — unmodified snapshot of Panel.tsx taken before the
// branded redesign. Imports the *-backup sibling files so it's fully
// isolated from the live version. Edit Panel.tsx, NOT this file, if
// you want changes reflected in the live page.

type PanelProps = {
  side: "clerkie" | "fiber";
  cols: SubColumnData[];
  expanded: boolean;
  collapsed: boolean;
  titleHidden: boolean;
  activeCols: number[];
  backVisible: boolean;
  onExpand: () => void;
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

  const panelClassName = [
    styles.panel,
    styles[side],
    expanded ? styles.isExpanded : "",
    collapsed ? styles.isCollapsed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handlePanelClick = () => {
    onExpand();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onExpand();
    }
  };

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
        </div>
      </div>

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
        ← Back
      </button>
    </div>
  );
}
