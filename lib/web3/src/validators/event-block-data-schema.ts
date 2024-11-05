import { eventLogSchema } from '@echo/web3/validators/event-log-schema'
import { object } from 'zod'

export const eventBlockDataSchema = object({
  logs: eventLogSchema.array()
})
