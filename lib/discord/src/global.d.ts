export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      DISCORD_CLIENT_TOKEN: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      DISCORD_REDIRECT_URI: string
      DISCORD_APP_ENV: string
    }
  }
}
