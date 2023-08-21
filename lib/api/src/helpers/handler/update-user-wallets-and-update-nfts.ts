import { ApiError } from '../api-error'
import { updateUserNfts } from './update-user-nfts'
import { ErrorResponse, WalletResponse } from '@echo/api-public'
import { updateUserWallets, User, Wallet } from '@echo/firestore'
import { NextApiResponse } from 'next'

export const updateUserWalletsAndUpdateNfts = async (
  user: User,
  wallets: Wallet[],
  res: NextApiResponse<WalletResponse | ErrorResponse>
) => {
  await updateUserWallets(user.id, wallets)
  try {
    await updateUserNfts(user)
    res.status(200).json({ wallets })
    return
  } catch (e) {
    throw new ApiError(500, 'Error updating user NFTs')
  }
}
