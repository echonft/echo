import { ApiError } from '../../helpers/api-error'
import { updateUserWalletsAndUpdateNfts } from '../../helpers/handler/update-user-wallets-and-update-nfts'
import { findUserByWallet } from '../../helpers/user/find-user-by-wallet'
import { ErrorResponse, WalletResponse } from '@echo/api-public'
import { User, Wallet } from '@echo/firestore'
import { walletEquals } from '@echo/ui'
import { addToArrayIfNotPresent, isNilOrEmpty } from '@echo/utils'
import { NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'

// TODO We shouldn't mock SIWEMessage, it should be using a real signature for thorough testing
export const handleCreateWallet = async (
  user: User,
  wallet: Wallet,
  message: SiweMessage,
  signature: string,
  res: NextApiResponse<WalletResponse | ErrorResponse>
): Promise<void> => {
  const foundUser = await findUserByWallet(wallet)
  if (user.id !== foundUser.id) {
    throw new ApiError(401, 'Wallet is already linked to another account')
  }
  const siweMessage = new SiweMessage(message)
  const response = await siweMessage.verify({ signature, domain: siweMessage.domain, nonce: siweMessage.nonce })
  const { data, success } = response
  if (!success) {
    throw new ApiError(401, 'Could not validate message')
  }
  const userNonce = foundUser.nonce
  if (isNilOrEmpty(data.nonce) || data.nonce !== userNonce) {
    throw new ApiError(422, 'Invalid nonce')
  }
  const wallets = addToArrayIfNotPresent<Wallet>(user.wallets ?? [], wallet, walletEquals)
  return updateUserWalletsAndUpdateNfts(user, wallets, res)
}
