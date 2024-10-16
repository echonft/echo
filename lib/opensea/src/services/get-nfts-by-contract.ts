import { TokenType } from '@echo/model/constants/token-type'
import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { fetchNftsByContract } from '@echo/opensea/fetchers/fetch-nfts-by-contract'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import type { FetchNftsByContractRequest } from '@echo/opensea/types/request/fetch-nfts-by-contract-request'
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

export type GetNftsByContractArgs = Omit<WithLoggerType<FetchNftsByContractRequest>, 'limit' | 'next'>

async function handlePaging(
  args: WithLoggerType<FetchNftsByContractRequest>,
  accNfts: PartialNft[]
): Promise<PartialNft[]> {
  const response = await pipe(fetchNftsByContract, otherwise(always(undefined)))(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, nfts } = response
  const requests = pipe<[NftResponse[]], NftResponse[], FetchNftRequest[]>(
    // for now we only support ERC721
    filter(propEq(TokenType.Erc721, 'token_standard')),
    map(
      applySpec<FetchNftRequest>({
        identifier: pipe(prop('identifier'), (identifier: number) => identifier.toString(10)),
        contract: pipe(prop('contract'), objOf('address'), assoc('chain', args.contract.chain)),
        fetch: always(args.fetch)
      })
    )
  )(nfts)
  const responses: PartialNft[] = []
  for (const request of requests) {
    await pipe(fetchNft, andThen(unlessNil((response) => responses.push(response))))(request)
  }
  const mergedResponse = concat(responses, accNfts)
  args.logger?.info({ request: responses.length, total: mergedResponse.length }, 'fetched NFTs')
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export function getNftsByContract(args: GetNftsByContractArgs) {
  const logger = getLogger({ chain: args.contract.chain, logger: args.logger })?.child({
    fetcher: getNftsByContract.name
  })
  return pipe<[GetNftsByContractArgs], WithLoggerType<FetchNftsByContractRequest>, Promise<PartialNft[]>>(
    assoc('logger', logger),
    partialRight(handlePaging, [[]])
  )(args)
}
