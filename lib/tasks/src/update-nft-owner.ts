import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil, otherwise, pipe } from 'ramda'

export interface UpdateNftOwnerArgs {
  nft: NftIndex
  wallet: Wallet
}

/**
 * Updates the NFT owner in Firestore
 * If the wallet is in our database, it sets it has the owner of the NFT
 * Else, it removes the owner
 * @param args
 * @throws Error returns a rejected promise if the NFT owner could not have been updated
 */
export async function updateNftOwner(args: WithLoggerType<UpdateNftOwnerArgs>): Promise<Nft> {
  const { nft, wallet, logger } = args
  const user = await pipe(
    getUserByWallet,
    otherwise((err) => {
      logger?.error({ err, wallet }, 'could not get wallet owner')
      return undefined
    })
  )(wallet)
  if (isNil(user)) {
    return removeNftOwner(nft)
  } else {
    return setNftOwner({ nft, owner: getUserFromFirestoreData({ user, wallet }) })
  }
  // TODO check if any offers or listings are tied to this NFT and, if so, cancel them
  // see https://linear.app/echobot/issue/DEV-299/check-if-there-is-any-tied-offers-when-switching-ownership-of-an-nft
  // and https://linear.app/echobot/issue/DEV-301/check-if-there-is-any-tied-listings-when-switching-ownership-of-an-nft
}
