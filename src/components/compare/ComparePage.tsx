"use client";

import { useEffect } from "react";
import { useVideoOrchestrator } from "@/lib/video/useVideoOrchestrator";
import { CompareStage } from "./CompareStage";
import { VideoProgressBar } from "../video/VideoProgressBar";
import { Play, RotateCcw, Pause } from "lucide-react";

export function ComparePage() {
  const orchestrator = useVideoOrchestrator();

  // Auto-play on mount (after 1 second delay for recording setup)
  useEffect(() => {
    const timer = setTimeout(() => {
      orchestrator.play();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        orchestrator.isPlaying ? orchestrator.pause() : orchestrator.play();
      }
      if (e.code === "KeyR") {
        orchestrator.reset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orchestrator.isPlaying]);

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-primary-200/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main stage */}
      <CompareStage orchestrator={orchestrator} />

      {/* Progress bar at bottom */}
      <VideoProgressBar orchestrator={orchestrator} />

      {/* Developer controls (for testing - can be hidden during recording) */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-30 hover:opacity-100 transition-opacity z-50">
        <button
          onClick={orchestrator.reset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg text-xs font-medium text-secondary-700 hover:bg-white transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
        <button
          onClick={
            orchestrator.isPlaying ? orchestrator.pause : orchestrator.play
          }
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-medium hover:bg-primary-600 transition-colors shadow-sm"
        >
          {orchestrator.isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Play
            </>
          )}
        </button>
      </div>
    </div>
  );
}
