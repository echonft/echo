import { parseLog } from '@echo/contract-listener/helpers/parse-log'
import type { EchoLogs } from '@echo/web3/types/log/echo-logs'
import { map } from 'ramda'

export function parseLogs(logs: EchoLogs) {
  return map(parseLog)(logs)
}
