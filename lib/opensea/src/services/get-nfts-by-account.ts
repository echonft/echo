import type { Contract } from '@echo/model/types/collection'
import { BASE_URL } from '@echo/opensea/constants/base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import { getNft } from '@echo/opensea/services/get-nft'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { stringify } from 'qs'
import {
  always,
  andThen,
  applySpec,
  assoc,
  concat,
  filter,
  map,
  modify,
  partialRight,
  pick,
  pipe,
  propEq,
  reject,
  toLower
} from 'ramda'

interface FetchNftRequest extends WithFetchRequest {
  contract: HexString
  chain: ChainName
  identifier: string
}

export type GetNftsByAccountArgs = Omit<GetNftsByAccountRequest, 'limit' | 'next'>

async function fetchNft(args: FetchNftRequest) {
  const { contract, chain, fetch, identifier } = args
  const response = await throttleFetch({
    fetch,
    url: `${BASE_URL}/chain/${chain}/contract/${contract}/nfts/${identifier}`
  })
  if (!response.ok) {
    throw Error(`error fetching NFT #${identifier} for contract ${contract} on chain ${chain}: ${response.statusText}`)
  }
  return pipe(parseFetchResponse<GetNftResponse>, andThen(prop('nft')))(response)
}

async function fetchNftsByAccount(args: GetNftsByAccountRequest): Promise<GetNftsByAccountResponse> {
  const { address, chain, fetch } = args
  const url = concat(
    `${BASE_URL}/chain/${chain}/account/${address}/nfts`,
    stringify(pick(['limit', 'next'], args), { addQueryPrefix: true, skipNulls: true })
  )
  const response = await throttleFetch({ fetch, url })
  if (!response.ok) {
    throw Error(`error fetching NFTs for address ${address} on chain ${chain}: ${response.statusText}`)
  }
  return parseFetchResponse<GetNftsByAccountResponse>(response)
}

async function handlePaging(
  args: GetNftsByAccountRequest,
  accNfts: NftExtendedResponse[]
): Promise<NftExtendedResponse[]> {
  const response = await fetchNftsByAccount(args)
  const { next, nfts } = response
  const fetchNftResponse = await pipe<
    [NftResponse[]],
    NftResponse[],
    Promise<NftExtendedResponse>[],
    Promise<NftExtendedResponse[]>,
    Promise<NftExtendedResponse[]>
  >(
    // for now we only support ERC721
    filter(propEq('erc721', 'token_standard')),
    map<NftResponse, Promise<NftExtendedResponse>>(
      pipe(pick(['contract', 'identifier']), assoc('chain', args.chain), assoc('fetch', args.fetch), getNft)
    ),
    promiseAll,
    // reject suspicious NFTs
    andThen(reject(propEq(true, 'is_suspicious')))
  )(nfts)
  const mergedResponse = concat(fetchNftResponse, accNfts)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export async function getNftsByAccount(args: GetNftsByAccountArgs) {
  return pipe(
    assoc('limit', 200),
    partialRight(handlePaging, [[]]),
    andThen(
      map(
        pipe(
          modify('contract', applySpec<Contract>({ address: toLower, chain: always(args.chain) })),
          mapExtendedNftResponse
        )
      )
    )
  )(args)
}
