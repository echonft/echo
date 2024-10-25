import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import type { Nullable } from '@echo/utils/types/nullable'

export function getNft(args: FetchNftRequest): Promise<Nullable<PartialNft>> {
  return fetchNft(args)
}
