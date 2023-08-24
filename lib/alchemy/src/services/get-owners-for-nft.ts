import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { PagingResult } from '../types/paging/paging-result'
import { GetOwnersForNftRequest } from '../types/request/get-owners-for-nft-request'
import { handlePaging } from '../utils/handle-paging'
import { Wallet } from '@echo/firestore'
import { getData } from '@echo/utils'
import { andThen, applySpec, map, partial, pipe, prop } from 'ramda'

const fetchOwnersForNft: (request: GetOwnersForNftRequest) => Promise<PagingResult<Wallet>> = pipe(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  partial(getData, [getRoute(AlchemyV3Routes.GET_OWNERS_FOR_NFT)]),
  andThen(
    applySpec({
      data: pipe(
        prop<string[]>('owners'),
        map((owner) => ({ address: owner, chainId: 1 }))
      ),
      pageKey: prop('pageKey')
    })
  )
)

export const getOwnersForNft = async (contract: Wallet, tokenId: number) =>
  handlePaging<GetOwnersForNftRequest, Wallet>(fetchOwnersForNft, {
    contractAddress: contract.address,
    tokenId
  })
