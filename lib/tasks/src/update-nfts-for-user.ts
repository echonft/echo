import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

export async function updateNftsForUser(args: WithLoggerType<Record<'user', UserDocumentData>>) {
  const { user, logger } = args
  logger?.info({ user }, 'updating NFTs for user')
  const wallets = await getWalletsForUser(user.username)
  for (const wallet of wallets) {
    await updateNftsForWallet({ wallet, logger })
  }
  logger?.info({ user }, 'updated NFTs for user')
}
