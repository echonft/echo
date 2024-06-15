import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { extendedNftResponseIsSuspicious } from '@echo/opensea/helpers/extended-nft-response-is-suspicious'
import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { stringify } from 'qs'
import { andThen, assoc, concat, filter, map, partialRight, pick, pipe, propEq, reject } from 'ramda'

export type GetNftsByAccountArgs = Omit<WithLoggerType<GetNftsByAccountRequest>, 'limit' | 'next'>

async function fetchNftsByAccount(args: WithLoggerType<GetNftsByAccountRequest>): Promise<GetNftsByAccountResponse> {
  const { address, chain, fetch, logger } = args
  const url = concat(
    `${getBaseUrl(chain)}/chain/${chain}/account/${address}/nfts`,
    stringify(pick(['limit', 'next'], args), { addQueryPrefix: true, skipNulls: true })
  )
  const response = await throttleFetch({ fetch, url })
  if (!response.ok) {
    logger?.error(
      { fn: 'fetchNftsByAccount', wallet: { address, chain }, url, response: pick(['status'], response) },
      'error fetching NFTs'
    )
    throw Error(`error fetching NFTs for wallet ${JSON.stringify({ address, chain })}`)
  }
  return parseFetchResponse<GetNftsByAccountResponse>(response)
}

async function handlePaging(
  args: WithLoggerType<GetNftsByAccountRequest>,
  accNfts: NftExtendedResponse[]
): Promise<NftExtendedResponse[]> {
  const response = await fetchNftsByAccount(args)
  const { next, nfts } = response
  const requests = pipe<[NftResponse[]], NftResponse[], FetchNftRequest[]>(
    // for now we only support ERC721
    filter(propEq('erc721', 'token_standard')),
    map(pipe(pick(['contract', 'identifier']), assoc('chain', args.chain), assoc('fetch', args.fetch)))
  )(nfts)
  const responses: NftExtendedResponse[] = []
  for (const request of requests) {
    const nftResponse = await fetchNft(request)
    responses.push(nftResponse)
  }
  // reject suspicious NFTs
  const mergedResponse = concat(reject(extendedNftResponseIsSuspicious, responses), accNfts)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export function getNftsByAccount(args: GetNftsByAccountArgs) {
  return pipe<
    [GetNftsByAccountArgs],
    GetNftsByAccountArgs,
    WithLoggerType<GetNftsByAccountRequest>,
    Promise<NftExtendedResponse[]>,
    Promise<ReturnType<typeof mapExtendedNftResponse>[]>
  >(
    assoc('logger', getLogger({ chain: args.chain, fn: 'getNftsByAccount', logger: args.logger })),
    assoc('limit', 200),
    partialRight(handlePaging, [[]]),
    andThen(map(mapExtendedNftResponse))
  )(args)
}
