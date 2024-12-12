import type { Nft } from '@echo/model/types/nft'
import type { SeiAddress } from '@echo/model/types/sei-address'
import { fetchCollectionNfts } from '@echo/pallet/fetchers/fetch-collection-nfts'
import { error, info } from '@echo/pallet/helpers/logger'
import { DEFAULT_PAGE_SIZE } from '@echo/pallet/types/request/fetch-collection-nfts-request'
import type { FetchNftsByCollectionResponse } from '@echo/pallet/types/response/fetch-nfts-by-collection-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, otherwise, pipe } from 'ramda'

export async function getCollectionNfts(seiAddress: SeiAddress): Promise<FetchNftsByCollectionResponse> {
  info({ seiAddress }, 'fetching collection NFTs from Pallet...')

  let page = 1
  const allNfts: Nft[] = []

  while (true) {
    const response = await pipe(
      () => fetchCollectionNfts({ seiAddress, page, pageSize: DEFAULT_PAGE_SIZE }),
      otherwise<FetchNftsByCollectionResponse, Nullable<FetchNftsByCollectionResponse>>((err) => {
        error({ err, seiAddress, page }, 'Failed to fetch collection NFTs from Pallet')
        return undefined
      })
    )()

    if (isNil(response)) {
      break
    }

    allNfts.push(...response.tokens)

    if (allNfts.length >= response.count) {
      break
    }

    page++
  }

  info({ seiAddress, count: allNfts.length }, 'completed fetching collection NFTs from Pallet')
  return allNfts
}
