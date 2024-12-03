import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { ChannelType, ThreadAutoArchiveDuration, userMention } from 'discord.js'
import i18next from 'i18next'

interface CreateOfferThreadArgs {
  readonly offer: Offer
  readonly sender: UserDocument
  readonly receiver: UserDocument
}

interface CreateOfferThreadReturn {
  readonly threadId: string
  readonly archive?: true
}

export async function createOfferThread({
  offer,
  receiver,
  sender
}: CreateOfferThreadArgs): Promise<CreateOfferThreadReturn> {
  const channel = await getEchoChannel()
  const thread = await channel.threads.create({
    name: i18next.t('offer.thread.name', { timestamp: now() }),
    autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
    type: ChannelType.PrivateThread
  })
  logger.info({ offer, thread }, 'created thread for offer')
  try {
    await thread.members.add(receiver.discord.id)
  } catch (err) {
    logger.error({ offer, err }, 'could not add receiver to thread')
    await deleteThread(thread)
    return { threadId: thread.id, archive: true }
  }
  try {
    await thread.members.add(sender.discord.id)
  } catch (err) {
    logger.error({ offer, err }, 'could not add sender to thread')
    await deleteThread(thread)
    return { threadId: thread.id, archive: true }
  }
  await sendToThread(thread, {
    components: [buildOfferLinkButton(offer)],
    content: i18next.t('offer.thread.message', {
      sender: userMention(sender.discord.id),
      receiver: userMention(receiver.discord.id)
    })
  })
  return { threadId: thread.id }
}
