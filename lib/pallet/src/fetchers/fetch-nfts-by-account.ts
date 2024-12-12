import type { Address } from '@echo/model/types/address'
import { FetchError } from '@echo/pallet/constants/errors/fetch-error'
import { fetchInit } from '@echo/pallet/helpers/fetch-init'
import { error } from '@echo/pallet/helpers/logger'
import type { FetchNftsByAccountResponse } from '@echo/pallet/types/response/fetch-nfts-by-account-response'
import { fetchNftsByAccountResponseSchema } from '@echo/pallet/validators/fetch-nfts-by-account-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { formatAddress } from '@echo/web3-dom/helpers/format-address'

export async function fetchNftsByAccount(account: Address): Promise<FetchNftsByAccountResponse> {
  const formattedAccount = formatAddress(account)
  // FIXME
  // const url = palletApiRoutes.nfts.fetchByAccount.getUrl({ address: formattedAccount })
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
  return parseResponse(fetchNftsByAccountResponseSchema)(response)
}
