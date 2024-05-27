import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { extendedNftResponseIsSuspicious } from '@echo/opensea/helpers/extended-nft-response-is-suspicious'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import { always, andThen, ifElse, pipe } from 'ramda'

export function getNft(args: FetchNftRequest) {
  return pipe(
    fetchNft,
    andThen(ifElse(extendedNftResponseIsSuspicious, always(undefined), mapExtendedNftResponse))
  )(args)
}
