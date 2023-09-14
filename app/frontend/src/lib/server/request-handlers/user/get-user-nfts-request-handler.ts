import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetNftsResponse } from '@echo/api/types/responses/get-nfts-response'
import { getNftsForUser } from '@server/helpers/nft/get-nfts-for-user'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { assertUser } from '@server/helpers/user/assert-user'
import { getUserByUsername } from '@server/helpers/user/get-user-by-username'
import { mapNftToResponse } from '@server/mappers/to-response/map-nft-to-response'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getUserNftsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const user = await getUserByUsername(username)
  assertUser(user)
  const nfts = await getNftsForUser(user.id, constraints)
  return NextResponse.json<GetNftsResponse>({ nfts: map(mapNftToResponse, nfts) })
}
