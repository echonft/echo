import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/utils/format-address'

/**
 * Shorten the address to display the 4 first chars and 4 last chars.
 * Function throws if the str is not an address
 * @param {string} address
 */
export function shortenAddress(address: string): HexString {
  const formattedAddress = formatAddress(address)
  return `${formattedAddress.substring(0, 6)}...${formattedAddress.substring(formattedAddress.length - 4)}` as HexString
}
