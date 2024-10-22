import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import type { WithClient } from '@echo/bot/types/with-client'
import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadByOfferSlug } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-slug'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { AnyThreadChannel } from 'discord.js'
import { isNil } from 'ramda'

interface GetOfferThreadOnEchoChannelArgs extends WithClient, WithLogger {
  offer: Offer
}

interface GetOfferThreadOnEchoChannelReturn {
  offerThread: Nullable<OfferThreadDocumentData>
  thread: Nullable<AnyThreadChannel>
}

export async function getOfferThreadOnEchoChannel({
  client,
  offer,
  logger
}: GetOfferThreadOnEchoChannelArgs): Promise<GetOfferThreadOnEchoChannelReturn> {
  const offerThread = await getOfferThreadByOfferSlug(offer.slug)
  if (isNil(offerThread) || offerThread.state === OfferThreadState.Archived) {
    return { offerThread: undefined, thread: undefined }
  }
  const thread = await getThreadOnEchoChannel({ client, threadId: offerThread.guild.threadId, logger })
  if (isNil(thread)) {
    return { offerThread, thread: undefined }
  }
  return { offerThread, thread }
}
