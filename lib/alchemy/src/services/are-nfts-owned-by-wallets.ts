import { GetOwnersForNftRequest } from '../types/request/get-owners-for-nft-request'
import { isNftOwnedByWallets } from './is-nft-owned-by-wallets'
import { FirestoreWalletData } from '@echo/firestore'

interface Arguments {
  nfts: GetOwnersForNftRequest[]
  wallets: FirestoreWalletData[]
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
