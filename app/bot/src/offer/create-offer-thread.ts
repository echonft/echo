import { deleteThread } from '@echo/bot/helpers/delete-thread'
import { getEchoChannel } from '@echo/bot/helpers/get-echo-channel'
import { sendToThread } from '@echo/bot/helpers/send-to-thread'
import { buildOfferLinkButton } from '@echo/bot/offer/build-offer-link-button'
import type { OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { ChannelType, type Client, ThreadAutoArchiveDuration, userMention } from 'discord.js'
import i18next from 'i18next'

interface CreateOfferThreadArgs {
  client: Client
  offer: Offer & Record<'id', string>
  sender: UserDocumentData
  receiver: UserDocumentData
  logger?: Nullable<Logger>
}

export async function createOfferThread(args: CreateOfferThreadArgs): Promise<{
  threadId: string
  state: OfferThread['state']
}> {
  const { client, offer, receiver, sender, logger } = args
  const channel = await getEchoChannel({ client, logger })
  const thread = await channel.threads.create({
    name: i18next.t('offer.thread.name', { timestamp: now() }),
    autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
    type: ChannelType.PrivateThread
  })
  logger?.error({ offer, thread }, 'created thread for offer')
  try {
    await thread.members.add(receiver.discord.id)
  } catch (err) {
    logger?.error({ offer, err }, 'could not add receiver to thread')
    await deleteThread(thread)
    return { threadId: thread.id, state: 'ARCHIVED' }
  }
  try {
    await thread.members.add(sender.discord.id)
  } catch (err) {
    logger?.error({ offer, err }, 'could not add sender to thread')
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
