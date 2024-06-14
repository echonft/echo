import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { isEcho } from '@echo/web3/helpers/is-echo'

interface IsEscrowingArgs {
  from: HexString
  to: HexString
  chain: ChainName
}

export function isEscrowing(args: IsEscrowingArgs): boolean {
  const { from, to, chain } = args
  return isEcho(from, chain) || isEcho(to, chain)
}
