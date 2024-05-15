import type { Contract } from '@echo/model/types/collection'
import { BASE_URL } from '@echo/opensea/constants/base-url'
import { nextFetchInit } from '@echo/opensea/constants/next-fetch-init'
import { getChainName } from '@echo/opensea/helpers/get-chain-name'
import { parseNextFetchResponse } from '@echo/opensea/helpers/parse-next-fetch-response'
import { mapNftResponse } from '@echo/opensea/mappers/map-nft-response'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import type { GetNftResponse } from '@echo/opensea/types/response/get-nft-response'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { HexString } from '@echo/utils/types/hex-string'
import { stringify } from 'qs'
import {
  always,
  andThen,
  applySpec,
  assoc,
  concat,
  filter,
  identity,
  map,
  modify,
  partialRight,
  pick,
  pipe,
  prop,
  propEq,
  reject
} from 'ramda'

interface FetchNftRequest extends WithFetchRequest {
  contract: HexString
  chainId: number
  identifier: string
}

async function fetchNft(args: FetchNftRequest) {
  const { contract, chainId, fetch, identifier } = args
  const chain = getChainName(chainId)
  const response = await fetch(`${BASE_URL}/chain/${chain}/contract/${contract}/nfts/${identifier}`, nextFetchInit)
  return pipe(parseNextFetchResponse<GetNftResponse>, andThen(prop('nft')))(response)
}

async function fetchNftsByAccount(args: GetNftsByAccountRequest): Promise<GetNftsByAccountResponse> {
  const { address, chainId, fetch } = args
  const chain = getChainName(chainId)
  const url = concat(
    `${BASE_URL}/chain/${chain}/account/${address}/nfts`,
    stringify(pick(['limit', 'next'], args), { addQueryPrefix: true, skipNulls: true })
  )
  const response = await fetch(url, nextFetchInit)
  return parseNextFetchResponse<GetNftsByAccountResponse>(response)
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
      pipe(pick(['contract', 'identifier']), assoc('chainId', args.chainId), assoc('fetch', args.fetch), fetchNft)
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
          modify('contract', applySpec<Contract>({ address: identity, chainId: always(args.chainId) })),
          mapNftResponse
        )
      )
    )
  )(args)
}
