import { parseErc721TransferLog } from '@echo/contract-listener/parsers/parse-erc721-transfer-log'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'

export async function parseErc721TansferLogs(logs: Erc721TransferLog[]) {
  for (const log of logs) {
    await parseErc721TransferLog(log)
  }
}
