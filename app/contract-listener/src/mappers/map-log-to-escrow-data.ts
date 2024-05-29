import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'
import { applySpec, path, prop } from 'ramda'

interface MapLogToEscrowDataArgs {
  log: Erc721TransferLog
  chain: ChainName
}

export function mapLogToEscrowData(args: MapLogToEscrowDataArgs): EscrowData {
  return applySpec<EscrowData>({
    from: path(['log', 'args', 'from']),
    to: path(['log', 'args', 'to']),
    tokenId: path(['log', 'args', 'id']),
    contractAddress: path(['log', 'address']),
    chain: prop('chain')
  })(args)
}
