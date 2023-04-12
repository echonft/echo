import { WalletResponse } from '../../types/models/responses/wallet-response'
import { updateUserWallets } from '@echo/firebase-admin'
import { removeWallet, User, Wallet } from '@echo/model'
import { NextApiResponse } from 'next'

export const deleteWalletHandler = async (user: User, wallet: Wallet, res: NextApiResponse<WalletResponse>) => {
  const wallets = removeWallet(user.wallets ?? [], wallet)
  await updateUserWallets(user.id, wallets)
  return res.status(200).json({ wallets })
}
