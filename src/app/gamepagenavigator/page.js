import dynamic from "next/dynamic";

// Dynamically import the component and disable server-side rendering
const GamePageNavigator = dynamic(
  () => import("@/components/GamePageNavigator/GamePageNavigator"),
  { ssr: false }
);

export default function GameNavigatorPage() {
  return <GamePageNavigator />;
}
