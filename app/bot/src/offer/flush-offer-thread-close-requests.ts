import { guarded_deleteOfferThreadCloseRequest } from '@echo/bot/firestore/guarded_delete-offer-thread-close-request'
import { guarded_findOfferThreadById } from '@echo/bot/firestore/guarded_find-offer-thread-by-id'
import { guarded_getAllReadyOfferThreadCloseRequests } from '@echo/bot/firestore/guarded_get-all-ready-offer-thread-close-requests'
import { archiveThread } from '@echo/bot/helpers/archive-thread'
import { getChannel } from '@echo/bot/helpers/get-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import type { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function flushOfferThreadCloseRequests(client: Client) {
  const requests = await guarded_getAllReadyOfferThreadCloseRequests()
  for (const request of requests) {
    const offerThread = await guarded_findOfferThreadById(request.offerThreadId)
    if (!isNil(offerThread)) {
      const channel = await getChannel(client, offerThread.guild.channelId)
      if (!isNil(channel)) {
        const thread = await getThread(channel, offerThread.guild.threadId)
        if (!isNil(thread)) {
          await archiveThread(thread)
        }
      }
    }
    await guarded_deleteOfferThreadCloseRequest(request.id)
  }
}
