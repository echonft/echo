// noinspection JSUnusedGlobalSymbols

declare namespace NodeJS {
  interface Process {
    env: {
      ADMIN_TOKEN: string
      ALCHEMY_API_KEY: string
      CI?: number | 'true' | '1'
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      DISCORD_CLIENT_TOKEN: string
      ECHO_DISCORD_GUILD_CHANNEL_ID: string
      ECHO_DISCORD_GUILD_ID: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_PRIVATE_KEY: string
      FIREBASE_PROJECT_ID: string
      GOOGLE_STORAGE_BUCKET: string
      NEXT_PUBLIC_IS_TESTNET?: '1'
      NEXT_PUBLIC_PINATA_GATEWAY_KEY: string
      NEXT_PUBLIC_PRODUCTION_URL: string
      NEXT_PUBLIC_VERCEL_ENV: string | undefined
      NEXT_PUBLIC_VERCEL_URL: string
      NODE_ENV: 'production' | 'development' | 'test'
      OPEN_SEA_API_KEY: string
      QUICKNODE_API_KEY: string
      STORYBOOK?: 'true'
    }
  }
}
