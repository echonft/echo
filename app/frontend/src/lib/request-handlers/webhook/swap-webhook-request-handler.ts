import type { ApiRequest } from '@echo/api/types/api-request'
import type { SwapWebhookRequest, SwapWebhookRequestLog } from '@echo/api/types/requests/swap-webhook-request'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { assertAlchemyToken } from '@echo/frontend/lib/helpers/alchemy/assert-alchemy-token'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { hexStringSchema } from '@echo/frontend/lib/validators/hex-string-schema'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { decodeOfferId } from '@echo/web3/helpers/decode-offer-id'
import { NextResponse } from 'next/server'
import { applySpec, head, isNil, path, pipe, prop } from 'ramda'
import { z } from 'zod'

const swapEventSchema = z
  .object({
    webhookId: z.string(),
    id: z.string(),
    createdAt: z.string().datetime(),
    type: z.string(),
    event: z.object({
      data: z.object({
        block: z.object({
          logs: z
            .object({
              data: hexStringSchema,
              transaction: z.object({
                hash: hexStringSchema
              })
            })
            .array()
            .nonempty()
        })
      }),
      sequenceNumber: z.string()
    })
  })
  .transform((args) => {
    return pipe<
      [typeof args],
      NonEmptyArray<SwapWebhookRequestLog>,
      SwapWebhookRequestLog,
      { offerId: string; txHash: HexString }
    >(
      nonNullableReturn(path(['event', 'data', 'block', 'logs'])),
      head,
      applySpec<{ offerId: string; txHash: HexString }>({
        offerId: pipe(prop('data'), decodeOfferId),
        txHash: nonNullableReturn(path(['transaction', 'hash']))
      })
    )(args)
  })

export async function swapWebhookRequestHandler(req: ApiRequest<SwapWebhookRequest>) {
  const body = await req.text()
  assertAlchemyToken(body)
  const { offerId, txHash } = guardFn(
    pipe<[string], SwapWebhookRequest, { offerId: string; txHash: HexString }>(JSON.parse, (body: SwapWebhookRequest) =>
      swapEventSchema.parse(body)
    ),
    ErrorStatus.BAD_REQUEST
  )(body)
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(offerId)
  if (isNil(offer)) {
    pinoLogger.error(`received trade executed for offer ${offerId} but the offer does not exist`)
    return NextResponse.json({})
  }
  await guardAsyncFn(
    completeOffer,
    ErrorStatus.SERVER_ERROR
  )({
    offerId,
    transactionId: txHash,
    updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
  })
  return NextResponse.json({})
}
