import { ErrorResponse } from '../../types/models/responses/error-response'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { updateUserWallets } from '@echo/firebase-admin'
import { removeWallet, User, Wallet } from '@echo/model'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'

export const deleteWalletHandler = (
  user: User | undefined,
  wallet: Wallet | undefined,
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  if (isNil(user)) {
    res.end(res.status(401).json({ error: 'You must be logged in' }))
    return Promise.resolve()
  }
  if (isNil(wallet)) {
    res.end(res.status(500).json({ error: 'Wallet not provided' }))
    return Promise.resolve()
  }

  const wallets = removeWallet(user.wallets ?? [], wallet)
  return updateUserWallets(user.id, wallets)
    .then(() => {
      res.status(200).json({ wallets })
      return Promise.resolve()
    })
    .catch(() => {
      res.end(res.status(500).json({ error: 'User not found' }))
      return Promise.resolve()
    })
}
