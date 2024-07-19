import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { nftScanApiPathProvider } from '@echo/nft-scan/services/routing/nft-scan-api-path-provider'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import { getNftResponseSchema } from '@echo/nft-scan/validators/get-nft-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { assoc, pick } from 'ramda'

export async function fetchNft(args: WithLoggerType<GetNftRequest>): Promise<Nullable<PartialNft>> {
  const { fetch, contract, identifier, logger } = args
  const url = nftScanApiPathProvider.nft.fetch.getUrl(
    assoc('identifier', identifier, contract),
    pick(['showAttribute'], args)
  )
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      {
        nft: { collection: { contract }, tokenId: identifier },
        url,
        response: pick(['status'], response)
      },
      'error fetching NFT'
    )
    return Promise.reject(Error(`error fetching NFT ${identifier} for contract`))
  }
  return parseResponse(getNftResponseSchema(contract.chain))(response)
}
