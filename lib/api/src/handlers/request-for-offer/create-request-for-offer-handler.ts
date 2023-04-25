import { mapDataToRequestForOfferPrototype } from '../../mappers/map-data-to-request-for-offer-prototype'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { CreateRequestForOfferRequest } from '../../types/model/requests/create-request-for-offer-request'
import { CreateRequestForOfferResponse } from '../../types/model/responses/create-request-for-offer-response'
import { createRequestForOfferSchema } from '../../types/validators/create-request-for-offer'
import { addRequestForOffer, findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { userIsInGuild } from '@echo/model'
import { logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const createRequestForOfferHandler: RequestHandler<
  ApiRequest<CreateRequestForOfferRequest, never>,
  CreateRequestForOfferResponse
> = async (req, res, session) => {
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
  try {
    const validatedRequest = createRequestForOfferSchema.parse(req.body)
    return findDiscordGuildByGuildId(validatedRequest.discordGuildId).then((discordGuildResult) => {
      if (R.isError(discordGuildResult)) {
        res.end(res.status(500).json({ error: 'Discord Guild not found' }))
        return
      }
      const discordGuild = R.getExn(discordGuildResult)
      if (userIsInGuild(user, discordGuild)) {
        return addRequestForOffer(mapDataToRequestForOfferPrototype(user, validatedRequest))
          .then((requestForOfferResult) => {
            if (R.isError(requestForOfferResult)) {
              res.end(res.status(500).json({ error: 'Could not create listing' }))
              return
            }
            // FIXME Should be casted to response
            return res
              .status(200)
              .json({ ...R.getExn(requestForOfferResult) } as unknown as CreateRequestForOfferResponse)
          })
          .catch((e: Error) => {
            logger.error(`Error creating request for offer: ${JSON.stringify(e)}`)
            res.end(res.status(500).json({ error: 'Could not create listing' }))
            return
          })
      } else {
        res.end(res.status(401).json({ error: 'User is not in Discord Guild' }))
        return
      }
    })
  } catch {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
