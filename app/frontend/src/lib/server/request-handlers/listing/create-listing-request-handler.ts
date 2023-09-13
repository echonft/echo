import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { IdResponse } from '@echo/api/types/responses/id-response'
import { getUserFromSession } from '@server/helpers/auth/get-user-from-session'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { createListing } from '@server/helpers/listing/create-listing'
import { getListingTargets } from '@server/helpers/listing/get-listing-targets'
import { getOfferItems } from '@server/helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '@server/helpers/offer/get-offer-items-wallet'
import { assertUserHasWallets } from '@server/helpers/user/assert-user-has-wallets'
import { createListingSchema } from '@server/validators/create-listing-schema'
import { NextResponse } from 'next/server'
import type { AuthOptions } from 'next-auth'

export async function createListingRequestHandler(req: ApiRequest<CreateListingRequest>, authOptions: AuthOptions) {
  const requestBody = await req.json()
  const { items, targets } = parseCreateListingRequest(requestBody)
  const creator = await getUserFromSession(authOptions)
  assertUserHasWallets(creator)
  const nfts = await getOfferItems(items)
  const listingTargets = await getListingTargets(targets)
  const creatorWallet = await getOfferItemsWallet(nfts, creator)
  const id = await createListing(creator, creatorWallet, nfts, listingTargets)
  return NextResponse.json<IdResponse>({ id })
}

function parseCreateListingRequest(request: CreateListingRequest) {
  try {
    return createListingSchema.parse(request)
  } catch (e) {
    throw new BadRequestError(`error parsing create listing request ${JSON.stringify(request)}`, e)
  }
}
