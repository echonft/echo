import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { nftExtendedResponseSchema } from '@echo/opensea/validators/nft-extended-response-schema'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { prop } from 'ramda'
import { object } from 'zod'

export function getNftResponseSchema(chain: ChainName) {
  return object({
    nft: nftExtendedResponseSchema(chain)
  }).transform<Nullable<PartialNft>>(prop('nft'))
}
