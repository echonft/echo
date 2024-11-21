// noinspection JSUnusedGlobalSymbols

declare namespace NodeJS {
  interface Process {
    env: {
      ANALYZE?: string
      CI?: 'true' | '1'
      ENV?: 'production' | 'staging' | 'development' | 'test'
      K_SERVICE?: string
      LOG_LEVEL?: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
      NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: string
      NEXT_RUNTIME: 'nodejs' | 'edge'
      NODE_ENV?: 'production' | 'development' | 'test'
      SECRET_MANAGER_EMAIL: string
      SECRET_MANAGER_PRIVATE_KEY: string
    }
  }
}
