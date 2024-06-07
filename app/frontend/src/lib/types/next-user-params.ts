import type { Nullable } from '@echo/utils/types/nullable'
import type { User } from 'next-auth'

export type NextUserParams<P = unknown> = P & Record<'user', Nullable<User>>
