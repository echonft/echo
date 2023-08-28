import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { createListing } from '../../helpers/listing/create-listing'
import { getListingTargets } from '../../helpers/listing/get-listing-targets'
import { parseCreateListingRequest } from '../../helpers/listing/parse-create-listing-request'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { assertUserHasWallets } from '../../helpers/user/assert-user-has-wallets'
import { ApiRequest, ApiResponse, CreateListingRequest, IdResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function createListingRequestHandler(
  req: ApiRequest<CreateListingRequest>,
  res: ApiResponse<IdResponse>,
  authOptions: AuthOptions
) {
  assertAllowedMethods(req, ['PUT'])
  const { items, targets } = parseCreateListingRequest(req.body)
  const creator = await getUserFromSession(req, res, authOptions)
  assertUserHasWallets(creator)
  const nfts = await getOfferItems(items)
  const listingTargets = await getListingTargets(targets)
  const creatorWallet = await getOfferItemsWallet(nfts, creator)
  const id = await createListing(creator, creatorWallet, nfts, listingTargets)
  return res.status(200).json({ id })
}
