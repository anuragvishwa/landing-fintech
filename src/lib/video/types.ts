// Scene phase within a scenario
export type ScenePhase =
  | "entering" // Scene fading in
  | "setup" // Initial state before action
  | "user-input" // Simulated user typing/interaction
  | "ai-analyzing" // Flexdash analyzing
  | "ai-responding" // Flexdash showing guidance
  | "executing" // User following steps
  | "success" // Completion celebration
  | "exiting"; // Scene fading out

// Individual action within a phase
export interface SceneAction {
  id: string;
  phase: ScenePhase;
  startTime: number; // ms from scene start
  duration: number; // ms
  description: string; // For debugging/script reference
  data?: Record<string, unknown>; // Action-specific data
}

// Transition types
export type TransitionType =
  | "fade"
  | "slide-left"
  | "slide-right"
  | "zoom"
  | "morph"
  | "none";

// Complete scene definition
export interface SceneDefinition {
  id: string;
  name: string;
  duration: number; // Total scene duration in ms
  actions: SceneAction[];
  transition: {
    in: TransitionType;
    out: TransitionType;
    duration: number; // Transition duration in ms
  };
}

// Master video script
export interface VideoScript {
  totalDuration: number; // Total video length in ms
  fps: number; // Target framerate
  resolution: {
    width: number;
    height: number;
  };
  scenes: SceneDefinition[];
  globalTransitionDuration: number;
}

// Props passed to scene components
export interface SceneProps {
  sceneTime: number; // Time within this scene (ms)
  phase: ScenePhase;
  currentAction: SceneAction | null;
}
