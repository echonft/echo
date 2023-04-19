import { target } from './target'
import { z } from 'zod'

export const offerItem = z.object({
  target: target,
  tokenId: z.bigint()
})
