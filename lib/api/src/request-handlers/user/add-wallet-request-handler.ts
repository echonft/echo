import { getSiweMessage } from '../../helpers/auth/get-siwe-message'
import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { verifySiweMessage } from '../../helpers/auth/verify-siwe-message'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { ForbiddenError } from '../../helpers/error/forbidden-error'
import { addUserWallet } from '../../helpers/user/add-user-wallet'
import { findUserByWallet } from '../../helpers/user/find-user-by-wallet'
import { parseAddWalletRequest } from '../../helpers/user/parse-add-wallet-request'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
import { AddWalletRequest, ApiRequest, EmptyResponse } from '@echo/api-public'
import { isNilOrEmpty } from '@echo/utils'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'
import { isNil } from 'ramda'

export async function addWalletRequestHandler(req: ApiRequest<AddWalletRequest>, authOptions: AuthOptions) {
  const user = await getUserFromSession(authOptions)
  const requestBody = await req.json()
  const { message, wallet, signature } = parseAddWalletRequest(requestBody)
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
  return NextResponse.json<EmptyResponse>({})
}
