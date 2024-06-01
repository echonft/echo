import type { Nft } from '@echo/model/types/nft'
import { fetchNft } from '@echo/nft-scan/fetchers/fetch-nft'
import { mapNftResponse, type MapNftResponseArgs } from '@echo/nft-scan/mappers/map-nft-response'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import { always, andThen, applySpec, identity, pipe } from 'ramda'

export async function getNft(
  args: GetNftRequest
): Promise<Omit<Nft, 'collection' | 'owner' | 'updatedAt'> | undefined> {
  return await pipe(
    fetchNft,
    andThen(
      pipe(applySpec<MapNftResponseArgs>({ chain: always(args.contract.chain), response: identity }), mapNftResponse)
    )
  )(args)
}
