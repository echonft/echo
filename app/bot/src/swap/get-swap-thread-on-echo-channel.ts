import { getThreadOnEchoChannel } from '@echo/bot/helpers/get-thread-on-echo-channel'
import type { GetOfferThreadOnEchoChannelReturn } from '@echo/bot/offer/get-offer-thread-on-echo-channel'
import { OfferThreadState } from '@echo/firestore/constants/offer-thread-state'
import { getOfferThreadByOfferId } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-id'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { isNil } from 'ramda'

export async function getSwapThreadOnEchoChannel(swap: SwapDocument): Promise<GetOfferThreadOnEchoChannelReturn> {
  const offerThread = await getOfferThreadByOfferId(swap.offerId)
  if (isNil(offerThread) || offerThread.state === OfferThreadState.Archived) {
    return { offerThread: undefined, thread: undefined }
  }
  const thread = await getThreadOnEchoChannel(offerThread.guild.threadId)
  if (isNil(thread)) {
    return { offerThread, thread: undefined }
  }
  return { offerThread, thread }
}
