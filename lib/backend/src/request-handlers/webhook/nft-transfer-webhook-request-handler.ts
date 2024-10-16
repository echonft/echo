import { assertQuicknodeSignature } from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { nftTransferEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/nft-transfer-event-handler'
import type { RequestHandlerArgsWithParams } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import type { ChainName } from '@echo/utils/types/chain-name'
import { transferEventLogSchema } from '@echo/web3/validators/transfer-event-log-schema'
import { NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

export async function nftTransferWebhookRequestHandler({
  params,
  req,
  logger
}: RequestHandlerArgsWithParams<{ chain: ChainName }, WebhookBlockRequest>) {
  const { chain } = params
  const transfers = await pipe(
    assertQuicknodeSignature,
    andThen(parseRequest(transferEventLogSchema(chain)))
  )({ req, type: 'nft-transfer' })
  for (const transfer of transfers) {
    await nftTransferEventHandler({ transfer, logger })
  }
  return NextResponse.json({})
}
