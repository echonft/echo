import type { Contract } from '@echo/model/types/collection'
import { BASE_URL } from '@echo/opensea/constants/base-url'
import { fetchInit } from '@echo/opensea/constants/fetch-init'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import type { GetNftResponse } from '@echo/opensea/types/response/get-nft-response'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
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
  prop,
  propEq,
  reject,
  toLower
} from 'ramda'

interface FetchNftRequest extends WithFetchRequest {
  contract: HexString
  chain: ChainName
  identifier: string
}

async function fetchNft(args: FetchNftRequest) {
  const { contract, chain, fetch, identifier } = args
  const response = await throttleFetch({
    fetch,
    input: `${BASE_URL}/chain/${chain}/contract/${contract}/nfts/${identifier}`,
    init: fetchInit
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
  const response = await throttleFetch({ fetch, input: url, init: fetchInit })
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
      pipe(pick(['contract', 'identifier']), assoc('chain', args.chain), assoc('fetch', args.fetch), fetchNft)
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

export async function getNftsByAccount(args: Omit<GetNftsByAccountRequest, 'limit' | 'next'>) {
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
