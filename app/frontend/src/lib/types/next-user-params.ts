import type { AuthUser } from '@echo/model/types/auth-user'
import type { Nullable } from '@echo/utils/types/nullable'

export type NextUserParams<P = unknown> = P & { user: Nullable<AuthUser> }
