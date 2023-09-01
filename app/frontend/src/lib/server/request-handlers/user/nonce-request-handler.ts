import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { setUserNonce } from '../../helpers/user/set-user-nonce'
import { ApiRequest, NonceResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'

export async function nonceRequestHandler(_req: ApiRequest<never>, authOptions: AuthOptions) {
  const user = await getUserFromSession(authOptions)
  const nonce = await setUserNonce(user)
  return NextResponse.json<NonceResponse>({ nonce })
}
