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
        const tokenIdBigInt = BigInt(tokenId)
        return tokenIdBigInt >= 0
      } catch {
        return false
      }
    })
})
