import type { ApiRequest } from '@echo/api/types/api-request'
import type {
  NftTransferWebhookRequest,
  NftTransferWebhookRequestLog
} from '@echo/api/types/requests/nft-transfer-webhook-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { assertAlchemyToken } from '@echo/frontend/lib/helpers/alchemy/assert-alchemy-token'
import { guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { hexStringSchema } from '@echo/frontend/lib/validators/hex-string-schema'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { NextResponse } from 'next/server'
import { applySpec, map, path, pipe, toLower } from 'ramda'
import { z } from 'zod'

interface NftTransfer {
  contract: Lowercase<HexString>
  from: Lowercase<HexString>
  to: Lowercase<HexString>
}

const nftTransferEventSchema = z
  .object({
    webhookId: z.literal(process.env.ALCHEMY_WEBHOOK_NFT_TRANSFERS),
    id: z.string(),
    createdAt: z.string().datetime(),
    type: z.string(),
    event: z.object({
      data: z.object({
        block: z.object({
          logs: z
            .object({
              data: hexStringSchema,
              account: z.object({
                address: hexStringSchema
              }),
              transaction: z.object({
                hash: hexStringSchema,
                from: z.object({
                  address: hexStringSchema
                }),
                to: z.object({
                  address: hexStringSchema
                })
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
    return pipe<[typeof args], NonEmptyArray<NftTransferWebhookRequestLog>, NftTransfer[]>(
      nonNullableReturn(path(['event', 'data', 'block', 'logs'])),
      map(
        applySpec({
          contract: pipe(nonNullableReturn(path(['account', 'address'])), toLower<HexString>),
          from: pipe(nonNullableReturn(path(['transaction', 'from', 'address'])), toLower<HexString>),
          to: pipe(nonNullableReturn(path(['transaction', 'to', 'address'])), toLower<HexString>)
        })
      )
    )(args)
  })

export async function nftTransferWebhookRequestHandler(req: ApiRequest<NftTransferWebhookRequest>) {
  const body = await req.text()
  assertAlchemyToken(body)
  const transfers = guardFn(
    pipe<[string], NftTransferWebhookRequest, NftTransfer[]>(JSON.parse, (body: NftTransferWebhookRequest) =>
      nftTransferEventSchema.parse(body)
    ),
    ErrorStatus.BAD_REQUEST
  )(body)
  pinoLogger.info(`transfers ${JSON.stringify(transfers)}`)
  return NextResponse.json({})
}
