import { ErrorResponse } from '../../types/model/responses/error-response'
import { WalletResponse } from '../../types/model/responses/wallet-response'
import { findNonceForUser, updateUserWallets } from '@echo/firebase-admin'
import { User, Wallet, walletEquals } from '@echo/model'
import { addToArrayIfNotPresent } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'
import { SiweMessage } from 'siwe'

export const createWalletHandler = (
  user: User,
  wallet: Wallet,
  message: SiweMessage,
  signature: string,
  res: NextApiResponse<WalletResponse | ErrorResponse>
): Promise<void> => {
  const siweMessage = new SiweMessage(message)
  return siweMessage
    .validate(signature)
    .then((validatedMessage) => {
      const { nonce } = validatedMessage
      return findNonceForUser(user.id)
        .then((result: R.Result<string, Error>) => {
          if (R.isError(result)) {
            res.end(res.status(403).json({ error: 'No nonce found for user.' }))
            return
          }
          if (isNil(nonce) || nonce !== R.getExn(result)) {
            res.end(res.status(422).json({ error: 'Invalid nonce.' }))
            return
          }
          const wallets = addToArrayIfNotPresent<Wallet>(user.wallets ?? [], wallet, walletEquals)
          return updateUserWallets(user.id, wallets)
            .then(() => {
              res.status(200).json({ wallets })
              return
            })
            .catch(() => {
              res.end(res.status(500).json({ error: 'User not found' }))
              return
            })
        })
        .catch(() => {
          res.end(res.status(403).json({ error: 'No nonce found for user.' }))
          return
        })
    })
    .catch(() => {
      res.end(res.status(401).json({ error: 'Could not validate message' }))
      return
    })
}
