import { GetOwnersForNftRequest } from '../types/request/get-owners-for-nft-request'
import { isNftOwnedByWallets } from './is-nft-owned-by-wallets'
import { Wallet } from '@echo/model'

interface Arguments {
  nfts: GetOwnersForNftRequest[]
  wallets: Wallet[]
}

export const areNftsOwnedByWallets = ({ nfts, wallets }: Arguments): Promise<boolean> => {
  let owned = true
  nfts.forEach((nft) => {
    isNftOwnedByWallets({ nft, wallets })
      .then((result) => {
        if (!result) {
          owned = false
        }
      })
      .catch(() => Promise.reject('error fetching NFT owner'))
  })
  return Promise.resolve(owned)
}
