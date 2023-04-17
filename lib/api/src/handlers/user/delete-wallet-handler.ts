import { ErrorResponse } from '../../types/model/responses/error-response'
import { WalletResponse } from '../../types/model/responses/wallet-response'
import { updateUserWallets } from '@echo/firebase-admin'
import { removeWallets, User, Wallet } from '@echo/model'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'

export const deleteWalletHandler = async (
  user: User,
  wallets: Wallet[],
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  const newWallets = removeWallets(user.wallets ?? [], wallets)
  return updateUserWallets(user.id, newWallets)
    .then(() => res.status(200).json({ wallets: newWallets }))
    .catch(() => {
      res.end(res.status(500).json({ error: 'User not found' }))
      return Promise.resolve()
    })
}
