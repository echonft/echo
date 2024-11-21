import { assertQuicknodeSignature } from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { erc721TransferEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/erc721-transfer-event-handler'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import type { Erc721TransferEvent } from '@echo/web3/types/erc721-transfer-event'
import { erc721TransferEventsSchema } from '@echo/web3/validators/erc721-transfer-event-schema'
import { NextResponse } from 'next/server'
import { always, andThen, otherwise, pipe } from 'ramda'

export async function nftTransferWebhookRequestHandler({ req }: RequestHandlerArgs<WebhookBlockRequest>) {
  const transfers = await pipe(
    assertQuicknodeSignature,
    andThen(parseRequest(erc721TransferEventsSchema)),
    otherwise(always<Erc721TransferEvent[]>([]))
  )({ req, type: 'nft-transfer' })
  for (const transfer of transfers) {
    await erc721TransferEventHandler(transfer)
  }
  return NextResponse.json({})
}
