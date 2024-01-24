import type { AuthUser } from '@echo/model/types/auth-user'

export type NextAuthUserParams<P = unknown> = P & { user: AuthUser }
