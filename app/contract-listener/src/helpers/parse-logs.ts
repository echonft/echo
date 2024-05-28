import { parseLog } from '@echo/contract-listener/helpers/parse-log'
import type { EchoLogs } from '@echo/web3/types/log/echo-logs'

export async function parseLogs(logs: EchoLogs) {
  for (const log of logs) {
    await parseLog(log)
  }
}
