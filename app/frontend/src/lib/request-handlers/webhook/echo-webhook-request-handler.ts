import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferByContractId } from '@echo/firestore/crud/offer/get-offer-by-contract-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSignatureHeadersFromRequest } from '@echo/frontend/lib/helpers/webhook/get-signature-headers-from-request'
import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import type { QuicknodeSignatureType } from '@echo/frontend/lib/types/webhook/quicknode-signature-type'
import { echoEventLogSchema } from '@echo/frontend/lib/validators/echo-event-log-schema'
import { validateQuicknodeSignature } from '@echo/frontend/lib/validators/validate-quicknode-signature'
import type { ChainName } from '@echo/utils/types/chain-name'
import { NextResponse } from 'next/server'
import { andThen, assoc, invoker, isNil, objOf, pipe } from 'ramda'

export async function echoWebhookRequestHandler({
  req,
  logger
}: RequestHandlerArgsWithParams<{ chain: ChainName }, WebhookBlockRequest>) {
  await guardAsyncFn({
    fn: pipe(
      getSignatureHeadersFromRequest,
      assoc('type', 'echo' as QuicknodeSignatureType),
      validateQuicknodeSignature
    ),
    status: ErrorStatus.UNAUTHORIZED,
    logger
  })(req)
  // TODO Right now we only take the executed events
  const offerExecutedEvents = await guardAsyncFn({
    fn: pipe(invoker(0, 'json'), andThen(pipe(objOf('data'), (data) => echoEventLogSchema.parse(data)))),
    status: ErrorStatus.BAD_REQUEST,
    logger
  })(req)
  for (const event of offerExecutedEvents) {
    const { offerId, transactionHash } = event
    const offer = await guardAsyncFn({ fn: getOfferByContractId, status: ErrorStatus.BAD_REQUEST, logger })(offerId)
    if (isNil(offer)) {
      logger?.error({ offer: { id: offerId } }, 'offer not found')
      break
    }
    await guardAsyncFn({
      fn: completeOffer,
      status: ErrorStatus.SERVER_ERROR,
      logger
    })({
      slug: offer.slug,
      transactionId: transactionHash,
      updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
    })
    logger?.info({ offer: assoc('id', offerId, offer) }, 'completed offer')
  }
  return NextResponse.json({})
}
