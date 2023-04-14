import { ErrorResponse } from '../../types'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { updateUserWallets } from '@echo/firebase-admin'
import { removeWallet, User, Wallet } from '@echo/model'
import { NextApiResponse } from 'next'

export const deleteWalletHandler = async (
  user: User,
  wallet: Wallet,
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  const wallets = removeWallet(user.wallets ?? [], wallet)
  return updateUserWallets(user.id, wallets)
    .then(() => res.status(200).json({ wallets }))
    .catch(() => {
      res.end(res.status(500).json({ error: 'User not found' }))
      return
    })
}
