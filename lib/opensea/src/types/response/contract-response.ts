import type { contractResponseSchema } from '@echo/opensea/validators/contract-response-schema'
import { z } from 'zod'

export type ContractResponse = z.infer<typeof contractResponseSchema>
