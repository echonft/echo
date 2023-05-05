import { target } from './target'
import { z } from 'zod'

export const offerItem = z.object({
  target: target,
  // TODO Add custom
  tokenId: z
    .string()
    .nonempty()
    .refine((tokenId) => {
      try {
        return BigInt(tokenId) >= 0
      } catch {
        return false
      }
    })
})
