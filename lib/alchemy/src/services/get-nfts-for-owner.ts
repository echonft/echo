import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { mapNft } from '../mappers/map-nft'
import { PagingResult } from '../types/paging/paging-result'
import { GetNftsForOwnerRequest } from '../types/request/get-nfts-for-owner-request'
import { GetNftResponse } from '../types/response/get-nft-response'
import { GetNftsForOwnerResponse } from '../types/response/get-nfts-for-owner-response'
import { NftResponse } from '../types/response/nft-response'
import { handlePaging } from '../utils/handle-paging'
import { applySpec, castAsNonNullable, getData } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, map, partial, pipe, prop } from 'ramda'

const fetchNftsForOwner = pipe<
  GetNftsForOwnerRequest[],
  Promise<R.Result<GetNftsForOwnerResponse, Error>>,
  Promise<R.Result<PagingResult<GetNftResponse>, Error>>
>(
  partial(getData<GetNftsForOwnerResponse, GetNftsForOwnerRequest>, [getRoute(AlchemyV3Routes.GET_NFTS_FOR_OWNER)]),
  andThen(
    R.map(
      applySpec<GetNftsForOwnerResponse, PagingResult<GetNftResponse>>({
        data: pipe(prop('ownedNfts'), castAsNonNullable<NftResponse[]>, map(mapNft)),
        pageKey: prop('pageKey')
      })
    )
  )
)

export const getNftsForOwner = (args: GetNftsForOwnerRequest) =>
  handlePaging<GetNftsForOwnerRequest, GetNftResponse>(fetchNftsForOwner, args)
