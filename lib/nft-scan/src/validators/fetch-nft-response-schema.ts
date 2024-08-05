import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { removeNull } from '@echo/utils/fp/remove-null'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe, prop } from 'ramda'
import { object } from 'zod'

export function fetchNftResponseSchema(chain: ChainName) {
  return object({
    data: nftResponseSchema(chain).nullable().optional()
  })
    .extend(baseResponseAugmentation)
    .transform<Nullable<PartialNft>>(pipe(prop('data'), removeNull))
}
