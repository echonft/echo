import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { prop } from 'ramda'
import { object, string } from 'zod'

export interface GetNftsByAccountResponseSchemaReturn {
  next?: Nullable<string>
  content: PartialNft[]
}

export function getNftsByAccountResponseSchema(chain: ChainName) {
  const schema = object({
    data: object({
      // total: number(),
      next: string().nullable().optional(),
      content: nftResponseSchema(chain).array()
    })
  }).extend(baseResponseAugmentation)
  return schema.transform<GetNftsByAccountResponseSchemaReturn>(prop('data'))
}
