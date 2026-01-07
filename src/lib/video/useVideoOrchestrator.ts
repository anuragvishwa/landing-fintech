"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { videoScript } from "./script";
import { ScenePhase, SceneAction } from "./types";

export interface OrchestratorState {
  isPlaying: boolean;
  currentTime: number; // Global time in ms
  currentSceneId: string;
  currentSceneIndex: number;
  currentSceneTime: number; // Time within current scene
  currentPhase: ScenePhase;
  currentAction: SceneAction | null;
  progress: number; // 0-100
  sceneProgress: number; // 0-100 within scene
}

export interface VideoOrchestrator extends OrchestratorState {
  play: () => void;
  pause: () => void;
  reset: () => void;
  seekTo: (time: number) => void;
  totalDuration: number;
  scenes: typeof videoScript.scenes;
}

export function useVideoOrchestrator(): VideoOrchestrator {
  const [state, setState] = useState<OrchestratorState>({
    isPlaying: false,
    currentTime: 0,
    currentSceneId: "intro",
    currentSceneIndex: 0,
    currentSceneTime: 0,
    currentPhase: "entering",
    currentAction: null,
    progress: 0,
    sceneProgress: 0,
  });

  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Calculate current state from global time
  const calculateState = useCallback(
    (globalTime: number): Partial<OrchestratorState> => {
      let cumulativeTime = 0;

      for (let i = 0; i < videoScript.scenes.length; i++) {
        const scene = videoScript.scenes[i];
        const sceneEnd = cumulativeTime + scene.duration;

        if (globalTime < sceneEnd) {
          const sceneTime = globalTime - cumulativeTime;

          // Find current action
          let currentAction: SceneAction | null = null;
          let currentPhase: ScenePhase = "entering";

          for (const action of scene.actions) {
            if (
              sceneTime >= action.startTime &&
              sceneTime < action.startTime + action.duration
            ) {
              currentAction = action;
              currentPhase = action.phase;
              break;
            }
          }

          // If no action found but we're past all actions, use the last one's phase
          if (!currentAction && scene.actions.length > 0) {
            const lastAction = scene.actions[scene.actions.length - 1];
            if (sceneTime >= lastAction.startTime + lastAction.duration) {
              currentPhase = lastAction.phase;
            }
          }

          return {
            currentSceneId: scene.id,
            currentSceneIndex: i,
            currentSceneTime: sceneTime,
            currentPhase,
            currentAction,
            progress: (globalTime / videoScript.totalDuration) * 100,
            sceneProgress: (sceneTime / scene.duration) * 100,
          };
        }

        cumulativeTime = sceneEnd + videoScript.globalTransitionDuration;
      }

      // Video complete
      return {
        currentSceneId: "outro",
        currentSceneIndex: videoScript.scenes.length - 1,
        progress: 100,
        isPlaying: false,
      };
    },
    []
  );

  // Animation frame loop
  const tick = useCallback(() => {
    const elapsed =
      performance.now() - startTimeRef.current + pausedTimeRef.current;
    const newState = calculateState(elapsed);

    setState((prev) => ({
      ...prev,
      ...newState,
      currentTime: elapsed,
      isPlaying: elapsed < videoScript.totalDuration,
    }));

    if (elapsed < videoScript.totalDuration) {
      frameRef.current = requestAnimationFrame(tick);
    }
  }, [calculateState]);

  // Play control
  const play = useCallback(() => {
    startTimeRef.current = performance.now();
    setState((prev) => ({ ...prev, isPlaying: true }));
    frameRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // Pause control
  const pause = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    pausedTimeRef.current = state.currentTime;
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, [state.currentTime]);

  // Reset control
  const reset = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    pausedTimeRef.current = 0;
    setState({
      isPlaying: false,
      currentTime: 0,
      currentSceneId: "intro",
      currentSceneIndex: 0,
      currentSceneTime: 0,
      currentPhase: "entering",
      currentAction: null,
      progress: 0,
      sceneProgress: 0,
    });
  }, []);

  // Seek to specific time
  const seekTo = useCallback(
    (time: number) => {
      pausedTimeRef.current = time;
      const newState = calculateState(time);
      setState((prev) => ({
        ...prev,
        ...newState,
        currentTime: time,
      }));
    },
    [calculateState]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    ...state,
    play,
    pause,
    reset,
    seekTo,
    totalDuration: videoScript.totalDuration,
    scenes: videoScript.scenes,
  };
}
