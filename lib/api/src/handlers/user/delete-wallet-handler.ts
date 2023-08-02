import { updateUserWalletsAndUpdateNfts } from '../../utils/handler/update-user-wallets-and-update-nfts'
import { ErrorResponse, WalletResponse } from '@echo/api-public'
import { FirestoreUserData, FirestoreWalletData } from '@echo/firestore'
import { walletEquals } from '@echo/model'
import { removeArrayFromArray } from '@echo/utils'
import { NextApiResponse } from 'next'

export const deleteWalletHandler = async (
  user: FirestoreUserData,
  wallets: FirestoreWalletData[],
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  const newWallets = removeArrayFromArray(user.wallets ?? [], wallets, walletEquals)
  return updateUserWalletsAndUpdateNfts(user, newWallets, res)
}
