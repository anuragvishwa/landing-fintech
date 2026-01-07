"use client";

import { AnimatePresence } from "framer-motion";
import { VideoOrchestrator } from "@/lib/video/useVideoOrchestrator";
import { videoScript } from "@/lib/video/script";
import { SceneTransition } from "../video/SceneTransition";
import { SceneProps } from "@/lib/video/types";

// Comparison scene imports
import { CompareIntroScene } from "./scenes/CompareIntroScene";
import { CompareTaxSetupScene } from "./scenes/CompareTaxSetupScene";
import { ComparePaymentFailureScene } from "./scenes/ComparePaymentFailureScene";
import { CompareIntegrationScene } from "./scenes/CompareIntegrationScene";
import { CompareOutroScene } from "./scenes/CompareOutroScene";

const COMPARE_SCENE_COMPONENTS: Record<string, React.ComponentType<SceneProps>> =
  {
    intro: CompareIntroScene,
    "tax-setup": CompareTaxSetupScene,
    "payment-failure": ComparePaymentFailureScene,
    "integration-preflight": CompareIntegrationScene,
    outro: CompareOutroScene,
  };

interface CompareStageProps {
  orchestrator: VideoOrchestrator;
}

export function CompareStage({ orchestrator }: CompareStageProps) {
  const { currentSceneId, currentSceneTime, currentPhase, currentAction } =
    orchestrator;
  const SceneComponent = COMPARE_SCENE_COMPONENTS[currentSceneId];
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
