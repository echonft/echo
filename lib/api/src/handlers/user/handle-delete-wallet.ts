import { updateUserWalletsAndUpdateNfts } from '../../helpers/handler/update-user-wallets-and-update-nfts'
import { ErrorResponse, WalletResponse } from '@echo/api-public'
import { User, Wallet } from '@echo/firestore'
import { walletEquals } from '@echo/ui'
import { removeFromArray } from '@echo/utils'
import { NextApiResponse } from 'next'

export const handleDeleteWallet = async (
  user: User,
  wallet: Wallet,
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  const newWallets = removeFromArray(user.wallets ?? [], wallet, walletEquals)
  return updateUserWalletsAndUpdateNfts(user, newWallets, res)
}
