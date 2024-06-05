import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import type { EventLogHandlerArgs } from '@echo/contract-listener/types/event-log-handler-args'
import type { Erc721TransferEventLog } from '@echo/web3/types/log/erc721-transfer-event-log'
import { applySpec, path, prop } from 'ramda'

export function mapLogToEscrowData(args: EventLogHandlerArgs<Erc721TransferEventLog>): EscrowData {
  return applySpec<EscrowData>({
    from: path(['log', 'args', 'from']),
    to: path(['log', 'args', 'to']),
    tokenId: path(['log', 'args', 'tokenId']),
    contractAddress: path(['log', 'address']),
    chain: prop('chain')
  })(args)
}
