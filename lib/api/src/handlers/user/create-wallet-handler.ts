import { WalletResponse } from '../../types/models/responses/wallet-response'
import { addWallet } from '../../utils/wallets'
import { updateUserWallets } from '@echo/firebase-admin'
import { User, Wallet } from '@echo/model'
import { NextApiResponse } from 'next'

export const createWalletHandler = async (user: User, wallet: Wallet, res: NextApiResponse<WalletResponse>) => {
  const wallets = addWallet(user.wallets ?? [], wallet)
  await updateUserWallets(user.id, wallets)
  return res.status(200).json({ wallets })
}
