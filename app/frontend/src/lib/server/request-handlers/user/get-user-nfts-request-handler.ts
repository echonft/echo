import { getNftsForUser } from '../../helpers/nft/get-nfts-for-user'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { assertUser } from '../../helpers/user/assert-user'
import { getUserByUsername } from '../../helpers/user/get-user-by-username'
import { mapNft } from '../../mappers/to-response/map-nft'
import { ApiRequest, GetNftsResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getUserNftsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const user = await getUserByUsername(username)
  assertUser(user)
  const nfts = await getNftsForUser(user.id, constraints)
  return NextResponse.json<GetNftsResponse>({ nfts: map(mapNft, nfts) })
}
