import { updateUserWalletsAndUpdateNfts } from '../../utils/handler/update-user-wallets-and-update-nfts'
import { ErrorResponse, WalletResponse } from '@echo/api-public'
import { findNonceForUser, findUserByWallet } from '@echo/firebase-admin'
import { FirestoreUserData, FirestoreWalletData } from '@echo/firestore'
import { walletEquals } from '@echo/model'
import { addToArrayIfNotPresent } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'
import { SiweMessage } from 'siwe'

export const createWalletHandler = (
  user: FirestoreUserData,
  wallet: FirestoreWalletData,
  message: SiweMessage,
  signature: string,
  res: NextApiResponse<WalletResponse | ErrorResponse>
): Promise<void> => {
  return findUserByWallet(wallet)
    .then((userResult) => {
      if (R.isOk(userResult) && R.getExn(userResult).id !== user.id) {
        res.end(res.status(401).json({ error: 'Wallet is already linked to another account' }))
        return
      }
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
              const wallets = addToArrayIfNotPresent<FirestoreWalletData>(user.wallets ?? [], wallet, walletEquals)
              return updateUserWalletsAndUpdateNfts(user, wallets, res)
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
    })
    .catch(() => {
      res.end(res.status(401).json({ error: 'Could not validate wallet' }))
      return
    })
}
