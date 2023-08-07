import { updateUserNfts } from './update-user-nfts'
import { ErrorResponse, WalletResponse } from '@echo/api-public'
import { updateUserWallets } from '@echo/firebase-admin'
import { FirestoreUserData, FirestoreWalletData } from '@echo/firestore'
import { NextApiResponse } from 'next'

export const updateUserWalletsAndUpdateNfts = (
  user: FirestoreUserData,
  wallets: FirestoreWalletData[],
  res: NextApiResponse<WalletResponse | ErrorResponse>
) =>
  updateUserWallets(user.id, wallets)
    .then(() => {
      updateUserNfts(user)
        .then(() => {
          res.status(200).json({ wallets })
          return
        })
        .catch(() => {
          res.end(res.status(500).json({ error: 'Error updating user NFTs' }))
          return
        })
    })
    .catch(() => {
      res.end(res.status(500).json({ error: 'Error updating user wallets' }))
      return
    })
