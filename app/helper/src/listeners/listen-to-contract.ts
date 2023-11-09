import { tradeExecutedHandler } from '@echo/helper/handlers/trade-executed-handler'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { getChainId } from '@echo/web3/helpers/get-chain-id'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'
import { forEach, isNotNil } from 'ramda'
import { decodeEventLog, type Log } from 'viem'

export function listenToContract() {
  const chainId = getChainId()
  const client = getViemClient(chainId)
  client.watchContractEvent({
    address: getEchoAddress(chainId),
    abi: ECHO_ABI,
    eventName: 'TradeExecuted',
    onLogs: forEach((log: Log) => {
      const decodedLog = decodeEventLog({
        abi: ECHO_ABI,
        eventName: 'TradeExecuted',
        data: log.data,
        topics: log.topics
      })
      if (isNotNil(log.transactionHash)) {
        void tradeExecutedHandler(decodedLog.args.id, log.transactionHash)
      }
    })
  })
}
