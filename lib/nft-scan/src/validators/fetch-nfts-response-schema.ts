import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import type { Chain } from '@echo/utils/constants/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { prop } from 'ramda'
import { object, string } from 'zod'

export interface FetchNftsByAccountResponseSchemaReturn {
  next?: Nullable<string>
  content: PartialNft[]
}

export function fetchNftsResponseSchema(chain: Chain) {
  const schema = object({
    data: object({
      next: string().nullable().optional(),
      content: nftResponseSchema(chain).array()
    })
  }).extend(baseResponseAugmentation)
  return schema.transform<FetchNftsByAccountResponseSchemaReturn>(prop('data'))
}
