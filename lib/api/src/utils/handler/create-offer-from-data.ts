/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { mapOfferToResponse } from '../../mappers/map-offer-to-response'
import { ErrorResponse } from '../../types'
import { OfferResponse } from '../../types/model/responses/offer-response'
import { getAlchemy } from '../alchemy/alchemy'
import { walletsOwnTokens } from '../alchemy/wallets-own-tokens'
import { addOffer, updateRequestForOfferOffers } from '@echo/firebase-admin'
import { FirestoreOfferPrototype } from '@echo/firestore'
import { DiscordGuild, User, userIsInGuild } from '@echo/model'
import { isNilOrEmpty, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { NextApiResponse } from 'next'
import { isNil } from 'ramda'

/**
 * Validates data and creates the offer
 * @param sender
 * @param senderItems
 * @param receiver
 * @param receiverItems
 * @param discordGuild
 * @param res
 */
export function createOfferFromData(
  sender: User,
  _senderItems: string[],
  receiver: User,
  _receiverItems: string[],
  discordGuild: DiscordGuild,
  res: NextApiResponse<OfferResponse | ErrorResponse>,
  requestForOfferId?: string
) {
  if (isNilOrEmpty(sender.wallets) || isNilOrEmpty(receiver.wallets)) {
    res.end(res.status(401).json({ error: 'Users do not have wallets' }))
    return
  }
  if (userIsInGuild(sender, discordGuild)) {
    // FIXME
    return Promise.all([
      walletsOwnTokens(getAlchemy(), sender.wallets, []),
      walletsOwnTokens(getAlchemy(), receiver.wallets, [])
    ])
      .then((usersOwnsAllNfts) => {
        // If one of them do not own the NFTs for the offer, reject
        if (usersOwnsAllNfts.some((userOwnsAllNfts) => !userOwnsAllNfts)) {
          res.end(res.status(401).json({ error: 'Users do not own all the NFTs to offer' }))
          return
        }
        // FIXME
        return addOffer({} as unknown as FirestoreOfferPrototype)
          .then((offerResult) => {
            if (R.isError(offerResult)) {
              res.end(res.status(500).json({ error: 'Could not create offer' }))
              return
            }
            const offer = R.getExn(offerResult)
            // If request is bound to a request for offer, append the offer ref
            if (!isNil(requestForOfferId)) {
              return updateRequestForOfferOffers(requestForOfferId, offer.id)
                .then(() => res.status(200).json(mapOfferToResponse(offer)))
                .catch((error) => {
                  logger.error(`Error updating request for offer: ${error}`)
                  res.end(res.status(500).json({ error: 'Could not create offer' }))
                  return
                })
            }
            return res.status(200).json(mapOfferToResponse(offer))
          })
          .catch((e: Error) => {
            logger.error(`Error creating offer: ${e}`)
            res.end(res.status(500).json({ error: 'Could not create offer' }))
            return
          })
      })
      .catch((reason) => {
        logger.error(`Error fetching from alchemy: ${reason}`)
        res.end(res.status(500).json({ error: 'Could not create offer' }))
        return
      })
  } else {
    // TODO Does user making the offer needs to be in discord?
    res.end(res.status(401).json({ error: 'User is not in Discord Guild' }))
    return
  }
}
