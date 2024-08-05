import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { fetchNftsByAccount } from '@echo/opensea/fetchers/fetch-nfts-by-account'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import type { FetchNftsByAccountRequest } from '@echo/opensea/types/request/fetch-nfts-by-account-request'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
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
  partialRight,
  pipe,
  prop,
  propEq
} from 'ramda'

export type GetNftsByAccountArgs = Omit<WithLoggerType<FetchNftsByAccountRequest>, 'limit' | 'next'>

async function handlePaging(
  args: WithLoggerType<FetchNftsByAccountRequest>,
  accNfts: PartialNft[]
): Promise<PartialNft[]> {
  const response = await pipe(fetchNftsByAccount, otherwise(always(undefined)))(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, nfts } = response
  const requests = pipe<[NftResponse[]], NftResponse[], FetchNftRequest[]>(
    // for now we only support ERC721
    filter(propEq('erc721', 'token_standard')),
    map(
      applySpec<FetchNftRequest>({
        identifier: pipe(prop('identifier'), (identifier: number) => identifier.toString(10)),
        contract: pipe(prop('contract'), objOf('address'), assoc('chain', args.wallet.chain)),
        fetch: always(args.fetch)
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
  const logger = getLogger({ chain: args.wallet.chain, logger: args.logger })?.child({
    fetcher: getNftsByAccount.name
  })
  return pipe<[GetNftsByAccountArgs], WithLoggerType<FetchNftsByAccountRequest>, Promise<PartialNft[]>>(
    assoc('logger', logger),
    partialRight(handlePaging, [[]])
  )(args)
}
