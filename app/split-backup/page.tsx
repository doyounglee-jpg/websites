import LandingStageBackup from "../components/LandingStage-backup";

// /split-backup → renders the pre-redesign LandingStage so we can
// compare against the new branded version that lives at "/".
// This route exists only as a reference; the original landing stays
// at "/" via app/page.tsx. Delete this folder when the backup is no
// longer useful.
export default function SplitBackupPage() {
  return <LandingStageBackup />;
}
