import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, otherwise, pipe, prop } from 'ramda'

interface ChangeNftOwnershipArgs {
  nft: Nft
  wallet: Wallet
}

export async function changeNftOwnership(args: WithLoggerType<ChangeNftOwnershipArgs>): Promise<Nullable<Nft>> {
  const logger = args.logger?.child({ fn: changeNftOwnership.name })
  const { nft, wallet } = args
  const user = await pipe(
    getWalletOwner,
    otherwise((err) => {
      logger?.error({ err, wallet }, 'could not get wallet owner')
      return undefined
    })
  )(wallet)
  if (isNil(user)) {
    return await pipe(
      getNftSnapshot,
      otherwise((err) => {
        logger?.error({ err, nft }, 'could not get NFT snapshot')
        return undefined
      }),
      andThen(
        unlessNil(
          pipe(
            prop('id'),
            deleteNft,
            otherwise((err) => {
              logger?.error({ err, nft }, 'could not delete NFT')
              return undefined
            }),
            andThen(() => {
              logger?.info({ nft, wallet }, 'deleted NFT since the new owner is not in the database')
              return undefined
            })
          )
        )
      )
    )(nft)
  } else {
    // TODO check if any offers or listings are tied to this NFT and, if so, cancel them
    // see https://linear.app/echobot/issue/DEV-299/check-if-there-is-any-tied-offers-when-switching-ownership-of-an-nft
    // and https://linear.app/echobot/issue/DEV-301/check-if-there-is-any-tied-listings-when-switching-ownership-of-an-nft
    return await pipe(
      assoc('owner', getUserFromFirestoreData({ user, wallet })),
      updateNft,
      otherwise((err) => {
        logger?.error({ err, nft }, 'could not update NFT ownership')
        return undefined
      }),
      andThen((updatedNft) => {
        logger?.info({ nft: updatedNft }, 'updated NFT ownership')
        return updatedNft
      })
    )(nft)
  }
}
