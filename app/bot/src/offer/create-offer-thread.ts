import { getEchoChannel } from '@echo/bot/get-echo-channel'
import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Offer } from '@echo/model/types/offer'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { now } from '@echo/utils/helpers/now'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { ChannelType, ThreadAutoArchiveDuration, userMention } from 'discord.js'
import i18next from 'i18next'

interface CreateOfferThreadArgs {
  offer: Offer
  offerId: string
  sender: UserDocumentData
  receiver: UserDocumentData
}

export async function createOfferThread(args: CreateOfferThreadArgs): Promise<{
  threadId: string
  state: OfferThread['state']
}> {
  const { offer, offerId, receiver, sender } = args
  const channel = await getEchoChannel()
  const thread = await channel.threads.create({
    name: i18next.t('offer.thread.name', { timestamp: now() }),
    autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
    type: ChannelType.PrivateThread
  })
  pinoLogger.error(`[OFFER ${offerId}] created thread: ${thread.id}`)
  try {
    await thread.members.add(receiver.discord.id)
  } catch (err) {
    pinoLogger.error(`[OFFER ${offerId}] could not add receiver ${receiver.username} to thread: ${errorMessage(err)}`)
    await deleteThread(thread)
    return { threadId: thread.id, state: 'ARCHIVED' }
  }
  try {
    await thread.members.add(sender.discord.id)
  } catch (err) {
    pinoLogger.error(`[OFFER ${offerId}] could not add sender ${sender.username} to thread: ${errorMessage(err)}`)
    await deleteThread(thread)
    return { threadId: thread.id, state: 'ARCHIVED' }
  }
  await sendToThread(thread, {
    components: [buildOfferLinkButton(offer.slug)],
    content: i18next.t('offer.thread.message', {
      sender: userMention(sender.discord.id),
      receiver: userMention(receiver.discord.id)
    })
  })
  return { threadId: thread.id, state: 'ACTIVE' }
}
