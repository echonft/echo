import type { eventLogSchema } from '@echo/web3/validators/event-log-schema'
import { z } from 'zod'

export type EventLog = z.infer<typeof eventLogSchema>
