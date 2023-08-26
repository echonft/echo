import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { endResponseOnApiError } from '../../helpers/error/end-response-on-api-error'
import { createListing } from '../../helpers/listing/create-listing'
import { getListingTargets } from '../../helpers/listing/get-listing-targets'
import { parseCreateListingRequest } from '../../helpers/listing/parse-create-listing-request'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { assertUserHasWallets } from '../../helpers/user/assert-user-has-wallets'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest, CreateListingRequest, IdResponse } from '@echo/api-public'

export const createListingHandler: RequestHandler<ApiRequest<CreateListingRequest, never>, IdResponse> = async (
  req,
  res,
  session
) => {
  try {
    const creator = getUserFromSession(session)
    assertUserHasWallets(creator)
    const { items, targets } = parseCreateListingRequest(req.body)
    const nfts = await getOfferItems(items)
    const listingTargets = await getListingTargets(targets)
    const creatorWallet = await getOfferItemsWallet(nfts, creator)
    const id = await createListing(creator, creatorWallet, nfts, listingTargets)
    return res.status(200).json({ id })
  } catch (e) {
    return endResponseOnApiError(e, res)
  }
}
