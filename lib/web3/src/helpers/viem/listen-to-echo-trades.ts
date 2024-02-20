import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/constants/echo-address'
import type { EchoAbi } from '@echo/web3/types/echo-abi'
import { forEach, isNotNil } from 'ramda'
import { decodeEventLog, type Log, type PublicClient } from 'viem'

export function listenToEchoTrades(
  client: PublicClient,
  handler: (offerId: string, transactionId: string) => Promise<void>
) {
  const abi: EchoAbi = ECHO_ABI
  const eventName = 'TradeExecuted'
  client.watchContractEvent({
    address: echoAddress,
    abi,
    eventName,
    onLogs: forEach((log: Log) => {
      if (isNotNil(log.transactionHash)) {
        const decodedLog = decodeEventLog({
          abi: ECHO_ABI,
          eventName,
          data: log.data,
          topics: log.topics
        })
        void handler(decodedLog.args.id, log.transactionHash)
      }
    }),
    onError: (error) => {
      pinoLogger.error(`error watching echo trades: ${errorMessage(error)}`)
    }
  })
}
