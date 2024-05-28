import { processInTransfer } from '@echo/contract-listener/helpers/process-in-transfer'
import { processOutTransfer } from '@echo/contract-listener/helpers/process-out-transfer'
import { processSwapTransfer } from '@echo/contract-listener/helpers/process-swap-transfer'
import { mapErc721TransferLogToTransferData } from '@echo/contract-listener/mappers/map-erc721-transfer-log-to-transfer-data'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'
import { isNil } from 'ramda'

export async function handleErc721TransferEvent(log: Erc721TransferLog) {
  try {
    const transferData = await mapErc721TransferLogToTransferData(log)
    if (isNil(transferData)) {
      pinoLogger.info(`Discarding event, transferData is undefined`)
      return
    }
    const { from, to } = transferData
    // Process event
    if (isNil(to)) {
      await processOutTransfer(transferData)
    } else if (isNil(from)) {
      await processInTransfer({ ...transferData, to })
    } else {
      await processSwapTransfer({ ...transferData, to })
    }
  } catch (err) {
    pinoLogger.error(`Error fetching data from Firestore after TransferEvent: ${errorMessage(err)}`)
  }
}
