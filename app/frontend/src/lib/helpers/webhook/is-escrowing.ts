import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isEcho } from '@echo/web3/helpers/is-echo'

export function isEscrowing(
  args: WithLoggerType<Record<'transfer', Partial<NftTransfer> & Required<Pick<NftTransfer, 'from' | 'to'>>>>
): boolean {
  return isEcho(args.transfer.from) || isEcho(args.transfer.to)
}
