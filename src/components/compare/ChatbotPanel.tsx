"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

interface ChatbotPanelProps {
  sceneTime: number;
  userMessage: string;
  botResponse: string;
  userTypingStart: number; // ms when user starts typing
  userTypingDuration: number; // ms for user to finish typing
  botTypingStart: number; // ms when bot starts "thinking"
  botTypingDuration: number; // ms for bot typing indicator
  botResponseStart: number; // ms when bot response starts streaming
  botResponseDuration: number; // ms to stream full response
  readingTimeSeconds: number;
  isSuccess?: boolean;
}

export function ChatbotPanel({
  sceneTime,
  userMessage,
  botResponse,
  userTypingStart,
  userTypingDuration,
  botTypingStart,
  botTypingDuration,
  botResponseStart,
  botResponseDuration,
  readingTimeSeconds,
  isSuccess = false,
}: ChatbotPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Calculate what to show based on timing
  const isUserTyping =
    sceneTime >= userTypingStart &&
    sceneTime < userTypingStart + userTypingDuration;
  const showUserMessage = sceneTime >= userTypingStart + userTypingDuration;
  const isBotTyping =
    sceneTime >= botTypingStart &&
    sceneTime < botTypingStart + botTypingDuration;
  const showBotResponse = sceneTime >= botResponseStart;

  // Calculate user typing progress
  const userTypingProgress = isUserTyping
    ? Math.min(1, (sceneTime - userTypingStart) / userTypingDuration)
    : showUserMessage
      ? 1
      : 0;
  const displayedUserText = userMessage.slice(
    0,
    Math.floor(userMessage.length * userTypingProgress)
  );

  // Calculate bot response streaming progress
  const botStreamProgress = showBotResponse
    ? Math.min(1, (sceneTime - botResponseStart) / botResponseDuration)
    : 0;
  const displayedBotText = botResponse.slice(
    0,
    Math.floor(botResponse.length * botStreamProgress)
  );

  // Calculate reading time remaining
  const readingStartTime = botResponseStart + botResponseDuration;
  const totalReadingTime = readingTimeSeconds * 1000;
  const readingElapsed = Math.max(0, sceneTime - readingStartTime);
  const readingRemaining = Math.max(
    0,
    Math.ceil((totalReadingTime - readingElapsed) / 1000)
  );
  const showReadingIndicator =
    sceneTime >= readingStartTime && readingRemaining > 0 && !isSuccess;

  // Auto-scroll to bottom as content streams
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedBotText]);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-secondary-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary-100 border-b border-secondary-200">
        <div className="w-8 h-8 rounded-full bg-secondary-300 flex items-center justify-center">
          <Bot className="w-4 h-4 text-secondary-600" />
        </div>
        <span className="font-medium text-secondary-700 text-sm">
          Traditional Chatbot
        </span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary-50/50">
        {/* User message */}
        {(isUserTyping || showUserMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="bg-primary-500 text-white px-4 py-2 rounded-2xl rounded-tr-md text-sm">
                {displayedUserText}
                {isUserTyping && (
                  <span className="inline-block w-0.5 h-4 bg-white ml-0.5 animate-pulse" />
                )}
              </div>
              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-primary-600" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Bot typing indicator */}
        {isBotTyping && !showBotResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-secondary-500" />
              </div>
              <div className="bg-white border border-secondary-200 px-4 py-3 rounded-2xl rounded-tl-md">
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 bg-secondary-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0,
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-secondary-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0.2,
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-secondary-400 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0.4,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bot response */}
        {showBotResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start gap-2 max-w-[95%]">
              <div className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3 h-3 text-secondary-500" />
              </div>
              <div className="bg-white border border-secondary-200 px-4 py-3 rounded-2xl rounded-tl-md">
                <div className="text-sm text-secondary-700 whitespace-pre-wrap leading-relaxed">
                  {displayedBotText}
                  {botStreamProgress < 1 && (
                    <span className="inline-block w-0.5 h-4 bg-secondary-400 ml-0.5 animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer with reading time */}
      <div className="px-4 py-3 bg-secondary-100 border-t border-secondary-200">
        {showReadingIndicator ? (
          <div className="flex items-center gap-2 text-sm text-secondary-500">
            <motion.div
              className="w-4 h-4 border-2 border-secondary-300 border-t-secondary-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Reading documentation... ~{readingRemaining}s remaining</span>
          </div>
        ) : isSuccess ? (
          <div className="text-sm text-secondary-400">
            User still reading instructions...
          </div>
        ) : (
          <div className="text-sm text-secondary-400">
            Estimated reading time: ~{readingTimeSeconds} seconds
          </div>
        )}
      </div>
    </div>
  );
}
