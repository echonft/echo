import type { WebhookBlockRequest } from '@echo/api/types/requests/webhook-block-request'
import { assertQuicknodeSignature } from '@echo/frontend/lib/helpers/webhook/assert/assert-quicknode-signature'
import { nftTransferEventHandler } from '@echo/frontend/lib/helpers/webhook/nft-transfer-event-handler'
import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import { transferEventLogSchema } from '@echo/frontend/lib/validators/transfer-event-log-schema'
import type { ChainName } from '@echo/utils/types/chain-name'
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
