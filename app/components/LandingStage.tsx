"use client";

// `'use client'` is required because this component owns interaction
// state (which side is expanded, animation locks, sub-column visibility).
// All state and the click/keyboard handlers live here; Panel and SubColumn
// are presentational and just receive props.

import { useCallback, useEffect, useState } from "react";
import Panel from "./Panel";
import type { SubColumnData } from "./SubColumn";
import styles from "./landing.module.css";

// Animation timings. Mostly copied from the prototype, with one tuned
// value: backBtnDelay is computed per-side instead of a fixed 1000ms,
// so the back button slots in on the same 130ms beat as the cols
// (matches the user's request for a consistent tempo).
const TIMING = {
  titleFadeDelay: 200,    // when the big initial title fades out
  colStaggerStart: 500,   // when the first sub-col starts sliding in
  colStaggerStep: 130,    // gap between successive sub-cols (also used
                          //   to time the back button — see expand())
  collapseDuration: 1200, // total reverse animation length
  titleReturnDelay: 350,  // when the initial title fades back in
  panelReturnDelay: 400,  // when panels slide back to 50/50
  colCollapseStep: 60,    // faster stagger on collapse (60ms vs 130ms)
};

// Sub-column copy. Keeping this here (not in Panel) so the parent can
// know how many cols each side has — needed for the stagger loop.
const CLERKIE_COLS: SubColumnData[] = [
  {
    key: "members",
    label: "CLERKIE · MEMBERS",
    title: "Members",
    subtitle: "Take control of what you owe with personalized plans.",
    href: "/members",
    accentColor: "var(--clerkie-accent-members)",
    accentTextColor: "var(--clerkie-accent-members-text)",
  },
  {
    key: "companies",
    label: "CLERKIE · COMPANIES",
    title: "Companies",
    subtitle: "Help your members thrive with financial wellness tools.",
    href: "/companies",
    accentColor: "var(--clerkie-accent-companies)",
    accentTextColor: "var(--clerkie-accent-companies-text)",
  },
];

const FIBER_COLS: SubColumnData[] = [
  {
    key: "crm",
    label: "FIBER · CRM",
    title: "CRM",
    subtitle: "A modern recovery management platform.",
    href: "/fiber/crm",
    accentColor: "var(--fiber-accent-crm)",
    accentTextColor: "var(--fiber-accent-crm-text)",
  },
  {
    key: "ims",
    label: "FIBER · IMS",
    title: "IMS",
    subtitle: "A fully-integrated inventory management system.",
    href: "/fiber/ims",
    accentColor: "var(--fiber-accent-ims)",
    accentTextColor: "var(--fiber-accent-ims-text)",
  },
  {
    key: "agent",
    label: "FIBER · AI AGENT",
    title: "AI Agent",
    subtitle: "An intelligent agent for seamless collections.",
    href: "/fiber/ai-agent",
    accentColor: "var(--fiber-accent-agent)",
    accentTextColor: "var(--fiber-accent-agent-text)",
  },
];

type Side = "clerkie" | "fiber";

export default function LandingStage() {
  // Which side is currently expanded — null when both panels are at 50/50.
  const [expanded, setExpanded] = useState<Side | null>(null);
  // Lock that prevents another click from being processed while an
  // expand or collapse animation is in flight (matches prototype).
  const [isAnimating, setIsAnimating] = useState(false);
  // Whether the expanded panel's big initial title has been faded out.
  const [titleHidden, setTitleHidden] = useState(false);
  // Indices of the sub-columns currently slid-in (on the expanded side).
  const [activeCols, setActiveCols] = useState<number[]>([]);
  // Whether the back button is in its visible state.
  const [backVisible, setBackVisible] = useState(false);

  const expand = useCallback(
    (side: Side) => {
      // Same guard the prototype has: ignore if anything's already expanded
      // or if we're mid-animation.
      if (expanded || isAnimating) return;
      setIsAnimating(true);
      setExpanded(side);

      // 200ms — fade out the big title.
      setTimeout(() => setTitleHidden(true), TIMING.titleFadeDelay);

      // 500ms / 630ms / 760ms — sub-cols slide in, leftmost first.
      const colCount =
        side === "clerkie" ? CLERKIE_COLS.length : FIBER_COLS.length;
      for (let i = 0; i < colCount; i++) {
        setTimeout(
          () => {
            setActiveCols((prev) =>
              prev.includes(i) ? prev : [...prev, i],
            );
          },
          TIMING.colStaggerStart + i * TIMING.colStaggerStep,
        );
      }

      // Back button appears one stagger-step after the last col, so it
      // slots into the same 130ms rhythm as the cols themselves.
      // Clerkie (2 cols): 500 + 2*130 = 760ms.
      // Fiber  (3 cols): 500 + 3*130 = 890ms.
      const backBtnDelay =
        TIMING.colStaggerStart + colCount * TIMING.colStaggerStep;
      setTimeout(() => {
        setBackVisible(true);
        setIsAnimating(false);
      }, backBtnDelay);
    },
    [expanded, isAnimating],
  );

  const collapse = useCallback(() => {
    if (!expanded || isAnimating) return;
    setIsAnimating(true);
    setBackVisible(false);

    // Sub-cols slide out leftmost-first with a faster (60ms) stagger.
    const colCount =
      expanded === "clerkie" ? CLERKIE_COLS.length : FIBER_COLS.length;
    for (let i = 0; i < colCount; i++) {
      setTimeout(
        () => {
          setActiveCols((prev) => prev.filter((x) => x !== i));
        },
        i * TIMING.colCollapseStep,
      );
    }

    // 350ms — initial title fades back in.
    setTimeout(() => setTitleHidden(false), TIMING.titleReturnDelay);

    // 400ms — panels slide back to 50/50 (clearing `expanded` removes
    // the .isExpanded / .isCollapsed classes).
    setTimeout(() => setExpanded(null), TIMING.panelReturnDelay);

    // 1200ms — animation lock releases, ready for next click.
    setTimeout(() => setIsAnimating(false), TIMING.collapseDuration);
  }, [expanded, isAnimating]);

  // ESC key collapses an expanded panel — matches the prototype.
  // (Future accessibility pass in step 6 will add Enter/Space activation
  // for the panels themselves.)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) collapse();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded, collapse]);

  return (
    <div className={styles.stage}>
      <Panel
        side="clerkie"
        cols={CLERKIE_COLS}
        expanded={expanded === "clerkie"}
        collapsed={expanded === "fiber"}
        titleHidden={expanded === "clerkie" && titleHidden}
        activeCols={expanded === "clerkie" ? activeCols : []}
        backVisible={expanded === "clerkie" && backVisible}
        onExpand={() => expand("clerkie")}
        onCollapse={collapse}
      />
      <Panel
        side="fiber"
        cols={FIBER_COLS}
        expanded={expanded === "fiber"}
        collapsed={expanded === "clerkie"}
        titleHidden={expanded === "fiber" && titleHidden}
        activeCols={expanded === "fiber" ? activeCols : []}
        backVisible={expanded === "fiber" && backVisible}
        onExpand={() => expand("fiber")}
        onCollapse={collapse}
      />
    </div>
  );
}
