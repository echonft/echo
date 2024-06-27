import type { ProcessEchoEventArgs } from '@echo/frontend/lib/helpers/webhook/process-echo-event'
import { deepMapBigintToNumber } from '@echo/utils/helpers/deep-map-bigint-to-number'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getEchoOffer } from '@echo/web3/helpers/get-echo-offer'

export async function processEchoOfferCreatedEvent(args: WithLoggerType<ProcessEchoEventArgs>) {
  const { logger, event, chain } = args
  const { offerId } = event
  const contractOffer = await getEchoOffer({ chain, offerId })
  const cleanedContractOffer = deepMapBigintToNumber(contractOffer)
  logger?.info(`contract offer is ${JSON.stringify(cleanedContractOffer)}`)

  // const offer = await guardAsyncFn({ fn: getOfferByContractId, status: ErrorStatus.BAD_REQUEST, logger })(offerId)
  // if (isNil(offer)) {
  //   logger?.error({ offer: { id: offerId } }, 'offer not found')
  //   return
  // }
  // await guardAsyncFn({
  //   fn: completeOffer,
  //   status: ErrorStatus.SERVER_ERROR,
  //   logger
  // })({
  //   slug: offer.slug,
  //   transactionId: transactionHash,
  //   updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
  // })
  // logger?.info({ offer: assoc('id', offerId, offer) }, 'completed offer')
}
