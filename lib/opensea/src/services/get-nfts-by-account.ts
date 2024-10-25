import { TokenType } from '@echo/model/constants/token-type'
import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { fetchNftsByAccount } from '@echo/opensea/fetchers/fetch-nfts-by-account'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import type { FetchNftsByAccountRequest } from '@echo/opensea/types/request/fetch-nfts-by-account-request'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import {
  always,
  andThen,
  applySpec,
  assoc,
  concat,
  filter,
  isNil,
  map,
  objOf,
  otherwise,
  pipe,
  prop,
  propEq
} from 'ramda'

export type GetNftsByAccountArgs = Omit<FetchNftsByAccountRequest, 'limit' | 'next'>

async function handlePaging(args: FetchNftsByAccountRequest, accNfts: PartialNft[]): Promise<PartialNft[]> {
  const response = await pipe(fetchNftsByAccount, otherwise(always(undefined)))(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, nfts } = response
  const requests = pipe<[NftResponse[]], NftResponse[], FetchNftRequest[]>(
    // TODO support ERC1155 too
    filter(propEq(TokenType.Erc721, 'token_standard')),
    map(
      applySpec<FetchNftRequest>({
        identifier: pipe(prop('identifier'), (identifier: number) => identifier.toString(10)),
        contract: pipe(prop('contract'), objOf('address'), assoc('chain', args.contract.chain))
      })
    )
  )(nfts)
  const responses: PartialNft[] = []
  for (const request of requests) {
    await pipe(fetchNft, andThen(unlessNil((response) => responses.push(response))))(request)
  }
  const mergedResponse = concat(responses, accNfts)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export function getNftsByAccount(args: GetNftsByAccountArgs) {
  return handlePaging(args, [])
}
