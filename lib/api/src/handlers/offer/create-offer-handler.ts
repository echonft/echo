import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { endResponseOnApiError } from '../../helpers/error/end-response-on-api-error'
import { createOffer } from '../../helpers/offer/create-offer'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { parseCreateOfferSchema } from '../../helpers/offer/parse-create-offer-schema'
import { assertUser } from '../../helpers/user/assert-user'
import { assertUserHasWallets } from '../../helpers/user/assert-user-has-wallets'
import { findUserById } from '../../helpers/user/find-user-by-id'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest, CreateOfferRequest, IdResponse } from '@echo/api-public'

export const createOfferHandler: RequestHandler<ApiRequest<CreateOfferRequest, never>, IdResponse> = async (
  req,
  res,
  session
) => {
  try {
    const sender = getUserFromSession(session)
    assertUserHasWallets(sender)
    const { receiverItems, receiverId, senderItems } = parseCreateOfferSchema(req.body)
    const receiver = await findUserById(receiverId)
    assertUser(receiver)
    assertUserHasWallets(receiver!)
    const receiverNfts = await getOfferItems(receiverItems)
    const senderNfts = await getOfferItems(senderItems)
    const receiverWallet = await getOfferItemsWallet(receiverNfts, receiver!)
    const senderWallet = await getOfferItemsWallet(senderNfts, sender)
    const id = await createOffer(sender, senderWallet, senderNfts, receiver!, receiverWallet, receiverNfts)
    return res.status(200).json({ id })
  } catch (e) {
    return endResponseOnApiError(e, res)
  }
}
