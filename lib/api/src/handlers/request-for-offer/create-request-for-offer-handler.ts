import { getUserFromSession } from '../../helpers/handler/get-user-from-session'
import { mapNftToNftIdWithContractAddress } from '../../mappers/nft/map-nft-to-nft-id-with-contract-address'
import { RequestHandler } from '../../types/handlers/request-handler'
import { createRequestForOfferSchema } from '../../types/validators/create-request-for-offer'
import { areNftsOwnedByWallets } from '@echo/alchemy'
import { ApiRequest, CreateRequestForOfferRequest } from '@echo/api-public'
import {
  addRequestForOffer,
  findDiscordGuildByGuildId,
  findNftsByIds,
  FirestoreRequestForOfferData,
  userIsInGuild
} from '@echo/firestore'
import { errorMessage, isNilOrEmpty, logger } from '@echo/utils'
import { isNil, map } from 'ramda'

export const createRequestForOfferHandler: RequestHandler<
  ApiRequest<CreateRequestForOfferRequest, never>,
  FirestoreRequestForOfferData
> = async (req, res, session) => {
  const user = getUserFromSession(session, res)
  if (isNil(user)) {
    return
  }
  if (isNilOrEmpty(user.wallets)) {
    res.end(res.status(401).json({ error: 'User does not have wallets' }))
    return
  }
  try {
    const validatedRequest = createRequestForOfferSchema.parse(req.body)
    return findDiscordGuildByGuildId(validatedRequest.discordGuildId)
      .then((discordGuild) => {
        if (userIsInGuild(user, discordGuild)) {
          return findNftsByIds(validatedRequest.items)
            .then((nfts) => {
              return areNftsOwnedByWallets({ wallets: user.wallets, nfts: map(mapNftToNftIdWithContractAddress, nfts) })
                .then((owned) => {
                  if (!owned) {
                    res.end(res.status(401).json({ error: 'User does not own all the NFTs to offer' }))
                    return
                  }
                  return addRequestForOffer({
                    senderId: user.id,
                    discordGuildId: validatedRequest.discordGuildId,
                    items: validatedRequest.items,
                    target: validatedRequest.target
                  })
                    .then((requestForOffer) => {
                      return res.status(200).json(requestForOffer)
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
      .catch(() => {
        res.end(res.status(500).json({ error: 'Discord Guild not found' }))
        return
      })
  } catch {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
