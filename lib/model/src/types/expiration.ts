import type { EXPIRATIONS } from '@echo/model/constants/expiration'

export type Expiration = (typeof EXPIRATIONS)[number]
