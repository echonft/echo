import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import type { ChangeHandler } from '@echo/bot/types/change-handler'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { type Offer } from '@echo/model/types/offer'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import { assoc, isNil } from 'ramda'

export async function offerChangeHandler(args: ChangeHandler<Offer>) {
  const { client, changeType, snapshot, logger } = args
  if (changeType === 'added') {
    logger?.info({ offer: { id: snapshot.id } }, 'offer was added')
    const offerThread = await getOfferThread(snapshot.id)
    if (isNil(offerThread)) {
      logger?.info({ offer: { id: snapshot.id } }, 'offer thread does not exist, creating....')
      const offer = snapshot.data()
      const offerWithId = assoc('id', snapshot.id, offer)
      const sender = await getUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        logger?.error({ offer: offerWithId }, 'sender not found')
        return
      }
      const receiver = await getUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        logger?.error({ offer: offerWithId }, 'receiver not found')
        return
      }
      const { threadId, state } = await createOfferThread({ client, offer: offerWithId, sender, receiver, logger })
      try {
        const guild = assoc('threadId', threadId, getEchoDiscordGuild())
        const { id, data } = await addOfferThread({ offerId: snapshot.id, guild, state })
        logger?.info({ offer: offerWithId, offerThread: assoc('id', id, data) }, 'added offer thread to Firestore')
      } catch (err) {
        logger?.error({ offer: offerWithId, err }, 'error adding offer thread to Firestore')
      }
    } else {
      logger?.info({ offer: { id: snapshot.id } }, 'offer thread already exists, nothing to do')
    }
  }
}
