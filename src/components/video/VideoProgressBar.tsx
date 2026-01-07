"use client";

import { motion } from "framer-motion";
import { videoScript, formatTime } from "@/lib/video/script";
import { VideoOrchestrator } from "@/lib/video/useVideoOrchestrator";

interface VideoProgressBarProps {
  orchestrator: VideoOrchestrator;
}

export function VideoProgressBar({ orchestrator }: VideoProgressBarProps) {
  const { progress, currentSceneId, scenes, currentTime } = orchestrator;

  // Handle click to seek
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const targetTime = (percentage / 100) * videoScript.totalDuration;
    orchestrator.seekTo(targetTime);
  };

  // Calculate scene markers
  let cumulativePercent = 0;
  const markers = scenes.map((scene) => {
    const startPercent = cumulativePercent;
    const scenePercent = (scene.duration / videoScript.totalDuration) * 100;
    cumulativePercent += scenePercent;
    return {
      id: scene.id,
      name: scene.name,
      startPercent,
      width: scenePercent,
    };
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent">
      <div className="absolute bottom-6 left-8 right-8">
        {/* Scene labels */}
        <div className="flex mb-2">
          {markers.map((marker) => (
            <div
              key={marker.id}
              style={{ width: `${marker.width}%` }}
              className={`text-xs truncate px-1 transition-colors duration-300 ${
                marker.id === currentSceneId
                  ? "text-white font-medium"
                  : "text-white/50"
              }`}
            >
              {marker.name}
            </div>
          ))}
        </div>

        {/* Progress track */}
        <div
          className="relative h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm cursor-pointer"
          onClick={handleProgressClick}
        >
          {/* Scene segment indicators */}
          <div className="absolute inset-0 flex">
            {markers.map((marker, i) => (
              <div
                key={marker.id}
                style={{ width: `${marker.width}%` }}
                className={`h-full border-r border-white/20 last:border-r-0 transition-colors duration-300 ${
                  marker.id === currentSceneId ? "bg-white/10" : ""
                }`}
              />
            ))}
          </div>

          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />

          {/* Playhead */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary-500"
            style={{ left: `${progress}%`, marginLeft: -8 }}
          />
        </div>

        {/* Time display */}
        <div className="flex justify-between mt-2 text-xs text-white/70 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(videoScript.totalDuration)}</span>
        </div>
      </div>
    </div>
  );
}
