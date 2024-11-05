import type { eventBlockDataSchema } from '@echo/web3/validators/event-block-data-schema'
import { z } from 'zod'

export type EventBlockData = z.infer<typeof eventBlockDataSchema>
