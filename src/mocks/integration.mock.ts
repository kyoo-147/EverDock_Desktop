import { IntegrationItem } from "../features/integrations/IntegrationCard";

export const mockIntegrations: IntegrationItem[] = [
  { name: "GitHub", description: "Connect repositories, sync branches, pull requests, and commit histories.", connected: true, status: "Connected", icon: "GH" },
  { name: "Telegram Bot", description: "Receive instant progress updates, screenshots, and authorize high-risk actions from your phone.", connected: true, status: "Connected", icon: "TG" },
  { name: "Slack", description: "Send status notifications and authorization prompts to Slack channels.", connected: false, status: "Not Connected", icon: "SL" },
  { name: "Docker", description: "Manage agent containers, sandboxes, and development build testing environments.", connected: false, status: "Not Connected", icon: "DK" },
  { name: "Vercel", description: "Deploy app preview instances directly from agent sessions.", connected: false, status: "Not Connected", icon: "VC" }
];
