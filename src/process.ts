
type ENV_TYPE = "production" | "development" | "watch";

interface Process {
  env: ProcessEnv;
}

export interface ProcessEnv {
  [key: string]: ENV_TYPE;
}

export const getNodeEnv = (): ENV_TYPE => {
  if (!process) return "production";
  return ((process as Process).env as ProcessEnv)["NODE_ENV"];
};

export const isProduction = (): boolean => true; // getNodeEnv() === "production";
