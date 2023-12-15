import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { getChainId } from '@echo/web3/helpers/get-chain-id'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import type { EchoAbi } from '@echo/web3/types/echo-abi'
import { forEach, isNotNil } from 'ramda'
import { decodeEventLog, type Log } from 'viem'

export function listenToEchoTrades(handler: (offerId: string, transactionId: string) => Promise<void>) {
  const chainId = getChainId()
  const client = getViemClient(chainId)
  const abi: EchoAbi = ECHO_ABI
  const eventName = 'TradeExecuted' as const
  client.watchContractEvent({
    address: getEchoAddress(chainId),
    abi,
    eventName,
    onLogs: forEach((log: Log) => {
      if (isNotNil(log.transactionHash)) {
        const decodedLog = decodeEventLog({
          abi,
          eventName,
          data: log.data,
          topics: log.topics
        })
        void handler(decodedLog.args.id, log.transactionHash)
      }
    })
  })
}
