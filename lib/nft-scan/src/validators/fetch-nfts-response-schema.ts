import type { Chain } from '@echo/model/constants/chain'
import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { prop } from 'ramda'
import { object, string } from 'zod'

export function fetchNftsResponseSchema(chain: Chain) {
  return object({
    data: object({
      next: string().nullable().optional(),
      content: nftResponseSchema(chain).array()
    })
  })
    .extend(baseResponseAugmentation)
    .transform(prop('data'))
}
