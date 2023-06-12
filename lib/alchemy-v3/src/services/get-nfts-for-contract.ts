import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { mapNft } from '../mappers/map-nft'
import { GetNftsForContractRequest } from '../types/request/get-nfts-for-contract-request'
import { GetNftResponse } from '../types/response/get-nft-response'
import { GetNftsForContractResponse } from '../types/response/get-nfts-for-contract-response'
import { castAs, errorPromise, getData, toPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, ifElse, map, pipe, prop } from 'ramda'

export const getNftsForContract = (contractAddress: string) =>
  pipe(
    getData<GetNftsForContractResponse, GetNftsForContractRequest>,
    andThen(
      ifElse(
        R.isOk,
        pipe(R.getExn, pipe(prop('nfts'), map(mapNft)), toPromise, R.fromPromise),
        pipe(errorPromise('getContractMetadata error mapping'), R.fromPromise)
      )
    ),
    castAs<Promise<R.Result<GetNftResponse[], Error>>>
    // FIXME We set the limit super high for now to avoid paging, should optimize that at some point
  )(getRoute(AlchemyV3Routes.GET_NFTS_FOR_CONTRACT), { contractAddress, limit: '100000', withMetadata: 'true' })
