import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import { getNftResponseSchema } from '@echo/nft-scan/validators/get-nft-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { applySpec, defaultTo, partialRight, pick, pipe, prop } from 'ramda'

export async function fetchNft(
  args: WithLoggerType<GetNftRequest>
): Promise<ReturnType<typeof getNftResponseSchema.parse>> {
  const { fetch, contract, identifier, logger } = args
  const query = pipe(
    applySpec({
      show_attribute: pipe(prop('showAttribute'), defaultTo(true))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(contract.chain)}/assets/${contract.address}/${identifier}${query}`
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      {
        fn: 'fetchNft',
        nft: { collection: { contract }, tokenId: identifier },
        url,
        response: pick(['status'], response)
      },
      'error fetching collection'
    )
    return Promise.reject(Error(`error fetching NFT ${identifier} for contract ${JSON.stringify(contract)}`))
  }
  return parseResponse(getNftResponseSchema)(response)
}
