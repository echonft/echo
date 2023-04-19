import { address } from './address'
import { z } from 'zod'

export const wallet = z.object({
  chainId: z.number().gte(1),
  address: address
})
