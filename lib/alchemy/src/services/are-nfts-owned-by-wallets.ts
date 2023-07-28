import { GetOwnersForNftRequest } from '../types/request/get-owners-for-nft-request'
import { isNftOwnedByWallets } from './is-nft-owned-by-wallets'
import { Wallet } from '@echo/model'
import { R } from '@mobily/ts-belt'

interface Arguments {
  nfts: GetOwnersForNftRequest[]
  wallets: Wallet[]
}

export const areNftsOwnedByWallets = ({ nfts, wallets }: Arguments): Promise<R.Result<boolean, Error>> => {
  let owned = true
  nfts.forEach((nft) => {
    isNftOwnedByWallets({ nft, wallets })
      .then((result) => {
        if (R.isError(result) || !R.getExn(result)) {
          owned = false
        }
      })
      .catch(() => R.fromPromise(Promise.reject('error fetching NFT owner')))
  })
  return R.fromPromise(Promise.resolve(owned))
}
