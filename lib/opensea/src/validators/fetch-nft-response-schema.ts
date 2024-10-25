import type { Chain } from '@echo/model/constants/chain'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { nftExtendedResponseSchema } from '@echo/opensea/validators/nft-extended-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { prop } from 'ramda'
import { object } from 'zod'

export function fetchNftResponseSchema(chain: Chain) {
  return object({
    nft: nftExtendedResponseSchema(chain).readonly()
  })
    .transform<Nullable<PartialNft>>(prop('nft'))
    .readonly()
}
