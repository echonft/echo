import { target } from './target'
import { z } from 'zod'

export const offerItem = z.object({
  target: target,
  // TODO Add custom
  tokenId: z.number().refine((tokenId) => {
    try {
      return tokenId >= 0
    } catch {
      return false
    }
  })
})
