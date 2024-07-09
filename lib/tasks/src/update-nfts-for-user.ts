import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { otherwise, pipe } from 'ramda'

interface UpdateNftsForUserArgs extends WithFetch {
  user: UserDocumentData
}

/**
 * Updates all the NFTs of a user
 * @param args
 */
export async function updateNftsForUser(args: WithLoggerType<UpdateNftsForUserArgs>): Promise<void> {
  const { user, fetch, logger } = args
  logger?.info({ user }, 'updating NFTs for user')
  const wallets = await pipe(
    getWalletsForUser,
    otherwise((err) => {
      logger?.error({ err, user }, 'could not get wallets for user')
      return []
    })
  )(user.username)
  for (const wallet of wallets) {
    await pipe(
      updateNftsForWallet,
      otherwise((err) => {
        logger?.error({ err, user, wallet }, 'could not update NFTs for wallet')
      })
    )({ wallet, fetch, logger })
    await delayPromise(() => Promise.resolve(), 10000)()
  }
  logger?.info({ user }, 'updated NFTs for user')
}
