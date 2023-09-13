import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetUserResponse } from '@echo/api/types/responses/get-user-response'
import { assertUserExists } from '@server/helpers/user/assert-user-exists'
import { getUserByUsername } from '@server/helpers/user/get-user-by-username'
import { mapUser } from '@server/mappers/to-response/map-user'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(_req: ApiRequest<never>, username: string) {
  const user = await getUserByUsername(username)
  assertUserExists(username, user)
  return NextResponse.json<GetUserResponse>({ user: mapUser(user) })
}
