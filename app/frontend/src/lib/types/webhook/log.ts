import type { logSchema } from '@echo/frontend/lib/validators/log-schema'

export type Log = ReturnType<typeof logSchema.parse>
