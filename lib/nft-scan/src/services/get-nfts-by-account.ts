import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { fetchNftsByAccount } from '@echo/nft-scan/fetchers/fetch-nfts-by-account'
import { mapNftResponse, type MapNftResponseArgs } from '@echo/nft-scan/mappers/map-nft-response'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { always, andThen, applySpec, assoc, concat, defaultTo, identity, map, partialRight, pipe } from 'ramda'

export type GetNftsByAccountArgs = Omit<GetNftsByAccountRequest, 'next'>

async function handlePaging(args: GetNftsByAccountRequest, accNfts: NftResponse[]): Promise<NftResponse[]> {
  const response = await fetchNftsByAccount(args)
  const { next, content } = response
  const mergedResponse = concat(accNfts, content)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export async function getNftsByAccount(
  args: GetNftsByAccountArgs
): Promise<(Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & Record<'collection', Pick<Collection, 'contract'>>)[]> {
  return pipe(
    assoc('limit', defaultTo(100, args.limit)),
    partialRight(handlePaging, [[]]),
    andThen(
      map(pipe(applySpec<MapNftResponseArgs>({ chain: always(args.wallet.chain), response: identity }), mapNftResponse))
    )
  )(args)
}
