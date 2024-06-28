import type { contractResponseSchema } from '@echo/opensea/validators/contract-response-schema'

export type ContractResponse = ReturnType<typeof contractResponseSchema.parse>
