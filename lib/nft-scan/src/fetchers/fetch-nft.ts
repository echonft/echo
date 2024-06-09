import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import { getNftResponseSchema } from '@echo/nft-scan/validators/get-nft-response-schema'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { applySpec, defaultTo, partialRight, pipe, prop } from 'ramda'

export async function fetchNft(args: GetNftRequest): Promise<ReturnType<typeof getNftResponseSchema.parse>> {
  const { fetch, contract, identifier } = args
  const query = pipe(
    applySpec({
      show_attribute: pipe(prop('showAttribute'), defaultTo(true))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(contract.chain)}/assets/${contract.address}/${identifier}${query}`
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    throw Error(
      `error fetching NFT ${identifier} for contract ${contract.address}: ${JSON.stringify(
        { url, status: response.statusText },
        undefined,
        2
      )}`
    )
  }
  return parseResponse(getNftResponseSchema)(response)
}
