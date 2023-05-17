import { mapDataToRequestForOfferPrototype } from '../../mappers/map-data-to-request-for-offer-prototype'
import { mapRequestForOfferToResponse } from '../../mappers/map-request-for-offer-to-response'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { CreateRequestForOfferRequest } from '../../types/model/requests/create-request-for-offer-request'
import { RequestForOfferResponse } from '../../types/model/responses/request-for-offer-response'
import { createRequestForOfferSchema } from '../../types/validators/create-request-for-offer'
import { getAlchemy } from '../../utils/alchemy/alchemy'
import { walletsOwnTokens } from '../../utils/alchemy/wallets-own-tokens'
import { validateAndExtractUserFromSession } from '../../utils/handler/validate-and-extract-user-from-session'
import { addRequestForOffer, findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { userIsInGuild } from '@echo/model'
import { isNilOrEmpty, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const createRequestForOfferHandler: RequestHandler<
  ApiRequest<CreateRequestForOfferRequest, never>,
  RequestForOfferResponse
> = async (req, res, session) => {
  const validatedSessionAndUser = validateAndExtractUserFromSession(session, res)
  if (isNil(validatedSessionAndUser)) {
    return
  }
  const { user } = validatedSessionAndUser
  if (isNilOrEmpty(user.wallets)) {
    res.end(res.status(401).json({ error: 'User does not have wallets' }))
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
        // We can unwrap here, wallets are not going to be empty or nil
        return walletsOwnTokens(getAlchemy(), user.wallets!, validatedRequest.items)
          .then((userOwnsAllNfts) => {
            if (!userOwnsAllNfts) {
              res.end(res.status(401).json({ error: 'User does not own all the NFTs to offer' }))
              return
            }
            return addRequestForOffer(mapDataToRequestForOfferPrototype(user, validatedRequest))
              .then((requestForOfferResult) => {
                if (R.isError(requestForOfferResult)) {
                  res.end(res.status(500).json({ error: 'Could not create listing' }))
                  return
                }
                return res.status(200).json(mapRequestForOfferToResponse(R.getExn(requestForOfferResult)))
              })
              .catch((e: Error) => {
                logger.error(`Error creating request for offer: ${JSON.stringify(e)}`)
                res.end(res.status(500).json({ error: 'Could not create listing' }))
                return
              })
          })
          .catch((reason) => {
            logger.error(`Error fetching from alchemy: ${JSON.stringify(reason)}`)
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
