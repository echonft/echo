import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft, PartialNft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil, otherwise, pipe } from 'ramda'

interface UpdateNftOwnerArgs {
  nft: PartialNft
  wallet: Wallet
}

/**
 * Updates the NFT owner in Firestore
 * If the wallet is in our database, it sets it has the owner of the NFT
 * Else, it removes the owner
 * @param args
 * @throws Error returns a rejected promise if the NFT owner could not have been updated
 */
export async function updateNftOwner(args: WithLoggerType<UpdateNftOwnerArgs>): Promise<Nullable<Nft>> {
  const { nft, wallet, logger } = args
  const user = await pipe(
    getWalletOwner,
    otherwise((err) => {
      logger?.error({ err, wallet }, 'could not get wallet owner')
      return undefined
    })
  )(wallet)
  if (isNil(user)) {
    return removeNftOwner(nft)
  } else {
    return setNftOwner({ nft: getNftIndex(nft), owner: getUserFromFirestoreData({ user, wallet }) })
  }
  // TODO check if any offers or listings are tied to this NFT and, if so, cancel them
  // see https://linear.app/echobot/issue/DEV-299/check-if-there-is-any-tied-offers-when-switching-ownership-of-an-nft
  // and https://linear.app/echobot/issue/DEV-301/check-if-there-is-any-tied-listings-when-switching-ownership-of-an-nft
}
