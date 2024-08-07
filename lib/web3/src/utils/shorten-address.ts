import type { Wallet } from '@echo/model/types/wallet'
import type { UnformattedWallet } from '@echo/web3/types/unformatted-wallet'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'

/**
 * Shorten the address to display the 4 first chars and 4 last chars.
 * Function throws if the str is not an address
 * @param {Wallet | UnformattedWallet} args
 * @return {((args: {address: string, chainId: number}) => string}
 */
export function shortenAddress(args: Wallet | UnformattedWallet): string {
  const formattedAddress = formatWalletAddress(args)
  return `${formattedAddress.substring(0, 6)}...${formattedAddress.substring(formattedAddress.length - 4)}`
}
