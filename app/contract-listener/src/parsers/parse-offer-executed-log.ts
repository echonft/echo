import { handleOfferExecutedEvent } from '@echo/contract-listener/handlers/handle-offer-executed-event'
import { decodeOfferExecutedLog } from '@echo/web3/decoders/decode-offer-executed-log'
import type { EchoOfferExecutedLog } from '@echo/web3/types/log/echo-offer-executed-log'

export async function parseOfferExecutedLog(log: EchoOfferExecutedLog) {
  const { transactionHash } = log
  const {
    args: { offerId }
  } = decodeOfferExecutedLog(log)
  await handleOfferExecutedEvent(offerId, transactionHash)
}
