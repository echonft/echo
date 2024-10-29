import type { contractSchema } from '@echo/model/validators/contract-schema'
import { z } from 'zod'

export type RemoveWalletRequest = z.infer<typeof contractSchema>
