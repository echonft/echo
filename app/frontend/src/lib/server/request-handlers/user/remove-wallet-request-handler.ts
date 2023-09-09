import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { removeUserWallet } from '../../helpers/user/remove-user-wallet'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
import { removeWalletSchema } from '../../validators/remove-wallet-schema'
import { ApiRequest, EmptyResponse, RemoveWalletRequest } from '@echo/api'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'

export async function removeWalletRequestHandler(req: ApiRequest<RemoveWalletRequest>, authOptions: AuthOptions) {
  const user = await getUserFromSession(authOptions)
  const requestBody = await req.json()
  const { wallet } = parseRemoveWalletRequest(requestBody)
  await removeUserWallet(user.id, wallet)
  await updateUserNfts(user)
  return NextResponse.json<EmptyResponse>({})
}

function parseRemoveWalletRequest(request: RemoveWalletRequest) {
  try {
    return removeWalletSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing remove wallet request ${JSON.stringify(request)}`, e)
  }
}
