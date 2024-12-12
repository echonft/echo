import type { Address } from '@echo/model/types/address'
import { FetchError } from '@echo/pallet/constants/errors/fetch-error'
import { palletApiRoutes } from '@echo/pallet/constants/pallet-api-routes'
import { fetchInit } from '@echo/pallet/helpers/fetch-init'
import { error } from '@echo/pallet/helpers/logger'
import type { FetchNftsByAccountResponse } from '@echo/pallet/types/response/fetch-nfts-by-account-response'
import { fetchNftsByAccountResponseSchema } from '@echo/pallet/validators/fetch-nfts-by-account-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { formatAddress } from '@echo/web3-dom/helpers/format-address'

export async function fetchNftsByAccount(account: Address): Promise<FetchNftsByAccountResponse> {
  const formattedAccount = formatAddress(account)
  const url = palletApiRoutes.nfts.fetchByAccount.getUrl({ address: formattedAccount })
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
  return parseResponse(fetchNftsByAccountResponseSchema)(response)
}
