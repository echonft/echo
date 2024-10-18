import type { User } from '@echo/auth/types/user'
import 'ramda'
import '@echo/auth/global'
import '@echo/utils/global'

declare module '@sentry/nextjs' {
  export declare function setUser(user: User | null): void
}

export {}
