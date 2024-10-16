import type { logSchema } from '@echo/web3/validators/log-schema'

export type Log = ReturnType<typeof logSchema.parse>
