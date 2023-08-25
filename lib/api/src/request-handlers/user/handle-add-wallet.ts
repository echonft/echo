import { getSiweMessage } from '../../helpers/auth/get-siwe-message'
import { verifySiweMessage } from '../../helpers/auth/verify-siwe-message'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { ForbiddenError } from '../../helpers/error/forbidden-error'
import { addUserWallet } from '../../helpers/user/add-user-wallet'
import { findUserByWallet } from '../../helpers/user/find-user-by-wallet'
import { parseAddWalletRequest } from '../../helpers/user/parse-add-wallet-request'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
import { AddWalletRequest, ApiRequest, ApiResponse, EmptyResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { isNil } from 'ramda'

export async function handleAddWallet(req: ApiRequest<AddWalletRequest>, res: ApiResponse<EmptyResponse>, user: User) {
  const { message, wallet, signature } = parseAddWalletRequest(req.body)
  const foundUser = await findUserByWallet(wallet)
  if (!isNil(foundUser)) {
    if (user.id === foundUser.id) {
      throw new BadRequestError('Wallet is already linked to this account')
    }
    throw new ForbiddenError('Wallet is already linked to another account')
  }
  const siweMessage = getSiweMessage(message)
  const { data, success } = await verifySiweMessage(signature, siweMessage)
  if (!success) {
    throw new BadRequestError('Could not validate message')
  }
  if (isNilOrEmpty(data.nonce) || data.nonce !== user.nonce) {
    throw new ForbiddenError('Invalid nonce')
  }
  await addUserWallet(user.id, wallet)
  await updateUserNfts(user)
  return res.status(200).json({})
}
