import { mapNftToNftIdWithContractAddress } from '../../mappers/map-nft-to-nft-id-with-contract-address'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { CreateRequestForOfferRequest } from '../../types/model/requests/create-request-for-offer-request'
import { createRequestForOfferSchema } from '../../types/validators/create-request-for-offer'
import { getAlchemy } from '../../utils/alchemy/alchemy'
import { walletsOwnTokens } from '../../utils/alchemy/wallets-own-tokens'
import { userIsInGuild } from '../../utils/handler/user-is-in-guild'
import { validateAndExtractUserFromSession } from '../../utils/handler/validate-and-extract-user-from-session'
import { addRequestForOffer, findDiscordGuildByGuildId, findNftsByIds } from '@echo/firebase-admin'
import { FirestoreRequestForOfferData } from '@echo/firestore'
import { errorMessage, isNilOrEmpty, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { any, isNil, map } from 'ramda'

export const createRequestForOfferHandler: RequestHandler<
  ApiRequest<CreateRequestForOfferRequest, never>,
  FirestoreRequestForOfferData
> = async (req, res, session) => {
  const user = validateAndExtractUserFromSession(session, res)
  if (isNil(user)) {
    return
  }
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
        return findNftsByIds(validatedRequest.items)
          .then((nftResults) => {
            if (any(R.isError, nftResults)) {
              res.end(res.status(500).json({ error: 'Error fetching NFTs' }))
              return
            }
            const nfts = map(R.getExn, nftResults)
            return walletsOwnTokens(getAlchemy(), user.wallets, map(mapNftToNftIdWithContractAddress, nfts))
              .then((userOwnsAllNfts) => {
                if (!userOwnsAllNfts) {
                  res.end(res.status(401).json({ error: 'User does not own all the NFTs to offer' }))
                  return
                }
                return addRequestForOffer({
                  senderId: user.id,
                  discordGuildId: validatedRequest.discordGuildId,
                  items: validatedRequest.items,
                  target: validatedRequest.target
                })
                  .then((requestForOfferResult) => {
                    if (R.isError(requestForOfferResult)) {
                      res.end(res.status(500).json({ error: 'Could not create listing' }))
                      return
                    }
                    return res.status(200).json(R.getExn(requestForOfferResult))
                  })
                  .catch((e) => {
                    logger.error(`createRequestForOfferHandler Error creating request for offer: ${errorMessage(e)}`)
                    res.end(res.status(500).json({ error: 'Could not create listing' }))
                    return
                  })
              })
              .catch((e) => {
                logger.error(`createRequestForOfferHandler Error fetching from alchemy: ${errorMessage(e)}`)
                res.end(res.status(500).json({ error: 'Error fetching NFTs' }))
                return
              })
          })
          .catch((e) => {
            logger.error(`createRequestForOfferHandler Error fetching NFTs: ${errorMessage(e)}`)
            res.end(res.status(500).json({ error: 'Error fetching NFTs' }))
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
