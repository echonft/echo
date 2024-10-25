import type { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { z } from 'zod'

export type AddWalletRequest = z.infer<typeof addWalletRequestSchema>
