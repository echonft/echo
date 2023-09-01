import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { parseRemoveWalletRequest } from '../../helpers/user/parse-remove-wallet-request'
import { removeUserWallet } from '../../helpers/user/remove-user-wallet'
import { updateUserNfts } from '../../helpers/user/update-user-nfts'
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
