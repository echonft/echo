import { assertUser } from '../../helpers/user/assert-user'
import { getUserByUsername } from '../../helpers/user/get-user-by-username'
import { mapUser } from '../../mappers/to-response/map-user'
import { ApiRequest, GetUserResponse } from '@echo/api'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(_req: ApiRequest<never>, username: string) {
  const user = await getUserByUsername(username)
  assertUser(user)
  return NextResponse.json<GetUserResponse>({ user: mapUser(user) })
}
