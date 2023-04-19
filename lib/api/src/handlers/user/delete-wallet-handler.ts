import { ErrorResponse } from '../../types/model/responses/error-response'
import { WalletResponse } from '../../types/model/responses/wallet-response'
import { updateUserWallets } from '@echo/firebase-admin'
import { User, Wallet, walletEquals } from '@echo/model'
import { removeArrayFromArray } from '@echo/utils'
import { NextApiResponse } from 'next'

export const deleteWalletHandler = async (
  user: User,
  wallets: Wallet[],
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  const newWallets = removeArrayFromArray(user.wallets ?? [], wallets, walletEquals)
  return updateUserWallets(user.id, newWallets)
    .then(() => res.status(200).json({ wallets: newWallets }))
    .catch(() => {
      res.end(res.status(500).json({ error: 'User not found' }))
      return Promise.resolve()
    })
}
