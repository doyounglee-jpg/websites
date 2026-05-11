import LandingStage from "./components/LandingStage";

// Root URL ("/") shows the new Clerkie / Fiber landing - a two-panel
// split where each side expands into its sub-products on click.
// Previously this redirected to /members; that route still works directly.
export default function Home() {
  return <LandingStage />;
}
