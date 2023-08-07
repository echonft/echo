/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { mapNftToId } from '../../mappers/map-nft-to-id'
import { mapNftToNftIdWithContractAddress } from '../../mappers/map-nft-to-nft-id-with-contract-address'
import { userIsInGuild } from './user-is-in-guild'
import { areNftsOwnedByWallets } from '@echo/alchemy'
import { ErrorResponse } from '@echo/api-public'
import { addOffer, findNftsByIds, updateRequestForOfferOffers } from '@echo/firebase-admin'
import { FirestoreDiscordGuildData, FirestoreOfferData, FirestoreUserData } from '@echo/firestore'
import { errorMessage, isNilOrEmpty, logger } from '@echo/utils'
import { NextApiResponse } from 'next'
import { isNil, map, not } from 'ramda'

/**
 * Validates data and creates the offer
 * @param sender
 * @param senderItems
 * @param receiver
 * @param receiverItems
 * @param discordGuild
 * @param res
 * @param requestForOfferId
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
    return Promise.all([findNftsByIds(senderItems), findNftsByIds(receiverItems)])
      .then((usersNfts) => {
        const senderNfts = usersNfts[0]
        const receiverNfts = usersNfts[1]
        return Promise.all([
          areNftsOwnedByWallets({ wallets: sender.wallets, nfts: map(mapNftToNftIdWithContractAddress, senderNfts) }),
          areNftsOwnedByWallets({
            wallets: receiver.wallets,
            nfts: map(mapNftToNftIdWithContractAddress, receiverNfts)
          })
        ])
          .then((usersOwnsAllNfts) => {
            // If one of them do not own the NFTs for the offer, reject
            if (usersOwnsAllNfts.some(not)) {
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
              .then((offer) => {
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
