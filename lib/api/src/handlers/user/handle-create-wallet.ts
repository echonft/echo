import { ApiError } from '../../helpers/api-error'
import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { addUserWallet } from '../../helpers/user/add-user-wallet'
import { findUserByWallet } from '../../helpers/user/find-user-by-wallet'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
import { EmptyResponse, ErrorResponse } from '@echo/api-public'
import { Wallet } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { isNil } from 'ramda'
import { SiweMessage } from 'siwe'

// TODO We shouldn't mock SIWEMessage, it should be using a real signature for thorough testing
export const handleCreateWallet = async (
  session: Session | undefined,
  wallet: Wallet,
  message: SiweMessage,
  signature: string,
  res: NextApiResponse<EmptyResponse | ErrorResponse>
): Promise<void> => {
  const user = getUserFromSession(session)
  const foundUser = await findUserByWallet(wallet)
  if (!isNil(foundUser)) {
    if (user.id === foundUser.id) {
      throw new ApiError(403, 'Wallet is already linked to this account')
    }
    throw new ApiError(403, 'Wallet is already linked to another account')
  }
  const siweMessage = new SiweMessage(message)
  const response = await siweMessage.verify({ signature, domain: siweMessage.domain, nonce: siweMessage.nonce })
  const { data, success } = response
  if (!success) {
    throw new ApiError(400, 'Could not validate message')
  }
  if (isNilOrEmpty(data.nonce) || data.nonce !== user.nonce) {
    throw new ApiError(400, 'Invalid nonce')
  }
  await addUserWallet(user.id, wallet)
  await updateUserNfts(user)
  return res.status(200).json({})
}
