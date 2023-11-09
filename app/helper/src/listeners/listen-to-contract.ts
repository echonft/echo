import { logger } from '@echo/utils/services/logger'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { getChainId } from '@echo/web3/helpers/get-chain-id'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'

export function listenToContract() {
  const chainId = getChainId()
  const client = getViemClient(chainId)
  client.watchContractEvent({
    address: getEchoAddress(chainId),
    abi: ECHO_ABI,
    eventName: 'TradeExecuted',
    onLogs: (logs) => {
      logger.info('Got contract event')
      logger.info(JSON.stringify(logs))
    }
  })
}
