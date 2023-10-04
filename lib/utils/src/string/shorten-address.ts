/**
 * Shorten the address to display the 4 first chars and 4 last chars.
 * Function throws if the str is not an address
 * @param address
 */
export function shortenAddress(address: string) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}
