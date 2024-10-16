import type { User } from '@echo/auth/types/user'

declare module '@sentry/nextjs' {
  export declare function setUser(user: User | null): void
}

export {}
