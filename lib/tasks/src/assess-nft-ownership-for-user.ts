import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { assessNftOwnershipForWallet } from '@echo/tasks/assess-nft-ownership-for-wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { otherwise, pipe } from 'ramda'

export async function assessNftOwnershipForUser(args: WithLoggerType<Record<'user', UserDocumentData>>) {
  const { user } = args
  const logger = args.logger?.child({ fn: assessNftOwnershipForUser.name })
  const wallets = await pipe(
    getWalletsForUser,
    otherwise((err) => {
      logger?.error({ err, user }, 'could not get wallets for user')
      return []
    })
  )(user.username)
  for (const wallet of wallets) {
    await assessNftOwnershipForWallet({ wallet, logger })
  }
}
