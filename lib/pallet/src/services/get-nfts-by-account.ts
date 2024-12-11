import type { Address } from '@echo/model/types/address'
import { fetchNftsByAccount } from '@echo/pallet/fetchers/fetch-nfts-by-account'
import { error, info } from '@echo/pallet/helpers/logger'
import type { FetchNftsResponse } from '@echo/pallet/types/response/fetch-nfts-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, otherwise, pipe } from 'ramda'

export async function getNftsByAccount(account: Address): Promise<FetchNftsResponse> {
  info({ account }, 'fetching NFTs from Pallet...')

  const response = await pipe(
    fetchNftsByAccount,
    otherwise<FetchNftsResponse, Nullable<FetchNftsResponse>>((err) => {
      error({ err, account }, 'Failed to fetch NFTs from Pallet')
      return undefined
    })
  )(account)

  if (isNil(response)) {
    error({ account }, 'Failed to fetch NFTs from Pallet')
    return []
  }

  info({ account, count: response.length }, 'completed fetching NFTs from Pallet')
  return response
}
