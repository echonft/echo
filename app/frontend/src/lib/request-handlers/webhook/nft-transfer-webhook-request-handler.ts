import type { ApiRequest } from '@echo/api/types/api-request'
import type { NftTransferWebhookRequest } from '@echo/api/types/requests/nft-transfer-webhook-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { assertAlchemyToken } from '@echo/frontend/lib/helpers/alchemy/assert-alchemy-token'
import { guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { hexStringSchema } from '@echo/frontend/lib/validators/hex-string-schema'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { hexToNumber, trim } from '@echo/web3/helpers/utils'
import { NextResponse } from 'next/server'
import { applySpec, flatten, map, path, pipe, toLower } from 'ramda'
import { z } from 'zod'

interface NftTransfer {
  contract: Lowercase<HexString>
  from: Lowercase<HexString>
  to: Lowercase<HexString>
  id: number
}

interface TransactionLog {
  account: {
    address: HexString
  }
  topics: HexString[]
}

interface Logs {
  transaction: {
    logs: TransactionLog[]
  }
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
              transaction: z.object({
                logs: z
                  .object({
                    account: z.object({
                      address: hexStringSchema
                    }),
                    topics: hexStringSchema.array().length(4)
                  })
                  .array()
                  .nonempty()
              })
            })
            .array()
            .nonempty()
        })
      })
    })
  })
  .transform((args) => {
    return pipe<[typeof args], NonEmptyArray<Logs>, NftTransfer[][], NftTransfer[]>(
      nonNullableReturn(path(['event', 'data', 'block', 'logs'])),
      map(
        pipe<[Logs], TransactionLog[], NftTransfer[]>(
          nonNullableReturn(path(['transaction', 'logs'])),
          map(
            applySpec({
              contract: pipe(nonNullableReturn(path(['account', 'address'])), toLower<HexString>),
              from: pipe<[TransactionLog], HexString, HexString, Lowercase<HexString>>(
                nonNullableReturn(path(['topics', 1])),
                trim<HexString>,
                toLower<HexString>
              ),
              to: pipe<[TransactionLog], HexString, HexString, Lowercase<HexString>>(
                nonNullableReturn(path(['topics', 2])),
                trim<HexString>,
                toLower<HexString>
              ),
              id: pipe<[TransactionLog], HexString, number>(nonNullableReturn(path(['topics', 3])), hexToNumber)
            })
          )
        )
      ),
      flatten
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
