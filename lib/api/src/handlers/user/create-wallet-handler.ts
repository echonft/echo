import { updateUserWalletsAndUpdateNfts } from '../../utils/handler/update-user-wallets-and-update-nfts'
import { ErrorResponse, WalletResponse } from '@echo/api-public'
import { findNonceForUser, findUserByWallet } from '@echo/firebase-admin'
import { FirestoreUserData, FirestoreWalletData } from '@echo/firestore'
import { walletEquals } from '@echo/model'
import { addToArrayIfNotPresent, isNilOrEmpty } from '@echo/utils'
import { NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'

// TODO We shouldn't mock SIWEMessage, it should be using a real signature for thorough testing
export const createWalletHandler = (
  user: FirestoreUserData,
  wallet: FirestoreWalletData,
  message: SiweMessage,
  signature: string,
  res: NextApiResponse<WalletResponse | ErrorResponse>
): Promise<void> => {
  return findUserByWallet(wallet)
    .then((foundUser) => {
      if (user.id !== foundUser.id) {
        res.end(res.status(401).json({ error: 'Wallet is already linked to another account' }))
        return
      }
      const siweMessage = new SiweMessage(message)
      return siweMessage
        .verify({ signature, domain: siweMessage.domain, nonce: siweMessage.nonce })
        .then((response) => {
          const { data, success } = response
          if (!success) {
            res.end(res.status(401).json({ error: 'Could not validate message' }))
            return
          }
          return findNonceForUser(user.id)
            .then((foundNonce) => {
              if (isNilOrEmpty(data.nonce) || data.nonce !== foundNonce) {
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
      res.end(res.status(401).json({ error: 'Cannot find wallet' }))
      return
    })
}
