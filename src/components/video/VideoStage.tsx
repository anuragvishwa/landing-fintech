"use client";

import { AnimatePresence } from "framer-motion";
import { VideoOrchestrator } from "@/lib/video/useVideoOrchestrator";
import { videoScript } from "@/lib/video/script";
import { SceneTransition } from "./SceneTransition";
import { SceneProps } from "@/lib/video/types";

// Scene imports
import { IntroScene } from "./scenes/IntroScene";
import { TaxSetupScene } from "./scenes/TaxSetupScene";
import { PaymentFailureScene } from "./scenes/PaymentFailureScene";
import { IntegrationPreflightScene } from "./scenes/IntegrationPreflightScene";
import { OutroScene } from "./scenes/OutroScene";

const SCENE_COMPONENTS: Record<string, React.ComponentType<SceneProps>> = {
  intro: IntroScene,
  "tax-setup": TaxSetupScene,
  "payment-failure": PaymentFailureScene,
  "integration-preflight": IntegrationPreflightScene,
  outro: OutroScene,
};

interface VideoStageProps {
  orchestrator: VideoOrchestrator;
}

export function VideoStage({ orchestrator }: VideoStageProps) {
  const { currentSceneId, currentSceneTime, currentPhase, currentAction } =
    orchestrator;
  const SceneComponent = SCENE_COMPONENTS[currentSceneId];
  const sceneConfig = videoScript.scenes.find((s) => s.id === currentSceneId);

  if (!SceneComponent || !sceneConfig) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <SceneTransition
          key={currentSceneId}
          type={sceneConfig.transition.in}
          duration={sceneConfig.transition.duration}
        >
          <SceneComponent
            sceneTime={currentSceneTime}
            phase={currentPhase}
            currentAction={currentAction}
          />
        </SceneTransition>
      </AnimatePresence>
    </div>
  );
}
