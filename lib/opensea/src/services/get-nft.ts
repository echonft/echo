import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import { andThen, pipe } from 'ramda'

export function getNft(args: FetchNftRequest) {
  return pipe(fetchNft, andThen(mapExtendedNftResponse))(args)
}
