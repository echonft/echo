import type { Address } from '@echo/model/types/address'
import { FetchError } from '@echo/pallet/constants/errors/fetch-error'
import { fetchInit } from '@echo/pallet/helpers/fetch-init'
import { error } from '@echo/pallet/helpers/logger'
import type { FetchNftsResponse } from '@echo/pallet/types/response/fetch-nfts-response'
import { fetchNftsResponseSchema } from '@echo/pallet/validators/fetch-nfts-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { formatAddress } from '@echo/web3-dom/helpers/format-address'

export async function fetchNftsByAccount(account: Address): Promise<FetchNftsResponse> {
  const formattedAccount = formatAddress(account)
  // FIXME: this is a temporary fix to get the NFTs from Pallet
  const url = `https://api.pallet.exchange/api/v3/user/${formattedAccount}/tokens?network=mainnet`
  const init = fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error(
      {
        account: account,
        url,
        response
      },
      FetchError.Nfts
    )
    return Promise.reject(Error(FetchError.Nfts))
  }
  return parseResponse(fetchNftsResponseSchema)(response)
}
