import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { nftScanApiPathProvider } from '@echo/nft-scan/constants/nft-scan-api-path-provider'
import { fetchInit } from '@echo/nft-scan/helpers/fetch-init'
import { error } from '@echo/nft-scan/helpers/logger'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftRequest } from '@echo/nft-scan/types/request/fetch-nft-request'
import { fetchNftResponseSchema } from '@echo/nft-scan/validators/fetch-nft-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { pick } from 'ramda'

export async function fetchNft({
  contract,
  identifier,
  showAttribute
}: FetchNftRequest): Promise<Nullable<PartialNft>> {
  const url = nftScanApiPathProvider.nft.fetch.withQuery({ showAttribute }).getUrl({ address: contract, identifier })
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error(
      {
        nft: { collection: { contract }, tokenId: identifier },
        url,
        response: pick(['status'], response)
      },
      FetchError.Nft
    )
    return Promise.reject(Error(FetchError.Nft))
  }
  return parseResponse(fetchNftResponseSchema)(response)
}
