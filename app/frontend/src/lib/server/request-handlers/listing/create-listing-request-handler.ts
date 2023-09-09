import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { createListing } from '../../helpers/listing/create-listing'
import { getListingTargets } from '../../helpers/listing/get-listing-targets'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { assertUserHasWallets } from '../../helpers/user/assert-user-has-wallets'
import { createListingSchema } from '../../validators/create-listing-schema'
import { ApiRequest, CreateListingRequest, IdResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'

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
