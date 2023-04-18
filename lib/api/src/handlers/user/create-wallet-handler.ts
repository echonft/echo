import { ErrorResponse } from '../../types/models/responses/error-response'
import { WalletResponse } from '../../types/models/responses/wallet-response'
import { findNonceForUser, updateUserWallets } from '@echo/firebase-admin'
import { addWallet, Signature, User, Wallet } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'
import { SiweMessage } from 'siwe'

export const createWalletHandler = (
  user: User | undefined,
  wallet: Wallet | undefined,
  message: SiweMessage,
  signature: Signature,
  res: NextApiResponse<WalletResponse | ErrorResponse>
): Promise<void> => {
  if (isNil(user)) {
    res.end(res.status(401).json({ error: 'You must be logged in' }))
    return Promise.resolve()
  }
  if (isNil(wallet)) {
    res.end(res.status(500).json({ error: 'Wallet not provided' }))
    return Promise.resolve()
  }

  const siweMessage = new SiweMessage(message)
  return siweMessage
    .validate(signature)
    .then((validatedMessage) => {
      const { nonce } = validatedMessage
      return findNonceForUser(user.id)
        .then((result) => {
          if (R.isError(result)) {
            res.end(res.status(403).json({ error: 'No nonce found for user.' }))
            return Promise.resolve()
          }
          if (isNil(nonce) || nonce !== R.getExn(result)) {
            res.end(res.status(422).json({ error: 'Invalid nonce.' }))
            return Promise.resolve()
          }
          const wallets = addWallet(user.wallets ?? [], wallet)
          return updateUserWallets(user.id, wallets)
            .then(() => {
              res.status(200).json({ wallets })
              return Promise.resolve()
            })
            .catch(() => {
              res.end(res.status(500).json({ error: 'User not found' }))
              return Promise.resolve()
            })
        })
        .catch(() => {
          res.end(res.status(403).json({ error: 'No nonce found for user.' }))
          return Promise.resolve()
        })
    })
    .catch(() => {
      res.end(res.status(401).json({ error: 'Could not validate message' }))
      return Promise.resolve()
    })
}
