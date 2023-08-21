import { ApiError } from '../../helpers/api-error'
import { getUserFromSession } from '../../helpers/handler/get-user-from-session'
import { createOffer } from '../../helpers/offer/create-offer'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { parseCreateOfferSchema } from '../../helpers/offer/parse-create-offer-schema'
import { findUserByDiscordId } from '../../helpers/user/find-user-by-discord-id'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest, CreateOfferRequest, CreateOfferResponse } from '@echo/api-public'
import { addOfferToListing, findOfferById, getListingsWithNfts } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { concat, isEmpty, map, prop } from 'ramda'

export const createOfferHandler: RequestHandler<ApiRequest<CreateOfferRequest, never>, CreateOfferResponse> = async (
  req,
  res,
  session
) => {
  try {
    const sender = getUserFromSession(session)
    if (isNilOrEmpty(sender.wallets)) {
      res.end(res.status(401).json({ error: 'User does not have wallets' }))
      return
    }
    const { receiverItems, receiverDiscordId, senderItems } = parseCreateOfferSchema(req.body, 400, 'Invalid body')
    const receiver = await findUserByDiscordId(receiverDiscordId, 400, 'Invalid receiver')
    if (isNilOrEmpty(receiver.wallets)) {
      res.end(res.status(401).json({ error: 'Receiver does not have wallets' }))
      return
    }
    const receiverNfts = await getOfferItems(receiverItems, 400, 'Invalid receiver items')
    const senderNfts = await getOfferItems(senderItems, 400, 'Invalid sender items')
    const receiverWallet = await getOfferItemsWallet(receiverNfts, receiver, 401, 'Receiver do not own all the NFTs')
    const senderWallet = await getOfferItemsWallet(senderNfts, sender, 401, 'Sender do not own all the NFTs')
    const offerId = await createOffer(sender, senderWallet, senderNfts, receiver, receiverWallet, receiverNfts)
    // update listings that contain these NFTs, if any
    try {
      const listings = await getListingsWithNfts(map(prop('id'), concat(receiverNfts, senderNfts)))
      if (!isEmpty(listings)) {
        const offer = await findOfferById(offerId)
        for (const listing of listings) {
          await addOfferToListing(listing.id, offer)
        }
      }
      return res.status(200).json({ offerId })
    } catch (e) {
      // don't break the flow if this throws
      return res.status(200).json({ offerId })
    }
  } catch (e) {
    const { status, message } = e as ApiError
    res.end(res.status(status).json({ error: message }))
    return
  }
}
