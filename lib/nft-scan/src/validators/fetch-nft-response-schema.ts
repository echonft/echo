import type { Chain } from '@echo/model/constants/chain'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { convertNullToUndefined } from '@echo/utils/fp/convert-null-to-undefined'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe, prop } from 'ramda'
import { object } from 'zod'

export function fetchNftResponseSchema(chain: Chain) {
  return object({
    data: nftResponseSchema(chain).nullable().optional().readonly()
  })
    .extend(baseResponseAugmentation)
    .transform<Nullable<PartialNft>>(pipe(prop('data'), convertNullToUndefined))
    .readonly()
}
