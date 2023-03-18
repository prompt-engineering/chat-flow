export const hadChildRoutes = ["click-flow", "chatgpt-samples"];

export const pages = ["/", "/chatgpt/", "/click-flow/", "/click-flow/$"] as const;

export type PagePath = (typeof pages)[number];
