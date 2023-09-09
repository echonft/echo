import { getSiweMessage } from '../../helpers/auth/get-siwe-message'
import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { verifySiweMessage } from '../../helpers/auth/verify-siwe-message'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { ForbiddenError } from '../../helpers/error/forbidden-error'
import { addUserWallet } from '../../helpers/user/add-user-wallet'
import { getUserByWallet } from '../../helpers/user/get-user-by-wallet'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
import { addWalletSchema } from '../../validators/add-wallet-schema'
import { AddWalletRequest, ApiRequest, EmptyResponse } from '@echo/api'
import { isNilOrEmpty } from '@echo/utils'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'
import { isNil } from 'ramda'

export async function addWalletRequestHandler(req: ApiRequest<AddWalletRequest>, authOptions: AuthOptions) {
  const user = await getUserFromSession(authOptions)
  const requestBody = await req.json()
  const { message, wallet, signature } = parseAddWalletRequest(requestBody)
  const foundUser = await getUserByWallet(wallet)
  if (!isNil(foundUser)) {
    if (user.id === foundUser.id) {
      throw new BadRequestError(
        `tried to add wallet ${JSON.stringify(wallet)} to user with id ${
          user.id
        } while it is already in the user's wallets`
      )
    }
    throw new ForbiddenError(
      `tried to add wallet ${JSON.stringify(wallet)} to user with id ${
        user.id
      } while it is already in the user with id ${foundUser.id} wallets`
    )
  }
  const siweMessage = getSiweMessage(message)
  const { data, success } = await verifySiweMessage(signature, siweMessage)
  if (!success) {
    throw new BadRequestError(
      `could not validate siwe message ${JSON.stringify(siweMessage)} with signature ${signature}`
    )
  }
  if (isNilOrEmpty(data.nonce) || data.nonce !== user.nonce) {
    throw new ForbiddenError(
      `nonce from request does not match nonce for user with id ${user.id}: ${data.nonce} != ${user.nonce}`
    )
  }
  await addUserWallet(user.id, wallet)
  await updateUserNfts(user)
  return NextResponse.json<EmptyResponse>({})
}

function parseAddWalletRequest(request: AddWalletRequest) {
  try {
    return addWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing add wallet request ${JSON.stringify(request)}`, e)
  }
}
