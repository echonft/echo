import { fetchNftsByAccount } from '@echo/nft-scan/fetchers/fetch-nfts-by-account'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import { mapNftResponse, type MapNftResponseArgs } from '@echo/nft-scan/mappers/map-nft-response'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import { getNftsByAccountResponseSchema } from '@echo/nft-scan/validators/get-nfts-by-account-response-schema'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { always, andThen, applySpec, assoc, concat, identity, map, partialRight, pipe } from 'ramda'

export type GetNftsByAccountArgs = Omit<GetNftsByAccountRequest, 'next'>
type AccType = ReturnType<typeof getNftsByAccountResponseSchema.parse>['data']['content']

async function handlePaging(args: GetNftsByAccountRequest, accNfts: AccType): Promise<AccType> {
  try {
    const {
      data: { next, content }
    } = await fetchNftsByAccount(args)
    const mergedResponse = concat(accNfts, content)
    if (isNilOrEmpty(next)) {
      return mergedResponse
    }
    return handlePaging(assoc('next', next, args), mergedResponse)
  } catch (err) {
    // if we get an error we simply return what we have yet
    return accNfts
  }
}

export function getNftsByAccount(args: GetNftsByAccountArgs) {
  const logger = getLogger({ chain: args.wallet.chain, logger: args.logger })?.child({
    fetcher: getNftsByAccount.name
  })
  return pipe<[GetNftsByAccountArgs], GetNftsByAccountRequest, Promise<AccType>, Promise<PartialNft[]>>(
    assoc('logger', logger),
    partialRight(handlePaging, [[]]),
    andThen(
      map(pipe(applySpec<MapNftResponseArgs>({ chain: always(args.wallet.chain), response: identity }), mapNftResponse))
    )
  )(args)
}
