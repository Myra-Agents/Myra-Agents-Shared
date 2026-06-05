/**
 * Agent & settings types for the multi-backend agent system.
 */

export interface AgentPreset {
  id: string;
  name: string;
  binary: string;
  argsTemplate: string;
  workingDir?: string;
}

export interface AppSettings {
  defaultAgentId: string;
  agents: AgentPreset[];
  /** Maximum agents allowed to run concurrently. 0 = unlimited. */
  maxConcurrentAgents: number;
  defaultHomePage: "kanban" | "schedules" | "planner" | "logs";
  locale: "auto" | "en" | "fr";
  theme: "light" | "dark" | "system";
  /**
   * Folder names of installed plugins the user has switched off. A disabled
   * plugin contributes no agent presets (and, once the server dispatches bus
   * events to plugins, receives none). Omitted/empty = all enabled.
   */
  disabledPlugins?: string[];
}

/**
 * An installed plugin as surfaced by the `list_plugins` rpc. `name` is the
 * install identity — the plugin's folder name under `~/.myra-agents/plugins/`,
 * which is what {@link AppSettings.disabledPlugins} keys on.
 */
export interface PluginInfo {
  name: string;
  manifestName?: string;
  version?: string;
  /** `"agent"` (contributes presets) and/or `"event"` (exec + subscribes). */
  roles: ("agent" | "event")[];
  subscribes: string[];
  providesAgents: AgentPreset[];
  enabled: boolean;
}

export const DEFAULT_AGENT_PRESETS: AgentPreset[] = [
  {
    id: "opencode",
    name: "OpenCode",
    binary: "opencode",
    argsTemplate: "run {prompt} --dangerously-skip-permissions",
  },
  {
    id: "copilot",
    name: "GitHub Copilot CLI",
    binary: "copilot",
    argsTemplate: "-p {prompt} --yolo",
  },
  {
    id: "claude",
    name: "Claude CLI",
    binary: "claude",
    argsTemplate: "--dangerously-skip-permissions -p {prompt}",
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  defaultAgentId: "opencode",
  agents: DEFAULT_AGENT_PRESETS,
  maxConcurrentAgents: 2,
  defaultHomePage: "kanban",
  locale: "auto",
  theme: "system",
  disabledPlugins: [],
};
