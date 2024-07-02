import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { createError } from '@echo/frontend/lib/helpers/error/create-error'
import { assertQuicknodeSignature } from '@echo/frontend/lib/helpers/webhook/assert/assert-quicknode-signature'
import { handleNftTransfer } from '@echo/frontend/lib/helpers/webhook/handle-nft-transfer'
import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import { transferEventLogSchema } from '@echo/frontend/lib/validators/transfer-event-log-schema'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { NextResponse } from 'next/server'
import { assoc, objOf, otherwise, pipe } from 'ramda'

export async function nftTransferWebhookRequestHandler({
  params,
  req,
  logger
}: RequestHandlerArgsWithParams<{ chain: ChainName }, WebhookBlockRequest>) {
  await pipe(
    assertQuicknodeSignature,
    otherwise((err) => {
      throw createError(ErrorStatus.UNAUTHORIZED, err)
    })
  )({ req, type: 'nft-transfer' })
  const { chain } = params
  const transfers = await pipe(
    parseRequest(transferEventLogSchema(chain)),
    otherwise((err) => {
      throw createError(ErrorStatus.BAD_REQUEST, err)
    })
  )(req)
  for (const transfer of transfers) {
    await pipe<
      [NftTransfer],
      Record<'transfer', NftTransfer>,
      WithLoggerType<Record<'transfer', NftTransfer>>,
      Promise<void>,
      Promise<void>
    >(
      objOf('transfer'),
      assoc('logger', logger),
      handleNftTransfer,
      otherwise((err) => {
        logger?.error({ err, transfer }, 'could not process NFT transfer')
      })
    )(transfer)
  }
  return NextResponse.json({})
}
