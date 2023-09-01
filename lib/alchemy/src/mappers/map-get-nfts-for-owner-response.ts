import { AlchemyNft } from '../types/model/alchemy-nft'
import { PagingResult } from '../types/paging/paging-result'
import { GetNftsForOwnerResponse } from '../types/response/get-nfts-for-owner-response'
import { mapNft } from './map-nft'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapGetNftsForOwnerResponse(response: GetNftsForOwnerResponse): PagingResult<AlchemyNft> {
  return applySpec({
    data: pipe(prop('ownedNfts'), map(mapNft)),
    pageKey: prop('pageKey')
  })(response)
}
