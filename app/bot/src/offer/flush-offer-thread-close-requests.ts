import { guardedDeleteOfferThreadCloseRequest } from '@echo/bot/firestore/guarded-delete-offer-thread-close-request'
import { guardedFindOfferThreadById } from '@echo/bot/firestore/guarded-find-offer-thread-by-id'
import { guardedGetAllReadyOfferThreadCloseRequests } from '@echo/bot/firestore/guarded-get-all-ready-offer-thread-close-requests'
import { archiveThread } from '@echo/bot/helpers/archive-thread'
import { getChannel } from '@echo/bot/helpers/get-channel'
import { getThread } from '@echo/bot/helpers/get-thread'
import type { Client } from 'discord.js'
import { isNil } from 'ramda'

export async function flushOfferThreadCloseRequests(client: Client) {
  const requests = await guardedGetAllReadyOfferThreadCloseRequests()
  for (const request of requests) {
    const offerThread = await guardedFindOfferThreadById(request.offerThreadId)
    if (!isNil(offerThread)) {
      const channel = await getChannel(client, offerThread.guild.channelId)
      if (!isNil(channel)) {
        const thread = await getThread(channel, offerThread.guild.threadId)
        if (!isNil(thread)) {
          await archiveThread(thread)
        }
      }
    }
    await guardedDeleteOfferThreadCloseRequest(request.id)
  }
}
