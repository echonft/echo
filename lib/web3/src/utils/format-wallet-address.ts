import type { Wallet } from '@echo/model/types/wallet'
import type { HexString } from '@echo/utils/types/hex-string'
import type { UnformattedWallet } from '@echo/web3/types/unformatted-wallet'
import { getAddress } from 'viem'

export function formatWalletAddress(args: Wallet | UnformattedWallet): HexString {
  return getAddress(args.address)
}
