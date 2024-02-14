// noinspection JSUnusedGlobalSymbols

declare namespace NodeJS {
  interface Process {
    env: {
      ADMIN_TOKEN: string
      ALCHEMY_API_KEY: string
      APP_URL: string
      CI: string
      DISCORD_CLIENT_TOKEN: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      ECHO_DISCORD_GUILD_ID: string
      ECHO_DISCORD_GUILD_CHANNEL_ID: string
      FIREBASE_PROJECT_ID: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_PRIVATE_KEY: string
      GOOGLE_STORAGE_BUCKET: string
      NEXT_PUBLIC_ALCHEMY_KEY: string
      NEXT_PUBLIC_CHAIN_ID: string
      NEXT_PUBLIC_PRODUCTION_URL: string
      NEXT_PUBLIC_VERCEL_ENV: string | undefined
      NEXT_PUBLIC_VERCEL_URL: string
      NODE_ENV: 'production' | 'development' | 'test'
      STORYBOOK: undefined | 'true'
    }
  }
}
