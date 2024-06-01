import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import { parseFetchResponse } from '@echo/nft-scan/helpers/parse-fetch-response'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import type { BaseResponse } from '@echo/nft-scan/types/response/base-response'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { stringify } from 'qs'
import { andThen, applySpec, defaultTo, partialRight, pipe, prop } from 'ramda'

export async function fetchNft(args: GetNftRequest): Promise<NftResponse> {
  const { fetch, contract, identifier } = args
  const query = pipe(
    applySpec({
      show_attribute: pipe(prop('showAttribute'), defaultTo(true))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(contract.chain)}/assets/${contract.address}/${identifier}${query}`
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(
      `error fetching NFT ${identifier} for contract ${contract.address}: {url: ${url}\nstatus:${response.statusText}}`
    )
  }
  return pipe(parseFetchResponse<BaseResponse<NftResponse>>, andThen(prop('data')))(response)
}
