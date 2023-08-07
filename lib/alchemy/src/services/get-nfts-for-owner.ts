import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { mapNft } from '../mappers/map-nft'
import { PagingResult } from '../types/paging/paging-result'
import { GetNftsForOwnerRequest } from '../types/request/get-nfts-for-owner-request'
import { GetNftResponse } from '../types/response/get-nft-response'
import { GetNftsForOwnerResponse } from '../types/response/get-nfts-for-owner-response'
import { handlePaging } from '../utils/handle-paging'
import { applySpec, getData } from '@echo/utils'
import { andThen, map, partial, pipe, prop } from 'ramda'

const fetchNftsForOwner: (request: GetNftsForOwnerRequest) => Promise<PagingResult<GetNftResponse>> = pipe(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  partial(getData, [getRoute(AlchemyV3Routes.GET_NFTS_FOR_OWNER)]),
  andThen(
    applySpec<GetNftsForOwnerResponse, PagingResult<GetNftResponse>>({
      data: pipe(prop('ownedNfts'), map(mapNft)),
      pageKey: prop('pageKey')
    })
  )
)

export const getNftsForOwner = (args: GetNftsForOwnerRequest) =>
  handlePaging<GetNftsForOwnerRequest, GetNftResponse>(fetchNftsForOwner, args)
