import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import { parseFetchResponse } from '@echo/nft-scan/helpers/parse-fetch-response'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { stringify } from 'qs'
import { partialRight, pipe, prop } from 'ramda'

export async function fetchNft(args: GetNftRequest): Promise<NftResponse> {
  const { fetch, chain, identifier, contract, showAttribute } = args
  const url = `${getBaseUrl(chain)}/assets/${contract}/${identifier}${stringify({ show_attributes: showAttribute ?? false }, { addQueryPrefix: true })}`
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(
      `error fetching NFT ${identifier} for contract ${contract}: {url: ${url}\nstatus:${response.statusText}}`
    )
  }
  return pipe(prop('data'), parseFetchResponse<NftResponse>)(response)
}
