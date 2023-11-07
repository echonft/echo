import { archiveThread } from '@echo/bot/helpers/archive-thread'
import { getChannel } from '@echo/bot/helpers/get-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import { findOfferThreadById } from '@echo/firestore/crud/offer-thread/find-offer-thread-by-id'
import { deleteOfferThreadCloseRequest } from '@echo/firestore/crud/offer-thread-close-request/delete-offer-thread-close-request'
import { getAllReadyOfferThreadCloseRequests } from '@echo/firestore/crud/offer-thread-close-request/get-all-ready-offer-thread-close-requests'
import type { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function flushOfferThreadCloseRequests(client: Client) {
  const requests = await getAllReadyOfferThreadCloseRequests()
  for (const request of requests) {
    const offerThread = await findOfferThreadById(request.offerThreadId)
    if (!isNil(offerThread)) {
      const channel = await getChannel(client, offerThread.guild.channelId)
      const thread = await getThread(channel, offerThread.guild.threadId)
      await archiveThread(thread)
    }
    await deleteOfferThreadCloseRequest(request.id)
  }
}
