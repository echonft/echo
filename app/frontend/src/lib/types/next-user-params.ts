import type { AuthUser } from '@echo/model/types/auth-user'

export type NextUserParams<P = unknown> = P & { user: AuthUser | undefined }
