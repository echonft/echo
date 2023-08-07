import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { mapNft } from '../mappers/map-nft'
import { GetNftResponse } from '../types/response/get-nft-response'
import { getData } from '@echo/utils'
import { andThen, map, pipe, prop } from 'ramda'

export const getNftsForContract = (contractAddress: string): Promise<GetNftResponse[]> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(
    getData,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    andThen(pipe(prop('nfts'), map(mapNft)))
    // FIXME We set the limit super high for now to avoid paging, should optimize that at some point
  )(getRoute(AlchemyV3Routes.GET_NFTS_FOR_CONTRACT), { contractAddress, limit: '100000', withMetadata: 'true' })
