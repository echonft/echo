import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadByOfferSlug } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-slug'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'
import type { Offer } from '@echo/model/types/offer'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AnyThreadChannel } from 'discord.js'
import { isNil } from 'ramda'

export interface GetOfferThreadOnEchoChannelReturn {
  readonly offerThread: Nullable<OfferThreadDocument>
  readonly thread: Nullable<AnyThreadChannel>
}

export async function getOfferThreadOnEchoChannel(offer: Offer): Promise<GetOfferThreadOnEchoChannelReturn> {
  const offerThread = await getOfferThreadByOfferSlug(offer.slug)
  if (isNil(offerThread) || offerThread.state === OfferThreadState.Archived) {
    return { offerThread: undefined, thread: undefined }
  }
  const thread = await getThreadOnEchoChannel(offerThread.guild.threadId)
  if (isNil(thread)) {
    return { offerThread, thread: undefined }
  }
  return { offerThread, thread }
}
