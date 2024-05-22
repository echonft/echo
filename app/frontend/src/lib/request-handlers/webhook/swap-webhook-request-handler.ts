import type { ApiRequest } from '@echo/api/types/api-request'
import type { SwapWebhookRequest, SwapWebhookRequestLog } from '@echo/api/types/requests/swap-webhook-request'
import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { hexStringSchema } from '@echo/frontend/lib/validators/hex-string-schema'
import type { Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Nullable } from '@echo/utils/types/nullable'
import { decodeOfferId } from '@echo/web3/helpers/decode-offer-id'
import { NextResponse } from 'next/server'
import { applySpec, filter, isEmpty, isNil, join, map, path, pipe, prop } from 'ramda'
import { z } from 'zod'

const swapEventSchema = z
  .object({
    webhookId: z.literal(process.env.ALCHEMY_WEBHOOK_SWAPS),
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
    return pipe<[typeof args], NonEmptyArray<SwapWebhookRequestLog>, { offerId: string; txHash: HexString }[]>(
      nonNullableReturn(path(['event', 'data', 'block', 'logs'])),
      map(
        applySpec({
          offerId: pipe(prop('data'), decodeOfferId),
          txHash: nonNullableReturn(path(['transaction', 'hash']))
        })
      )
    )(args)
  })

export async function swapWebhookRequestHandler(req: ApiRequest<SwapWebhookRequest>) {
  const body = await req.text()
  // assertAlchemyToken(body)
  const swapEvents = guardFn(
    pipe<[string], SwapWebhookRequest, { offerId: string; txHash: HexString }[]>(
      JSON.parse,
      (body: SwapWebhookRequest) => swapEventSchema.parse(body)
    ),
    ErrorStatus.BAD_REQUEST
  )(body)
  const offers = await pipe<
    [{ offerId: string; txHash: HexString }[]],
    Promise<Nullable<Offer>>[],
    Promise<Nullable<Offer>[]>
  >(
    map(pipe(prop('offerId'), guardAsyncFn(getOfferById, ErrorStatus.SERVER_ERROR))),
    promiseAll
  )(swapEvents)
  const nullOffers = filter(isNil)(offers)
  if (!isEmpty(nullOffers)) {
    // TODO Better logging
    pinoLogger.error(
      `received trade executed for offers ${pipe<[{ offerId: string; txHash: HexString }[]], string[], string>(
        map(prop('offerId')),
        join(',')
      )(swapEvents)} but ${nullOffers.length} of the offers do not exist`
    )
    return NextResponse.json({})
  }
  // We can use the events directly here since if some offers are null it returns
  await pipe(
    map(({ offerId, txHash }: { offerId: string; txHash: HexString }) =>
      guardAsyncFn(
        completeOffer,
        ErrorStatus.SERVER_ERROR
      )({
        offerId,
        transactionId: txHash,
        updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
      })
    ),
    promiseAll
  )(swapEvents)
  return NextResponse.json({})
}
