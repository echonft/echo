import { getAddress } from 'viem'

/**
 * Shorten the address to display the 4 first chars and 4 last chars.
 * Function throws if the str is not an address
 * @param str
 */
export function shortenAddress(str: string) {
  return getAddress(str).substring(0, 6) + '...' + str.substring(str.length - 4)
}
