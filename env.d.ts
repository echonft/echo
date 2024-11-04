// noinspection JSUnusedGlobalSymbols

declare namespace NodeJS {
  interface Process {
    env: {
      ANALYZE?: string
      AUTH_DISCORD_ID: string
      AUTH_DISCORD_SECRET: string
      AUTH_SECRET: string
      CI?: 'true' | '1'
      ENV?: 'production' | 'staging' | 'testnet' | 'development' | 'test'
      LOG_LEVEL?: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
      NEXT_PUBLIC_VERCEL_ENV: 'production' | 'preview' | 'development'
      NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: string
      NEXT_PUBLIC_VERCEL_URL: string
      NEXT_RUNTIME: 'nodejs' | 'edge'
      NODE_ENV?: 'production' | 'development' | 'test'
      SECRET_MANAGER_EMAIL: string
      SECRET_MANAGER_PRIVATE_KEY: string
      VERCEL_ENV: 'production' | 'preview' | 'development' | undefined
      VERCEL_PROJECT_PRODUCTION_URL: string | undefined
      VERCEL_URL: string | undefined
    }
  }
}
