// noinspection JSUnusedGlobalSymbols

declare namespace NodeJS {
  interface Process {
    env: {
      ADMIN_TOKEN: string
      ALCHEMY_API_KEY: string
      ALCHEMY_AUTH_TOKEN: string
      ALCHEMY_WEBHOOK_SWAPS: string
      ALCHEMY_WEBHOOK_NFT_TRANSFERS: string
      CI: string
      DISCORD_CLIENT_TOKEN: string
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      ECHO_DISCORD_GUILD_ID: string
      ECHO_DISCORD_GUILD_CHANNEL_ID: string
      ENV: 'dev' | 'testnet' | 'test'
      EXTR_NODE_API_KEY: string
      FIREBASE_PROJECT_ID: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_PRIVATE_KEY: string
      GOOGLE_STORAGE_BUCKET: string
      HELIUS_API_KEY: string
      NEXT_PUBLIC_CHAIN_ID: string
      NEXT_PUBLIC_PINATA_GATEWAY_KEY: string
      NEXT_PUBLIC_VERCEL_ENV: string | undefined
      NEXT_PUBLIC_VERCEL_URL: string
      NODE_ENV: 'production' | 'development' | 'test'
      SIGNER_PRIVATE_KEY: `0x${string}`
      SOLONA_SIGNER_PRIVATE_KEY: string
      STORYBOOK: undefined | 'true'
    }
  }
}
