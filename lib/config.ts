import fs from "fs";
import path from "path";

// Read config.json from the current working directory
const configPath = path.join(process.cwd(), "config.json");

export interface Config {
  resendApiKey: string;
  allowedEmailSuffixes: string[];
  nextAuthUrl: string;
  nextAuthSecret: string;
  mongoDbUri: string;
}

let configFile: Config;
try {
  const fileContent = fs.readFileSync(configPath, "utf-8");
  configFile = JSON.parse(fileContent) as Config;
} catch (error) {
  console.error(`Error loading config from ${configPath}:`, error);
  throw new Error(
    "Failed to load config.json. Please ensure it exists in the root directory.",
  );
}

export const config: Config = {
  resendApiKey: configFile.resendApiKey,
  allowedEmailSuffixes: configFile.allowedEmailSuffixes,
  nextAuthUrl: configFile.nextAuthUrl,
  nextAuthSecret: configFile.nextAuthSecret,
  mongoDbUri: configFile.mongoDbUri,
};

// Inject into process.env for third-party libraries (e.g., NextAuth) that require env vars
process.env.NEXTAUTH_SECRET = config.nextAuthSecret;
process.env.NEXTAUTH_URL = config.nextAuthUrl;
