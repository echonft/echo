import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { CreateOfferRequest } from '../../types/model/requests/create-offer-request'
import { OfferResponse } from '../../types/model/responses/offer-response'
import { createOfferSchema } from '../../types/validators/create-offer'
import { createOfferFromData } from '../../utils/handler/create-offer-from-data'
import { validateAndExtractUserFromSession } from '../../utils/handler/validate-and-extract-user-from-session'
import { findDiscordGuildById, findRequestForOfferById, findUserById } from '@echo/firebase-admin'
import { canRequestForOfferReceiveOffers } from '@echo/model'
import { isNilOrEmpty, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const createOfferHandler: RequestHandler<ApiRequest<CreateOfferRequest, never>, OfferResponse> = async (
  req,
  res,
  session
) => {
  const user = validateAndExtractUserFromSession(session, res)
  if (isNil(user)) {
    return
  }
  if (isNilOrEmpty(user.wallets)) {
    res.end(res.status(401).json({ error: 'User does not have wallets' }))
    return
  }
  try {
    const validatedRequest = createOfferSchema.parse(req.body)
    if (validatedRequest.withRequestForOffer) {
      return findRequestForOfferById(validatedRequest.requestForOfferId)
        .then((requestForOfferResult) => {
          if (R.isError(requestForOfferResult)) {
            res.end(res.status(500).json({ error: 'Request for offer is not found' }))
            return
          }
          const requestForOffer = R.getExn(requestForOfferResult)
          if (!canRequestForOfferReceiveOffers(requestForOffer)) {
            res.end(res.status(500).json({ error: 'Request for offer cannot accept offers' }))
            return
          }
          return createOfferFromData(
            user,
            validatedRequest.senderItems,
            requestForOffer.sender,
            validatedRequest.receiverItems,
            requestForOffer.discordGuild,
            res
          )
        })
        .catch((error) => {
          logger.error(`createOfferHandler error on findRequestForOfferById: ${JSON.stringify(error)}`)
          res.end(res.status(500).json({ error: 'Request for offer is not found' }))
          return
        })
      // No request for offer included, fetch receiver and discord guild
    } else {
      return Promise.all([
        findUserById(validatedRequest.receiverId),
        findDiscordGuildById(validatedRequest.discordGuildId)
      ])
        .then((results) => {
          if (R.isError(results[0]) || R.isError(results[1])) {
            logger.error(`createOfferHandler error on findUserById or findDiscordGuildById`)
            res.end(res.status(500).json({ error: 'Could not create offer' }))
            return
          }
          const receiver = R.getExn(results[0])
          const discordGuild = R.getExn(results[1])
          return createOfferFromData(
            user,
            validatedRequest.senderItems,
            receiver,
            validatedRequest.receiverItems,
            discordGuild,
            res
          )
        })
        .catch((error) => {
          logger.error(
            `createOfferHandler error thrown on findUserById or findDiscordGuildById: ${JSON.stringify(error)}`
          )
          res.end(res.status(500).json({ error: 'Could not create offer' }))
          return
        })
    }
  } catch {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
