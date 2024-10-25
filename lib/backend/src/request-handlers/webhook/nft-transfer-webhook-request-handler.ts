import { assertQuicknodeSignature } from '@echo/backend/request-handlers/webhook/assert-quicknode-signature'
import { nftTransferEventHandler } from '@echo/backend/request-handlers/webhook/event-handlers/nft-transfer-event-handler'
import type { RequestHandlerArgsWithParams } from '@echo/backend/types/request-handler'
import type { WebhookBlockRequest } from '@echo/backend/types/webhook-block-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import type { Chain } from '@echo/model/constants/chain'
import { erc721TransferEventSchema } from '@echo/web3/validators/erc721-transfer-event-schema'
import { NextResponse } from 'next/server'
import { andThen, pipe } from 'ramda'

interface Params {
  chain: Chain
}

export async function nftTransferWebhookRequestHandler({
  params,
  req
}: RequestHandlerArgsWithParams<Params, WebhookBlockRequest>) {
  const { chain } = params
  const transfers = await pipe(
    assertQuicknodeSignature,
    andThen(parseRequest(erc721TransferEventSchema(chain)))
  )({ req, type: 'nft-transfer' })
  for (const transfer of transfers) {
    await nftTransferEventHandler(transfer)
  }
  return NextResponse.json({})
}
