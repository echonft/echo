import { assertQuicknodeSignature } from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { nftTransferEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/nft-transfer-event-handler'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { erc721TransferEventSchema } from '@echo/web3/validators/erc721-transfer-event-schema'
import { NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

export async function nftTransferWebhookRequestHandler({ req }: RequestHandlerArgs<WebhookBlockRequest>) {
  const transfers = await pipe(
    assertQuicknodeSignature,
    andThen(parseRequest(erc721TransferEventSchema))
  )({ req, type: 'nft-transfer' })
  for (const transfer of transfers) {
    await nftTransferEventHandler(transfer)
  }
  return NextResponse.json({})
}
