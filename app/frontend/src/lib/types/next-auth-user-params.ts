import type { User } from 'next-auth'

export type NextAuthUserParams<P = unknown> = P & { user: User }
