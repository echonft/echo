import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { GetOwnersForNftRequest } from '../types/request/get-owners-for-nft-request'
import { Wallet } from '@echo/firestore'
import { getData, intersects } from '@echo/utils'
import { andThen, map, pipe, prop } from 'ramda'

interface Arguments {
  nft: GetOwnersForNftRequest
  wallets: Wallet[]
}

export const isNftOwnedByWallets = ({ nft, wallets }: Arguments): Promise<boolean> =>
  pipe(getData, andThen(pipe(prop<string[]>('owners'), intersects(map(prop('address'), wallets)))))(
    getRoute(AlchemyV3Routes.GET_OWNERS_FOR_NFT),
    nft
  )
