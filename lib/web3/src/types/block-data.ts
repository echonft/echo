import type { blockDataSchema } from '@echo/web3/validators/block-data-schema'
import { z } from 'zod'

export type BlockData = z.infer<typeof blockDataSchema>
