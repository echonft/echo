import { botLogger } from '@echo/bot/index'
import { createOfferThread } from '@echo/bot/offer/create-offer-thread'
import type { ChangeHandler } from '@echo/bot/types/change-handler'
import { addOfferThread } from '@echo/firestore/crud/offer-thread/add-offer-thread'
import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { type Offer } from '@echo/model/types/offer'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import { assoc, isNil } from 'ramda'

export async function offerChangeHandler(args: ChangeHandler<Offer>) {
  const { client, changeType, snapshot } = args
  if (changeType === 'added') {
    botLogger.info({ offer: { id: snapshot.id } }, 'offer was added')
    const offerThread = await getOfferThread(snapshot.id)
    if (isNil(offerThread)) {
      botLogger.info({ offer: { id: snapshot.id } }, 'offer thread does not exist, creating....')
      const offer = snapshot.data()
      const offerWithId = assoc('id', snapshot.id, offer)
      const sender = await getUserByUsername(offer.sender.username)
      if (isNil(sender)) {
        botLogger.error({ offer: offerWithId }, 'sender not found')
        return
      }
      const receiver = await getUserByUsername(offer.receiver.username)
      if (isNil(receiver)) {
        botLogger.error({ offer: offerWithId }, 'receiver not found')
        return
      }
      const { threadId, state } = await createOfferThread({ client, offer: offerWithId, sender, receiver })
      try {
        const guild = assoc('threadId', threadId, getEchoDiscordGuild())
        const { id, data } = await addOfferThread({ offerId: snapshot.id, guild, state })
        botLogger.info({ offer: offerWithId, offerThread: assoc('id', id, data) }, 'added offer thread to Firestore')
      } catch (err) {
        botLogger.error({ offer: offerWithId, err }, 'error adding offer thread to Firestore')
      }
    } else {
      botLogger.info({ offer: { id: snapshot.id } }, 'offer thread already exists, nothing to do')
    }
  }
}
