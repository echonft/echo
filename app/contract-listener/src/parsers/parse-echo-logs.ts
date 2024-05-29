import { parseEchoLog } from '@echo/contract-listener/parsers/parse-echo-log'
import type { EchoLog } from '@echo/web3/types/log/echo-log'

export async function parseEchoLogs(logs: EchoLog[]) {
  for (const log of logs) {
    await parseEchoLog(log)
  }
}
