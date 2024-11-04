import type { Address } from '@echo/model/types/address'
import { fetchNft } from '@echo/nft-scan/fetchers/fetch-nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { Nullable } from '@echo/utils/types/nullable'

export interface GetNftArgs {
  contract: Address
  tokenId: number
}

export function getNft({ contract, tokenId }: GetNftArgs): Promise<Nullable<PartialNft>> {
  return fetchNft({ contract, identifier: tokenId.toString(10) })
}
