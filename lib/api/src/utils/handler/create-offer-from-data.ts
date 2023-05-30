/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { mapNftToId } from '../../mappers/map-nft-to-id'
import { mapNftToNftIdWithContractAddress } from '../../mappers/map-nft-to-nft-id-with-contract-address'
import { ErrorResponse } from '../../types'
import { getAlchemy } from '../alchemy/alchemy'
import { walletsOwnTokens } from '../alchemy/wallets-own-tokens'
import { userIsInGuild } from './user-is-in-guild'
import { addOffer, findNftsById, updateRequestForOfferOffers } from '@echo/firebase-admin'
import { FirestoreDiscordGuildData, FirestoreOfferData, FirestoreUserData } from '@echo/firestore'
import { errorMessage, isNilOrEmpty, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { NextApiResponse } from 'next'
import { any, isNil, map } from 'ramda'

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
  sender: FirestoreUserData,
  senderItems: string[],
  receiver: FirestoreUserData,
  receiverItems: string[],
  discordGuild: FirestoreDiscordGuildData,
  res: NextApiResponse<FirestoreOfferData | ErrorResponse>,
  requestForOfferId?: string
) {
  if (isNilOrEmpty(sender.wallets) || isNilOrEmpty(receiver.wallets)) {
    res.end(res.status(401).json({ error: 'Users do not have wallets' }))
    return
  }
  if (userIsInGuild(sender, discordGuild)) {
    return Promise.all([findNftsById(senderItems), findNftsById(receiverItems)])
      .then((usersNftsResult) => {
        if (
          any((result) => R.isError(result), usersNftsResult[0]) ||
          any((result) => R.isError(result), usersNftsResult[1])
        ) {
          logger.error(`Error finding nfts`)
          res.end(res.status(500).json({ error: 'Could not find NFTs' }))
          return
        } else {
          const senderNfts = map(R.getExn, usersNftsResult[0])
          const receiverNfts = map(R.getExn, usersNftsResult[1])
          return Promise.all([
            walletsOwnTokens(getAlchemy(), sender.wallets, map(mapNftToNftIdWithContractAddress, senderNfts)),
            walletsOwnTokens(getAlchemy(), receiver.wallets, map(mapNftToNftIdWithContractAddress, receiverNfts))
          ])
            .then((usersOwnsAllNfts) => {
              // If one of them do not own the NFTs for the offer, reject
              if (usersOwnsAllNfts.some((userOwnsAllNfts) => !userOwnsAllNfts)) {
                res.end(res.status(401).json({ error: 'Users do not own all the NFTs' }))
                return
              }
              return addOffer({
                discordGuildId: discordGuild.id,
                senderId: sender.id,
                senderItems: senderNfts.map(mapNftToId),
                receiverId: receiver.id,
                receiverItems: receiverNfts.map(mapNftToId)
              })
                .then((offerResult) => {
                  if (R.isError(offerResult)) {
                    res.end(res.status(500).json({ error: 'Could not create offer' }))
                    return
                  }
                  const offer = R.getExn(offerResult)
                  // If request is bound to a request for offer, append the offer ref
                  if (!isNil(requestForOfferId)) {
                    return updateRequestForOfferOffers(requestForOfferId, offer.id)
                      .then(() => res.status(200).json(offer))
                      .catch((e) => {
                        logger.error(`Error updating request for offer: ${errorMessage(e)}`)
                        res.end(res.status(500).json({ error: 'Could not create offer' }))
                        return
                      })
                  }
                  return res.status(200).json(offer)
                })
                .catch((e) => {
                  logger.error(`Error creating offer: ${errorMessage(e)}`)
                  res.end(res.status(500).json({ error: 'Could not create offer' }))
                  return
                })
            })
            .catch((e) => {
              logger.error(`Error fetching from alchemy: ${errorMessage(e)}`)
              res.end(res.status(401).json({ error: 'Users do not own all the NFTs' }))
              return
            })
        }
      })
      .catch((reason) => {
        logger.error(`Error fetching NFTs: ${reason}`)
        res.end(res.status(500).json({ error: 'Could not find NFTs' }))
        return
      })
  } else {
    // TODO Does user making the offer needs to be in discord?
    res.end(res.status(401).json({ error: 'User is not in Discord Guild' }))
    return
  }
}
