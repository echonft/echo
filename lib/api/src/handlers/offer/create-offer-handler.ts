import { mapDataToOfferPrototype } from '../../mappers/map-data-to-offer-prototype'
import { mapOfferToResponse } from '../../mappers/map-offer-to-response'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { CreateOfferRequest } from '../../types/model/requests/create-offer-request'
import { OfferResponse } from '../../types/model/responses/offer-response'
import { createOfferSchema } from '../../types/validators/create-offer'
import { getAlchemy } from '../../utils/alchemy/alchemy'
import { walletsOwnTokens } from '../../utils/alchemy/wallets-own-tokens'
import { addOffer, findRequestForOfferById } from '@echo/firebase-admin'
import { userIsInGuild } from '@echo/model'
import { isNilOrEmpty, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const createOfferHandler: RequestHandler<ApiRequest<CreateOfferRequest, never>, OfferResponse> = async (
  req,
  res,
  session
) => {
  // TODO Shouldn't have to do that
  if (isNil(session)) {
    res.end(res.status(401).json({ error: 'You must be logged in' }))
    return
  }
  const { user } = session
  if (isNil(user)) {
    res.end(res.status(500).json({ error: 'User not found' }))
    return
  }
  if (isNilOrEmpty(user.wallets)) {
    res.end(res.status(401).json({ error: 'User does not have wallets' }))
    return
  }
  try {
    const validatedRequest = createOfferSchema.parse(req.body)
    if (isNil(validatedRequest.requestForOfferId)) {
      // TODO This needs to create an offer in that case
      res.end(res.status(401).json({ error: 'Cannot create request without a request for offer' }))
      return
    }
    return findRequestForOfferById(validatedRequest.requestForOfferId).then((requestForOfferResult) => {
      if (R.isError(requestForOfferResult)) {
        res.end(res.status(500).json({ error: 'Request for offer is not found' }))
        return
      }
      const requestForOffer = R.getExn(requestForOfferResult)
      if (userIsInGuild(user, requestForOffer.discordGuild)) {
        // We can unwrap here, wallets are not going to be empty or nil
        return walletsOwnTokens(getAlchemy(), user.wallets!, validatedRequest.senderItems)
          .then((userOwnsAllNfts) => {
            if (!userOwnsAllNfts) {
              res.end(res.status(401).json({ error: 'User does not own all the NFTs to offer' }))
              return
            }
            return addOffer(mapDataToOfferPrototype(user, validatedRequest, requestForOffer))
              .then((offerResult) => {
                if (R.isError(offerResult)) {
                  res.end(res.status(500).json({ error: 'Could not create offer' }))
                  return
                }
                return res.status(200).json(mapOfferToResponse(R.getExn(offerResult)))
              })
              .catch((e: Error) => {
                logger.error(`Error creating offer: ${JSON.stringify(e)}`)
                res.end(res.status(500).json({ error: 'Could not create offer' }))
                return
              })
          })
          .catch((reason) => {
            logger.error(`Error fetching from alchemy: ${JSON.stringify(reason)}`)
            res.end(res.status(500).json({ error: 'Could not create offer' }))
            return
          })
      } else {
        // TODO Does user making the offer needs to be in discord?
        res.end(res.status(401).json({ error: 'User is not in Discord Guild' }))
        return
      }
    })
  } catch {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
