import { getChain } from '@echo/contract-listener/helpers/get-chain'
import { isEscrowing } from '@echo/contract-listener/helpers/is-escrowing'
import { processEscrowTransfer } from '@echo/contract-listener/helpers/process-escrow-transfer'
import { processInTransfer } from '@echo/contract-listener/helpers/process-in-transfer'
import { processOutTransfer } from '@echo/contract-listener/helpers/process-out-transfer'
import { processSwapTransfer } from '@echo/contract-listener/helpers/process-swap-transfer'
import { mapErc721TransferLogToTransferData } from '@echo/contract-listener/mappers/map-erc721-transfer-log-to-transfer-data'
import { mapLogToEscrowData } from '@echo/contract-listener/mappers/map-log-to-escrow-data'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'
import { isNil } from 'ramda'

export async function handleErc721TransferEvent(log: Erc721TransferLog) {
  try {
    // FIXME Perhaps the chain should be passed here because that won't work on multichain
    const chain = getChain()
    const {
      args: { from: fromAddress, to: toAddress }
    } = log

    // Invalid event data, discard
    if (isNil(fromAddress) || isNil(toAddress)) {
      return
    }
    // If it's an escrow transaction, process it and return
    if (isEscrowing({ chain, from: fromAddress, to: toAddress })) {
      return await processEscrowTransfer(mapLogToEscrowData({ log, chain }))
    }
    const transferData = await mapErc721TransferLogToTransferData(log)
    if (isNil(transferData)) {
      return
    }
    const { from, to } = transferData
    // The NFT was transfered out of the Echo ecosystem, delete it from DB
    if (isNil(to)) {
      await processOutTransfer(transferData)
      // The NFT was transfered to an Echo user, add it to DB
    } else if (isNil(from)) {
      await processInTransfer({ ...transferData, to })
      // Process swap
    } else {
      await processSwapTransfer({ ...transferData, to })
    }
  } catch (err) {
    pinoLogger.error(`Error fetching data from Firestore after TransferEvent: ${errorMessage(err)}`)
  }
}
