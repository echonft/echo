import { fetchNft } from '@echo/nft-scan/fetchers/fetch-nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftRequest } from '@echo/nft-scan/types/request/fetch-nft-request'
import type { Nullable } from '@echo/utils/types/nullable'

export function getNft(args: FetchNftRequest): Promise<Nullable<PartialNft>> {
  return fetchNft(args)
}
