import { VideoScript, SceneDefinition } from "./types";

// Helper to calculate total duration from scenes
function calculateTotalDuration(scenes: SceneDefinition[]): number {
  return scenes.reduce((total, scene) => total + scene.duration, 0);
}

// Scene definitions - 3 main scenarios with detailed step-by-step guidance
const scenes: SceneDefinition[] = [
  // SCENE 0: INTRO (5 seconds)
  {
    id: "intro",
    name: "Introduction",
    duration: 5000,
    transition: { in: "fade", out: "fade", duration: 500 },
    actions: [
      {
        id: "logo-in",
        phase: "entering",
        startTime: 0,
        duration: 800,
        description: "Flexdash logo animates in",
      },
      {
        id: "tagline",
        phase: "setup",
        startTime: 1000,
        duration: 1500,
        description: "Tagline appears",
      },
      {
        id: "context",
        phase: "setup",
        startTime: 2800,
        duration: 1700,
        description: "Context text fades in",
      },
    ],
  },

  // SCENE 1: TAX SETUP (20 seconds) - Hero-like interactive flow
  {
    id: "tax-setup",
    name: "Tax Setup",
    duration: 20000,
    transition: { in: "slide-left", out: "fade", duration: 500 },
    actions: [
      // Screen appears
      {
        id: "screen-appear",
        phase: "entering",
        startTime: 0,
        duration: 1000,
        description: "Tax settings screen slides in",
      },
      // User types question in floating command bar
      {
        id: "user-question",
        phase: "user-input",
        startTime: 1000,
        duration: 2000,
        description: 'User types: "How do I set up tax rules?"',
        data: { text: "How do I set up tax rules?" },
      },
      // Show options (Show me how / Just tell me)
      {
        id: "show-options",
        phase: "user-input",
        startTime: 3000,
        duration: 500,
        description: "Show options: Show me how / Just tell me",
      },
      // Selecting "Show me how"
      {
        id: "selecting",
        phase: "ai-analyzing",
        startTime: 3500,
        duration: 500,
        description: "User selects Show me how",
      },
      // AI scanning overlay (purple sweep)
      {
        id: "analyzing",
        phase: "ai-analyzing",
        startTime: 4000,
        duration: 1500,
        description: "AI scans the UI with purple overlay",
      },
      // Generating guidance with progress bar
      {
        id: "generating-guidance",
        phase: "ai-analyzing",
        startTime: 5500,
        duration: 1500,
        description: "Generating guidance with progress bar",
      },
      // Steps reveal one by one (floating card)
      {
        id: "reveal-step-1",
        phase: "ai-responding",
        startTime: 7000,
        duration: 600,
        description: "Step 1 reveals: Go to Tax Settings",
      },
      {
        id: "reveal-step-2",
        phase: "ai-responding",
        startTime: 7600,
        duration: 600,
        description: "Step 2 reveals: Click Add Tax Rule",
      },
      {
        id: "reveal-step-3",
        phase: "ai-responding",
        startTime: 8200,
        duration: 600,
        description: "Step 3 reveals: Select jurisdiction & rate",
      },
      // Execute steps with element highlighting
      {
        id: "execute-step-1",
        phase: "executing",
        startTime: 9000,
        duration: 3000,
        description: "Execute step 1 - navigate highlight",
        data: { step: 1 },
      },
      {
        id: "execute-step-2",
        phase: "executing",
        startTime: 12000,
        duration: 3000,
        description: "Execute step 2 - highlight Tax ID field, fill value",
        data: { step: 2, field: "taxId" },
      },
      {
        id: "execute-step-3",
        phase: "executing",
        startTime: 15000,
        duration: 2500,
        description: "Execute step 3 - highlight footer, fill value",
        data: { step: 3, field: "footer" },
      },
      // Success celebration
      {
        id: "success-state",
        phase: "success",
        startTime: 17500,
        duration: 2500,
        description: "Success sparkles, all fields green",
      },
    ],
  },

  // SCENE 2: PAYMENT FAILURE (20 seconds) - Hero-like interactive flow
  {
    id: "payment-failure",
    name: "Payment Failure",
    duration: 20000,
    transition: { in: "slide-left", out: "fade", duration: 500 },
    actions: [
      // Screen appears with error
      {
        id: "screen-appear",
        phase: "entering",
        startTime: 0,
        duration: 1000,
        description: "Payment screen with error slides in",
      },
      // User types question in floating command bar
      {
        id: "user-question",
        phase: "user-input",
        startTime: 1000,
        duration: 2000,
        description: 'User types: "Why did my payment fail?"',
        data: { text: "Why did my payment fail?" },
      },
      // Show options (Show me how / Just tell me)
      {
        id: "show-options",
        phase: "user-input",
        startTime: 3000,
        duration: 500,
        description: "Show options: Show me how / Just tell me",
      },
      // Selecting "Show me how"
      {
        id: "selecting",
        phase: "ai-analyzing",
        startTime: 3500,
        duration: 500,
        description: "User selects Show me how",
      },
      // AI scanning overlay (purple sweep)
      {
        id: "analyzing",
        phase: "ai-analyzing",
        startTime: 4000,
        duration: 1500,
        description: "AI scans the UI with purple overlay",
      },
      // Generating guidance with progress bar
      {
        id: "generating-guidance",
        phase: "ai-analyzing",
        startTime: 5500,
        duration: 1500,
        description: "Generating guidance with progress bar",
      },
      // Diagnosis and steps reveal (floating card)
      {
        id: "show-diagnosis",
        phase: "ai-responding",
        startTime: 7000,
        duration: 500,
        description: "Shows card expired diagnosis",
      },
      {
        id: "reveal-step-1",
        phase: "ai-responding",
        startTime: 7500,
        duration: 600,
        description: "Step 1 reveals: Check card status",
      },
      {
        id: "reveal-step-2",
        phase: "ai-responding",
        startTime: 8100,
        duration: 600,
        description: "Step 2 reveals: Update card details",
      },
      {
        id: "reveal-step-3",
        phase: "ai-responding",
        startTime: 8700,
        duration: 600,
        description: "Step 3 reveals: Retry payment",
      },
      // Execute steps with element highlighting
      {
        id: "execute-step-1",
        phase: "executing",
        startTime: 9500,
        duration: 2500,
        description: "Execute step 1 - highlight card, show expired status",
        data: { step: 1, field: "card-status" },
      },
      {
        id: "execute-step-2",
        phase: "executing",
        startTime: 12000,
        duration: 3000,
        description: "Execute step 2 - show card update form, enter new expiry",
        data: { step: 2, field: "card-update" },
      },
      {
        id: "execute-step-3",
        phase: "executing",
        startTime: 15000,
        duration: 2500,
        description: "Execute step 3 - click retry, show processing",
        data: { step: 3, field: "retry" },
      },
      // Success celebration
      {
        id: "success-state",
        phase: "success",
        startTime: 17500,
        duration: 2500,
        description: "Success sparkles, payment successful",
      },
    ],
  },

  // SCENE 3: INTEGRATION PREFLIGHT (20 seconds) - Hero-like interactive flow
  {
    id: "integration-preflight",
    name: "Integrations",
    duration: 20000,
    transition: { in: "slide-left", out: "fade", duration: 500 },
    actions: [
      // Screen appears
      {
        id: "screen-appear",
        phase: "entering",
        startTime: 0,
        duration: 1000,
        description: "Stripe integration panel slides in",
      },
      // User types question in floating command bar
      {
        id: "user-question",
        phase: "user-input",
        startTime: 1000,
        duration: 2000,
        description: 'User types: "How do I connect Stripe?"',
        data: { text: "How do I connect Stripe?" },
      },
      // Show options (Show me how / Just tell me)
      {
        id: "show-options",
        phase: "user-input",
        startTime: 3000,
        duration: 500,
        description: "Show options: Show me how / Just tell me",
      },
      // Selecting "Show me how"
      {
        id: "selecting",
        phase: "ai-analyzing",
        startTime: 3500,
        duration: 500,
        description: "User selects Show me how",
      },
      // AI scanning overlay (purple sweep)
      {
        id: "analyzing",
        phase: "ai-analyzing",
        startTime: 4000,
        duration: 1500,
        description: "AI scans the UI with purple overlay",
      },
      // Generating guidance with progress bar
      {
        id: "generating-guidance",
        phase: "ai-analyzing",
        startTime: 5500,
        duration: 1500,
        description: "Running preflight checks...",
      },
      // Preflight checks one by one (7000-10000ms)
      {
        id: "check-api-key",
        phase: "ai-analyzing",
        startTime: 7000,
        duration: 1000,
        description: "Checking API Key... PASS",
        data: { check: "api-key", status: "pass" },
      },
      {
        id: "check-oauth",
        phase: "ai-analyzing",
        startTime: 8000,
        duration: 1000,
        description: "Checking OAuth Scopes... PASS",
        data: { check: "oauth", status: "pass" },
      },
      {
        id: "check-webhook",
        phase: "ai-analyzing",
        startTime: 9000,
        duration: 1000,
        description: "Checking Webhook URL... FAIL",
        data: { check: "webhook", status: "fail" },
      },
      // Show fix guidance with floating panel
      {
        id: "show-fix-guidance",
        phase: "ai-responding",
        startTime: 10000,
        duration: 500,
        description: "Shows webhook fix instructions",
      },
      // Reveal fix steps
      {
        id: "reveal-fix-step-1",
        phase: "ai-responding",
        startTime: 10500,
        duration: 700,
        description: "Step 1 reveals: Copy webhook URL",
      },
      {
        id: "reveal-fix-step-2",
        phase: "ai-responding",
        startTime: 11200,
        duration: 800,
        description: "Step 2 reveals: Add to Stripe dashboard",
      },
      // Execute fix steps with element highlighting
      {
        id: "execute-step-1",
        phase: "executing",
        startTime: 12000,
        duration: 2500,
        description: "Execute step 1 - highlight webhook field, copy URL",
        data: { step: 1, field: "webhook-url" },
      },
      {
        id: "execute-step-2",
        phase: "executing",
        startTime: 14500,
        duration: 2500,
        description: "Execute step 2 - show URL being entered",
        data: { step: 2, field: "webhook-input" },
      },
      // Rerun check
      {
        id: "recheck-webhook",
        phase: "executing",
        startTime: 17000,
        duration: 1000,
        description: "Re-verifying webhook check... PASS",
        data: { check: "webhook", status: "pass" },
      },
      // Success celebration
      {
        id: "success-state",
        phase: "success",
        startTime: 18000,
        duration: 2000,
        description: "Success sparkles, Stripe connected",
      },
    ],
  },

  // SCENE 4: OUTRO (5 seconds)
  {
    id: "outro",
    name: "Closing",
    duration: 5000,
    transition: { in: "morph", out: "fade", duration: 700 },
    actions: [
      {
        id: "summary",
        phase: "entering",
        startTime: 0,
        duration: 2000,
        description: "Summary stats animate",
      },
      {
        id: "cta",
        phase: "setup",
        startTime: 2200,
        duration: 2000,
        description: "CTA appears",
      },
      {
        id: "logo-out",
        phase: "exiting",
        startTime: 4200,
        duration: 500,
        description: "Logo fade",
      },
    ],
  },
];

// Calculate total duration dynamically from scenes
const totalDuration = calculateTotalDuration(scenes);

export const videoScript: VideoScript = {
  totalDuration, // 70 seconds (5 + 20 + 20 + 20 + 5)
  fps: 60,
  resolution: {
    width: 1920,
    height: 1080,
  },
  globalTransitionDuration: 0, // No gaps between scenes - smoother playback
  scenes,
};

// Helper to get scene by ID
export function getSceneById(id: string): SceneDefinition | undefined {
  return videoScript.scenes.find((s) => s.id === id);
}

// Helper to get cumulative start time for a scene
export function getSceneStartTime(sceneId: string): number {
  let cumulative = 0;
  for (const scene of videoScript.scenes) {
    if (scene.id === sceneId) return cumulative;
    cumulative += scene.duration;
  }
  return cumulative;
}

// Helper to format time in mm:ss
export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
