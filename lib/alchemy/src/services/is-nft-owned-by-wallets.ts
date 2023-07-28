/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { GetOwnersForNftRequest } from '../types/request/get-owners-for-nft-request'
import { GetOwnersForNftResponse } from '../types/response/get-owners-for-nft-response'
import { Wallet } from '@echo/model'
import { getData, intersects, toPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, map, pipe, prop, unless } from 'ramda'

interface Arguments {
  nft: GetOwnersForNftRequest
  wallets: Wallet[]
}

export const isNftOwnedByWallets = ({ nft, wallets }: Arguments): Promise<R.Result<boolean, Error>> =>
  pipe(
    getData<GetOwnersForNftResponse, GetOwnersForNftRequest>,
    andThen(
      // @ts-ignore
      unless(
        R.isError,
        pipe(
          R.getExn,
          prop<string[]>('owners'),
          intersects(map(prop('address'), wallets)),
          toPromise,
          R.fromPromise<boolean>
        )
      )
    )
  )(getRoute(AlchemyV3Routes.GET_OWNERS_FOR_NFT), nft)
