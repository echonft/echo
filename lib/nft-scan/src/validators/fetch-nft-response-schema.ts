import type { Chain } from '@echo/model/constants/chain'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { prop } from 'ramda'
import { object } from 'zod'

export function fetchNftResponseSchema(chain: Chain) {
  return object({
    data: nftResponseSchema(chain).nullable().optional()
  })
    .extend(baseResponseAugmentation)
    .transform<Nullable<PartialNft>>(prop('data'))
}
