import type { removeWalletRequestSchema } from '@echo/api/validators/remove-wallet-request-schema'
import { z } from 'zod'

export type RemoveWalletRequest = z.infer<typeof removeWalletRequestSchema>
