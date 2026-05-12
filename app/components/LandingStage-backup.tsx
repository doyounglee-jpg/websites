"use client";

// BACKUP COPY — unmodified snapshot of LandingStage.tsx taken before
// the branded redesign. Imports the *-backup sibling files (Panel-backup,
// SubColumn-backup, landing-backup.module.css) so it's fully isolated
// from the live version. Mounted at /split-backup for side-by-side
// comparison with the new branded landing at /.
//
// Edit LandingStage.tsx, NOT this file, if you want changes reflected
// in the live page.

import { useCallback, useEffect, useState } from "react";
import Panel from "./Panel-backup";
import type { SubColumnData } from "./SubColumn-backup";
import styles from "./landing-backup.module.css";

const TIMING = {
  titleFadeDelay: 200,
  colStaggerStart: 500,
  colStaggerStep: 130,
  collapseDuration: 1200,
  titleReturnDelay: 350,
  panelReturnDelay: 400,
  colCollapseStep: 60,
};

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

export default function LandingStageBackup() {
  const [expanded, setExpanded] = useState<Side | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [titleHidden, setTitleHidden] = useState(false);
  const [activeCols, setActiveCols] = useState<number[]>([]);
  const [backVisible, setBackVisible] = useState(false);

  const expand = useCallback(
    (side: Side) => {
      if (expanded || isAnimating) return;
      setIsAnimating(true);
      setExpanded(side);

      setTimeout(() => setTitleHidden(true), TIMING.titleFadeDelay);

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

    setTimeout(() => setTitleHidden(false), TIMING.titleReturnDelay);
    setTimeout(() => setExpanded(null), TIMING.panelReturnDelay);
    setTimeout(() => setIsAnimating(false), TIMING.collapseDuration);
  }, [expanded, isAnimating]);

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
