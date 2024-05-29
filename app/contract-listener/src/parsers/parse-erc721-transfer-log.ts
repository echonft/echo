import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'

export async function parseErc721TransferLog(log: Erc721TransferLog) {
  await handleErc721TransferEvent(log)
  return
}
