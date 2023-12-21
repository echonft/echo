declare namespace NodeJS {
  interface Process {
    env: {
      ALCHEMY_API_KEY: string
      APP_URL: string
      CI: undefined | 'true'
      DISCORD_CLIENT_TOKEN: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      FIREBASE_PROJECT_ID: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_PRIVATE_KEY: string
      NEXT_PUBLIC_ALCHEMY_KEY: string
      NEXT_PUBLIC_CHAIN_ID: string
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string
      NODE_ENV: 'production' | 'development' | 'test'
      STORYBOOK: undefined | 'true'
      STORYBOOK_ALCHEMY_API_KEY: string
      VERCEL_URL: string
    }
  }
}
