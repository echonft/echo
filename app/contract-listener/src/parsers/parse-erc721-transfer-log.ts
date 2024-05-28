import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'

export async function parseErc721TransferLog(log: Erc721TransferLog) {
  pinoLogger.info(`Got an ERC721 Transfer event from contract ${log.address}`)
  await handleErc721TransferEvent(log)
  return
}
