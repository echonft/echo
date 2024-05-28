import { parseOfferExecutedLog } from '@echo/contract-listener/helpers/parse-offer-executed-log'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { EchoLog } from '@echo/web3/types/log/echo-log'
import type { EchoOfferExecutedLog } from '@echo/web3/types/log/echo-offer-executed-log'
import { join } from 'ramda'

export async function parseLog(log: EchoLog) {
  pinoLogger.info(`Got an ${log.eventName} event with topics: ${join(', ')(log.topics)}`)
  if (log.eventName === 'OfferExecuted') {
    await parseOfferExecutedLog(log as EchoOfferExecutedLog)
  }
  // TODO add OfferAccepted
  // TODO add OfferCanceled
  // TODO add OfferCreated
  // TODO add OfferRedeeemed
  return
}
