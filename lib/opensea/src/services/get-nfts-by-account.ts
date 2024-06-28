import type { EvmAddress } from '@echo/model/types/evm-address'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { fetchNftsByAccount } from '@echo/opensea/fetchers/fetch-nfts-by-account'
import { extendedNftResponseIsSuspicious } from '@echo/opensea/helpers/extended-nft-response-is-suspicious'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import {
  andThen,
  assoc,
  concat,
  filter,
  map,
  modify,
  objOf,
  otherwise,
  partialRight,
  pick,
  pipe,
  propEq,
  reject,
  toLower
} from 'ramda'

export type GetNftsByAccountArgs = Omit<WithLoggerType<GetNftsByAccountRequest>, 'limit' | 'next'>

async function handlePaging(
  args: WithLoggerType<GetNftsByAccountRequest>,
  accNfts: NftExtendedResponse[]
): Promise<NftExtendedResponse[]> {
  const response = await fetchNftsByAccount(args)
  const { next, nfts } = response
  const requests = pipe<[NftResponse[]], NftResponse[], FetchNftRequest[]>(
    // for now we only support ERC721
    filter(propEq('erc721', 'token_standard')),
    map(
      pipe<
        [NftResponse],
        Pick<NftResponse, 'contract' | 'identifier'>,
        Omit<FetchNftRequest, 'fetch'>,
        FetchNftRequest
      >(
        pick(['contract', 'identifier']),
        modify<'contract', HexString, Wallet>(
          'contract',
          pipe<[HexString], EvmAddress, Pick<Wallet, 'address'>, Wallet>(
            toLower<HexString>,
            objOf('address'),
            assoc('chain', args.wallet.chain)
          )
        ),
        assoc('fetch', args.fetch)
      )
    )
  )(nfts)
  const responses: NftExtendedResponse[] = []
  for (const request of requests) {
    try {
      const nftResponse = await fetchNft(request)
      responses.push(nftResponse)
    } catch (err) {
      // we just don't push anything
    }
  }
  // reject suspicious NFTs
  const mergedResponse = concat(reject(extendedNftResponseIsSuspicious, responses), accNfts)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export function getNftsByAccount(args: GetNftsByAccountArgs) {
  const logger = getLogger({ chain: args.wallet.chain, fn: getNftsByAccount.name, logger: args.logger })
  return pipe<
    [GetNftsByAccountArgs],
    WithLoggerType<GetNftsByAccountRequest>,
    Promise<NftExtendedResponse[]>,
    Promise<ReturnType<typeof mapExtendedNftResponse>[]>,
    Promise<ReturnType<typeof mapExtendedNftResponse>[]>
  >(
    assoc('logger', logger),
    partialRight(handlePaging, [[]]),
    andThen(
      map(
        pipe(objOf('response'), assoc('chain', args.wallet.chain), assoc('logger', args.logger), mapExtendedNftResponse)
      )
    ),
    otherwise((err) => {
      args.logger?.error({ err, wallet: args.wallet }, 'could not fetch NFTs for wallet')
      return []
    })
  )(args)
}
